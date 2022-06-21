import styles from "./styles.module.css";
import Image from "next/image";
import imgLeft from "./image_left.png";
import imgRight from "./image_right.png";

const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.limHead}>
        <h1>LIGHT IS WHAT WE CREATE</h1>
      </div>
      <div className={styles.imgLeft}>
        <Image width={106} height={210} src={imgLeft.src} alt="image" />
      </div>

      <div className={styles.imgRight}>
        <Image width={124} height={150} src={imgRight.src} alt="image" />
      </div>
    </div>
  );
};

export default Hero;
