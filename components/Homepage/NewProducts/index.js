import FirstImage from "components/shared/FirstImage";
import Link from "components/shared/Link";
import NextLink from "next/link";
import styles from "./styles.module.scss";

function Product({ product }) {
  const images = product.images.data;
  return (
    <NextLink href={`/products/${product.slug}`}>
      <div className={styles.product}>
        <div className={styles.image}>
          <FirstImage images={images} />
          <div className={styles.new}>New</div>
        </div>
        <div className={styles.name}>{product.name}</div>
        <div className={styles.desc}>
          <div className={styles.limit}>{product.description}</div>
          <div className={styles.more}>Read more</div>
        </div>
      </div>
    </NextLink>
  );
}

export default function NewProducts({ products }) {
  return (
    <div className={styles.container}>
      <h1>New products</h1>
      <div className={styles.products}>
        {products.map((product) => (
          <Product key={product.id} product={product.attributes} />
        ))}
      </div>
      <div className={styles.foot}>
        <Link to="/products">NEW PRODUCTS</Link>
      </div>
    </div>
  );
}
