import styles from "./styles.module.css";
import Image from "next/image";
import images from "./images";

const Catalog = () => {
  return (
    <div>
      <div className={styles.padH}>
        <div className={styles.regHead}>
          <div>Creating light</div>
          <div className={styles.trail}>In every environment</div>
        </div>
      </div>
      <div className={`${styles.grid} ${styles.inlineL}`}>
        {images.map((img, index) => (
          <div key={index} className={styles.catalogImage}>
            <Image layout="responsive" src={img.img} alt="Image" />
            <div className={styles.dark}>
              <div className={styles.name}>{img.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
