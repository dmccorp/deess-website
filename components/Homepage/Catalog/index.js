import styles from "./styles.module.css";
import Image from "next/image";
import { assetHost } from "lib/constants";
import Link from "next/link";

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
        {products.map((product) => {
          const image = product.attributes.displayImages.data[0].attributes;
          return (
            <Link key={product.id} href={`/products/${product.attributes.slug}`}>
              <div className={styles.catalogImage}>
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={`${assetHost}${image.url}`}
                  alt="Image"
                />
                <div className={styles.dark}>
                  <div className={styles.name}>{product.attributes.name}</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Catalog;
