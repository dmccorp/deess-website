import styles from "./styles.module.scss";
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
            At déess, our ambition is to create lighting that makes a statement.
            Light fixtures that are unique and personal to you. We combine
            minimalism and elegance with every fixture tailored to you. We pride
            ourselves on being a premium brand with an eye on quality. Our
            products are designed in Belgium, manufactured at our factories
            across Europe and assembled locally by experts.
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
