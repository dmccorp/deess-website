import styles from "./styles.module.scss";
import Image from "next/image";
import bg from "./hero.jpg";

const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.bg} style={{ backgroundImage: `url(${bg.src})` }}>
        <div className={styles.limHead}>
          <h1>FEEL THE LIGHT</h1>
        </div>
        {/* <div className={styles.imgLeft}>
          <Image width={106} height={210} src={imgLeft.src} alt="image" />
        </div>
        <div className={styles.imgRight}>
          <Image width={124} height={150} src={imgRight.src} alt="image" />
        </div>
        <div className={styles.imgCenter}>
          <Image width={74} height={58} src={imgCenter.src} alt="image" />
        </div>
        <div className={styles.imgMid}>
          <Image width={53} height={53} src={imgMid.src} alt="image" />
        </div> */}
      </div>
    </div>
  );
};

export default Hero;
