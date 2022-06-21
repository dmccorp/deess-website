import styles from "./styles.module.css";
import Image from "next/image";
import images from "./images";
import arrow from "assets/images/arrow.svg";

const Display1 = () => {
  return (
    <div className={styles.section}>
      <div className={styles.pad}>
        <div className={styles.sectionText}>
          <h1>Unique and versatile architecture</h1>
          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution.
          </p>
        </div>
        <div>
          <div className={`${styles.grid}`}>
            {images.map((img, index) => (
              <div key={index}>
                <Image width={165} height={165} src={img.src} alt="Image" />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.link}>
          <span>EXPLORE MORE PRODUCTS</span>
          <Image width={34} height={34} src={arrow.src} alt="arrow" />
        </div>
      </div>
    </div>
  );
};

export default Display1;
