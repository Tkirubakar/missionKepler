import React, { useEffect, useState } from "react";
import { fetchRestaurants } from "../../services/api";
import styles from "./Reserve.module.css";
import InputField from "../../components/Common/InputField";
import SelectField from "../../components/Common/SelectField";
import Loading from "../../components/Loader/Loader";
import ConfirmationMessage from "../../components/Common/ConfirmationMessage";

export default function Reserve() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    preference: "",
    category: "",
    restaurantId: "",
    people: 1
  });
  const [messageData, setMessageData] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetchRestaurants()
      .then((list) => {
        if (mounted) {
          setRestaurants(list || []);
          setLoading(false);
        }
      })
      .catch(() => setLoading(false));
    return () => (mounted = false);
  }, []);

  const handle = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const submit = (e) => {
    e.preventDefault();
    const restaurantName =
      restaurants.find((r) => String(r.id) === form.restaurantId)?.name || "";
    setMessageData({
      people: form.people,
      restaurantName,
      time: form.time,
      date: formatDate(form.date)
    });
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      preference: "",
      category: "",
      restaurantId: "",
      people: 1
    });
  };

  // Filter category options
  const categoryOptions = [
    ...new Set(
      restaurants
        .filter((r) => {
          if (form.preference === "veg") return r.type?.includes("Veg");
          if (form.preference === "non-veg") return r.type?.includes("Non-Veg");
          return true;
        })
        .map((r) => r.cuisine)
        .flat()
    )
  ].filter(Boolean);

  // Filter restaurants based on selected category
  const filteredRestaurants = restaurants.filter((r) => {
    if (form.category && !r.cuisine?.includes(form.category)) return false;
    if (form.preference === "veg") return r.type?.includes("Veg");
    if (form.preference === "non-veg") return r.type?.includes("Non-Veg");
    return true;
  });

  if (loading) return <Loading />;

  return (
    <div className="pageBackground">
      <div className="pageBackgroundInner">
        <div className={styles.formContainer}>
          <form onSubmit={submit}>
            <div className={styles.row}>
              <InputField
                label="First name"
                value={form.firstName}
                onChange={handle("firstName")}
                required
              />
              <InputField
                label="Last name"
                value={form.lastName}
                onChange={handle("lastName")}
                required
              />
            </div>

            <InputField
              label="Email address"
              type="email"
              value={form.email}
              onChange={handle("email")}
              required
            />

            <InputField
              label="Mobile number"
              value={form.phone}
              onChange={handle("phone")}
              required
            />

            <div className={styles.row}>
              <InputField
                label="Date you want to book"
                type="date"
                value={form.date}
                onChange={handle("date")}
                required
                onFocus={(e) =>
                  e.target.showPicker && e.target.showPicker()
                }
              />
              <InputField
                label="In-Time"
                type="time"
                value={form.time}
                onChange={handle("time")}
                required
                onFocus={(e) =>
                  e.target.showPicker && e.target.showPicker()
                }
              />
            </div>
            <div className={styles.preference}>   
              <label className={styles.label}>Choose your preference</label>
              <div className={styles.radioGroup}>
                <label className={styles.squareRadio}>
                  <input
                    type="radio"
                    name="preference"
                    value="veg"
                    checked={form.preference === "veg"}
                    onChange={handle("preference")}
                  />
                  <span className={styles.customSquare}></span> Veg
                </label>
                <label className={styles.squareRadio}>
                  <input
                    type="radio"
                    name="preference"
                    value="non-veg"
                    checked={form.preference === "non-veg"}
                    onChange={handle("preference")}
                  />
                  <span className={styles.customSquare}></span> Non Veg
                </label>
              </div>
            </div> 
            <SelectField
              label="Choose a category"
              value={form.category}
              onChange={handle("category")}
              options={categoryOptions}
            />

            <SelectField
              label="Choose a restaurant"
              value={form.restaurantId}
              onChange={handle("restaurantId")}
              options={filteredRestaurants.map((r) => ({
                value: String(r.id),
                label: r.name
              }))}
            />

            <div className={styles.singleRow}>
              <label className={styles.label}>No of persons</label>
              <div className={styles.personCounter}>
                <button
                  type="button"
                  className={styles.counterBtn}
                  onClick={() =>
                    setForm((f) => ({
                      ...f,
                      people: Math.max(1, f.people - 1)
                    }))
                  }
                >
                  <img
                    src={process.env.PUBLIC_URL + "/images/Line3.png"}
                    alt="Minus"
                    className={styles.iconImg}
                  />
                </button>
                <span className={styles.counterValue}>{form.people}</span>
                <button
                  type="button"
                  className={styles.counterBtn}
                  onClick={() =>
                    setForm((f) => ({ ...f, people: f.people + 1 }))
                  }
                >
                  <img
                    src={process.env.PUBLIC_URL + "/images/plus.png"}
                    alt="Plus"
                    className={styles.iconImg}
                  />
                </button>
              </div>
            </div>

            <div className={styles.centerButton}>
              <button type="submit" className={styles.submitButton}>
                RESERVE MY TABLE
              </button>
            </div>
          </form>

          {messageData && <ConfirmationMessage {...messageData} />}
          <p className={styles.confirmation}>For cancellation or further queries contact contact the restaurants</p>
        </div>
      </div>
    </div>
  );
}