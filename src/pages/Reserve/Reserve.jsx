import React, { useEffect, useState } from "react";
import { fetchRestaurants } from "../../services/api";
import styles from "./Reserve.module.css";
import InputField from "../../components/Common/InputField";
import SelectField from "../../components/Common/SelectField";
import Loading from "../../components/Loader/Loader";
import ConfirmationMessage from "../../components/ConfirmationMessage/ConfirmationMessage";
import Button from "../../components/Common/Button";
import Image from "../../components/Common/Image";

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
    people: 1,
  });
  const [messageData, setMessageData] = useState(null);
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    fetchRestaurants()
      .then((restaurantList) => {
        setRestaurants(restaurantList || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handle = (key) => (event) => {
    const { value } = event.target;

    if (key === "phone") {
      if (/^\d{0,10}$/.test(value)) {
        setForm((prevForm) => ({ ...prevForm, [key]: value }));
        setPhoneError(value.length === 10 ? "" : "Phone must be 10 digits");
      }
    } else {
      setForm((prevForm) => ({ ...prevForm, [key]: value }));
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const submit = (e) => {
    e.preventDefault();

    if (form.phone.length !== 10) {
      setPhoneError("Phone must be 10 digits");
      return;
    }

    const restaurantName =
      restaurants.find(
        (restaurant) => String(restaurant.id) === form.restaurantId
      )?.name || "";

    setMessageData({
      people: form.people,
      restaurantName,
      time: form.time,
      date: formatDate(form.date),
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
      people: 1,
    });
  };

  // Category options
  const categoryOptions = [
    ...new Set(
      restaurants
        .filter((restaurant) => {
          if (form.preference === "veg") return restaurant.type?.includes("Veg");
          if (form.preference === "non-veg")
            return restaurant.type?.includes("Non-Veg");
          return true;
        })
        .map((restaurant) => restaurant.cuisine)
        .flat()
    ),
  ].filter(Boolean);

  // Filter restaurants based on selected category
  const filteredRestaurants = restaurants.filter((restaurant) => {
    if (form.category && !restaurant.cuisine?.includes(form.category))
      return false;
    if (form.preference === "veg") return restaurant.type?.includes("Veg");
    if (form.preference === "non-veg")
      return restaurant.type?.includes("Non-Veg");
    return true;
  });

  if (loading) return <Loading />;

  return (
    <div className="pageBackground">
      <div className="pageBackgroundInner">
        <div className={styles.formContainer}>
          {!messageData ? (
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

              <div className={styles.singleRow}>
                <InputField
                  label="Mobile number"
                  value={form.phone}
                  onChange={handle("phone")}
                  required
                />
                {phoneError && (
                  <p style={{ color: "red", fontSize: "13px", marginTop: "5px" }}>
                    {phoneError}
                  </p>
                )}
              </div>

              <div className={styles.row}>
                <InputField
                  label="Date you want to book"
                  type="date"
                  value={form.date}
                  onChange={handle("date")}
                  required
                  onFocus={(e) => e.target.showPicker && e.target.showPicker()}
                />
                <InputField
                  label="In-Time"
                  type="time"
                  value={form.time}
                  onChange={handle("time")}
                  required
                  onFocus={(e) => e.target.showPicker && e.target.showPicker()}
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
                options={filteredRestaurants.map((restaurant) => ({
                  value: String(restaurant.id),
                  label: restaurant.name,
                }))}
              />

              <div className={styles.singleRow}>
                <label className={styles.label}>No of persons</label>
                <div className={styles.personCounter}>
                  <Button
                    type="button"
                    className={styles.counterBtn}
                    onClick={() =>
                      setForm((prevForm) => ({
                        ...prevForm,
                        people: Math.max(1, prevForm.people - 1),
                      }))
                    }
                  >
                    <Image
                      src={process.env.PUBLIC_URL + "/images/Line3.png"}
                      alt="Minus"
                      className={styles.iconImg}
                    />
                  </Button>

                  <span className={styles.counterValue}>{form.people}</span>

                  <Button
                    type="button"
                    className={styles.counterBtn}
                    onClick={() =>
                      setForm((prevForm) => ({
                        ...prevForm,
                        people: prevForm.people + 1,
                      }))
                    }
                  >
                    <Image
                      src={process.env.PUBLIC_URL + "/images/plus.png"}
                      alt="Plus"
                      className={styles.iconImg}
                    />
                  </Button>
                </div>
              </div>

              <div className={styles.centerButton}>
                <Button type="submit" className={styles.submitButton}>
                  RESERVE MY TABLE
                </Button>
              </div>
            </form>
          ) : (
            <>
              <ConfirmationMessage {...messageData} />
              <p className={styles.confirmation}>
                For cancellation or further queries contact the restaurants
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}