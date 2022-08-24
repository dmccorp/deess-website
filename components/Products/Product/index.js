import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";

export default function Product({ product }) {
  const displayImage = product.images.data[0].attributes;
  return (
    <Link href={`/products/${product.slug}`}>
      <div className={styles.container}>
        <figure>
          <Image
            src={`https://deess.dmcworks.in${displayImage.url}`}
            alt={displayImage.alternativeText}
            height={displayImage.height}
            width={displayImage.width}
            layout="fill"
            objectFit="cover"
          />
          <div className={styles.text}>
            <figcaption>{product.name}</figcaption>
            <div>
              {product.categories.data
                .map((category) => category.attributes.name)
                .join(", ")}
            </div>
          </div>
        </figure>
      </div>
    </Link>
  );
}
