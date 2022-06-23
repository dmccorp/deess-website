import styles from "./styles.module.css";
import Image from "next/image";
import lights from "./lights.webp";
import lightsL from "./lightsL.webp";
import arrow from "assets/images/arrow.svg";

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
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of
            </p>
          </div>
          <div className={styles.link}>
            <span>EXPLORE MORE PRODUCTS</span>
            <Image width={34} height={34} src={arrow.src} alt="arrow" />
          </div>
        </div>
        <div className={`${styles.lImg} ${styles.col}`}>
          <Image src={lightsL.src} width={511} height={790} alt="lights" />
        </div>
      </div>
    </div>
  );
};

export default Craft;
