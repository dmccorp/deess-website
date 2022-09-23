import { CircularProgress } from "@mui/material";
import classNames from "classnames";
import FirstImage from "components/shared/FirstImage";
import Link from "next/link";
import { useState } from "react";
import styles from "./styles.module.scss";

export default function Product({ product }) {
  const [clicked, setClicked] = useState(false);
  return (
    <Link href={`/products/${product.slug}`}>
      <div className={styles.container} onClick={() => setClicked(true)}>
        <figure>
          <FirstImage images={product.images.data} />
          <FirstImage images={product.displayImages.data} />
          <div className={styles.text}>
            <figcaption>{product.name}</figcaption>
            <div>
              {product.categories.data
                .map((category) => category.attributes.name)
                .join(", ")}
            </div>
          </div>
          <div
            className={classNames(styles.overlay, {
              [styles.active]: clicked,
            })}
          >
            {clicked && <CircularProgress sx={{ color: "#fff" }} />}
          </div>
        </figure>
      </div>
    </Link>
  );
}
