import Link from "components/shared/Link";
import { assetHost } from "lib/constants";
import Image from "next/image";
import styles from "./styles.module.scss";

function Product({ product }) {
  const image = product.images.data[0].attributes;
  return (
    <div className={styles.product}>
      <div className={styles.image}>
        <Image
          src={`${assetHost}${image.url}`}
          alt={image.alternativeText}
          layout="fill"
          objectFit="cover"
        />
        <div className={styles.new}>New</div>
      </div>
      <div className={styles.name}>{product.name}</div>
      <div className={styles.desc}>
        <div className={styles.limit}>{product.description}</div>
        <div className={styles.more}>Read more</div>
      </div>
    </div>
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
