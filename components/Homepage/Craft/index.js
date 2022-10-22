import styles from "./styles.module.scss";
import Image from "next/image";
import lights from "./lights.webp";
import lightsL from "./lightsL.webp";
import Link from "components/shared/Link";

const Craft = () => {
  return (
    <div className={styles.section}>
      <div className={styles.rowL}>
        <div className={styles.col}>
          <div className={styles.spHead}>
            <h1>Craftsmanship</h1>
            <span>at it&apos;s best</span>
          </div>
          <div className={styles.sImg}>
            <Image src={lights.src} width={414} height={206} alt="lights" />
          </div>
          <div className={styles.pad}>
            <p>
              Déess aims to offer the most attractive, modern and innovative
              lighting products. This is our mission, and we stand behind it
              with the utmost commitment, constantly aiming to surpass customer
              expectations. Our products are aimed at sophisticated customers
              who appreciate innovative design, craftsmanship and quality.
            </p>
          </div>
          <div className={styles.link}>
            <Link to="/bespoke">DISCOVER DÉESS</Link>
          </div>
        </div>
        <div className={`${styles.lImg} ${styles.col}`}>
          <Image
            src={lightsL.src}
            layout="fill"
            objectFit="contain"
            objectPosition="right"
            alt="lights"
          />
        </div>
      </div>
    </div>
  );
};

export default Craft;
