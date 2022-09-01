import { CircularProgress } from "@mui/material";
import classNames from "classnames";
import { assetHost } from "lib/constants";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./styles.module.scss";

export default function Product({ product }) {
  const [clicked, setClicked] = useState(false);
  const displayImage = product.images.data[0].attributes;
  return (
    <Link href={`/products/${product.slug}`}>
      <div className={styles.container} onClick={() => setClicked(true)}>
        <figure>
          <Image
            src={`${assetHost}${displayImage.url}`}
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
