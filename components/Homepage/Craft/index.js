import styles from "./styles.module.css";
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
              Déess is a Bespoke Lighting company based in Belgium, we work with
              our skilled craftsmen to provide you the most beautiful bespoke
              lighting. We can design any piece you imagine and create your
              dream lighting to fit your style.. Déess is committed to providing
              only the finest quality craftsmanship, materials and finishes
              available. Our team will work with you on every step of your
              project so that you are happy with your final piece.
            </p>
          </div>
          <div className={styles.link}>
            <Link to="/bespoke">DISCOVER DÉESS</Link>
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
