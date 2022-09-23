import styles from "./styles.module.css";
import Link from "next/link";
import FirstImage from "components/shared/FirstImage";

const Catalog = ({ products }) => {
  return (
    <div>
      <div className={styles.padH}>
        <div className={styles.regHead}>
          <div>Creating light</div>
          <div className={styles.trail}>In every environment</div>
        </div>
      </div>
      <div className={`${styles.grid} ${styles.inlineL}`}>
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.attributes.slug}`}>
            <div className={styles.catalogImage}>
              <FirstImage images={product.attributes.displayImages.data} />
              <div className={styles.dark}>
                <div className={styles.name}>{product.attributes.name}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
