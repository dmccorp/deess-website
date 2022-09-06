import { assetHost } from "lib/constants";
import Image from "next/image";
import styles from "./styles.module.scss";

export default function Images({ product }) {
  const blueprint = product.blueprint.data.attributes;
  const display = product.displayImages.data[0].attributes;
  const image = product.images.data[0].attributes;
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Image
          src={`${assetHost}${display.url}`}
          alt={display.alternativeText}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className={styles.right}>
        <div className={styles.top}>
          <Image
            src={`${assetHost}${blueprint.url}`}
            alt={blueprint.alternativeText}
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className={styles.bottom}>
          <Image
            src={`${assetHost}${image.url}`}
            alt={image.alternativeText}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
}
