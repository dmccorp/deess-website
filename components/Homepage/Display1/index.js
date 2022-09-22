import styles from "./styles.module.css";
import Image from "next/image";
import images from "./images";
import Link from "components/shared/Link";

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
              <div className={styles.box} key={index}>
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={img.src}
                  alt="Image"
                />
              </div>
            ))}
          </div>
        </div>
        <Link to="/products">EXPLORE MORE PRODUCTS</Link>
      </div>
    </div>
  );
};

export default Display1;
