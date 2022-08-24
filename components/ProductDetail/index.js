import Layout from "components/shared/Layout";
import Image from "next/image";
import ProductInfo from "./ProductInfo";
import styles from "./styles.module.scss";

export default function ProductDetail({ product }) {
  console.log(product);
  const displayImage = product.images.data[0].attributes;
  return (
    <Layout lightHead>
      <div className={styles.container}>
        <div className={styles.productDisplay}>
          <div className={styles.productPicture}>
            <figure>
              <Image
                src={`https://deess.dmcworks.in${displayImage.url}`}
                alt={displayImage.alternativeText}
                height={displayImage.height}
                width={displayImage.width}
                layout="fill"
                objectFit="cover"
              />
            </figure>
          </div>
          <div className={styles.productDetail}>
            <div className={styles.productText}>
              <h1>{product.name}</h1>
              <div className={styles.cat}>
                {product.categories.data
                  .map((category) => category.attributes.name)
                  .join(", ")}
              </div>
              <div className={styles.desc}>
                <p>{product.description}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <ProductInfo product={product} />
        </div>
      </div>
    </Layout>
  );
}
