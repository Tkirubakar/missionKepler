import React, { useState, useRef, useContext } from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Teasers from "../../features/Teasers/Teasers";

export default function Home() {
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);
  const nav = useNavigate();
  const { user } = useContext(AuthContext);
  const inputRef = useRef();

const handleLucky = (e) => {
  e.preventDefault();
  setMsg(null);
  setErr(null);

  const digits = (phone || "").replace(/\D/g, "");
  if (digits.length !== 10) {
    setErr("Please enter a 10-digit mobile number.");

    setTimeout(() => {
      setErr(null);
    }, 2000);

    return;
  }

  const last = Number(digits[digits.length - 1]);

  if (last % 2 === 0) {
    setMsg("Congrats! You're lucky");
    setErr(null);

    setTimeout(() => {
      setMsg(null);
    }, 2000);
  } else {
    setErr("Sorry, not lucky this time.");
    setMsg(null);

    setTimeout(() => {
      setErr(null);
    }, 2000);
  }
};

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroImage} role="img" aria-label="hero" />
      </section>

      <section className={styles.promoBar}>
        <div className={styles.promoInner}>
          <div className={styles.promoText}>
            Your Mobile Number can win you exciting prizes
          </div>

          <form
            className={styles.promoForm}
            onSubmit={handleLucky}
            noValidate
            aria-describedby={err ? "promo-error" : undefined}
          >
            <div className={styles.inputGroup}>
              <input
                ref={inputRef}
                className={styles.promoInput}
                placeholder="Enter Mobile Number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (err) setErr(null);
                  if (msg) setMsg(null);
                }}
                aria-invalid={err ? "true" : "false"}
              />
              <button className={styles.promoBtn} type="submit">
                I'm Feeling Lucky
              </button>
            </div>

            <div className={styles.inlineMsgWrap}>
              {err && (
                <div id="promo-error" role="alert" className={styles.fieldError}>
                  {err}
                </div>
              )}
              {msg && (
                <div role="status" className={styles.fieldSuccess}>
                  {msg}
                </div>
              )}
            </div>
          </form>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.trailersHeader}>
            <h2>Trailers</h2>
            <div className={styles.signinHint}>
              You need to sign in to view Trailers.{" "}
              <span
                className={styles.signinLink}
                onClick={() => nav("/login")}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") nav("/login");
                }}
              >
                Sign In Now
              </span>
            </div>
          </div>

          <div className={styles.trailerBlock}>
            <div className={styles.trailerThumb}>
              <img src="/cover.png" alt="Sintel poster" />
            </div>

            <div className={styles.trailerDetails}>
              <h3 className={styles.trailerTitle}>Sintel</h3>
              <p className={styles.trailerDesc}>
                Sintel tells the story of a friendship between a girl named
                Sintel, a baby dragon and the desperate lengths she will go to
                when that friendship is taken from her. Sintel is created by
                Blender in 2010 as a pet project to demonstrate Blender
                capabilities.
              </p>

              <button
                className={styles.watchNow}
                onClick={() => {
                  if (user) {
                    nav("/showTime"); 
                  } else {
                    nav("/login"); 
                  }
                }}
              >
                WATCH NOW
              </button>
            </div>
          </div>

          <div className={styles.section}>
            <Teasers />
          </div>

          <div className={styles.languages}>
            <div className={styles.langLabel}>View in Other Languages</div>
            <div className={styles.langList}>
              <button className={styles.langBtn}>E</button>
              <button className={styles.langBtn}>ஹ</button>
              <button className={styles.langBtn}>த</button>
              <button className={styles.langBtn}>ம</button>
              <button className={styles.langBtn}>క</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}