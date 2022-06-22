import styles from "./styles.module.css";
import Image from "next/image";
import images from "./images";
import logo from "components/shared/Layout/logo.svg";
import deess from "./deess.svg";
import arrow from "assets/images/arrow.svg";

const Display2 = () => {
  return (
    <div className={styles.section}>
      <div className={styles.imageRight}>
        <div>
          <div className={styles.splitL}>
            <div className={styles.gridC}>
              <div className={styles.logoC}>
                <Image width={209} height={45} src={logo.src} alt="DEESS" />
                <div className={styles.logoBg}>
                  <Image layout="fill" src={deess.src} alt="DEESS" />
                </div>
              </div>
              <div className={styles.pad}>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point ofIt is a long established fact that a reader will
                  be distracted by the readable content of a page when looking
                  at its layout
                </p>
              </div>
              <div className={styles.link}>
                <span>EXPLORE MORE PRODUCTS</span>
                <Image width={34} height={34} src={arrow.src} alt="arrow" />
              </div>
            </div>
            <div className={styles.gridC}>
              <div className={styles.grid}>
                <div className={`${styles.gridImg}`}>
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src={images[0].src}
                    alt="Image"
                  />
                </div>
                <div className={`${styles.gridImg} ${styles.gridImgLeft}`}>
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src={images[1].src}
                    alt="Image"
                  />
                </div>
                <div className={`${styles.gridImg} ${styles.gridImgRight}`}>
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src={images[2].src}
                    alt="Image"
                  />
                </div>
                <div className={`${styles.gridImg} ${styles.gridImgUp}`}>
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src={images[3].src}
                    alt="Image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Display2;
