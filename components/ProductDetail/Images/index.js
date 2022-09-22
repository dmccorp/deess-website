import { assetHost } from "lib/constants";
import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./styles.module.scss";

function Canvas({ children }) {
  const canvas = useRef();
  useEffect(() => {
    const ctx = canvas.current.getContext("2d");
    const width = canvas.current.offsetWidth;
    const height = canvas.current.offsetHeight;
    const s = 9;
    const pL = 0;
    const pT = 0;
    const pR = s;
    const pB = s;
    const dot = 1;

    ctx.fillStyle = "#cccccc";
    for (var x = pL; x <= width - pR; x += s) {
      for (var y = pT; y <= height - pB; y += s) {
        ctx.fillRect(x, y, dot, dot);
      }
    }
    ctx.stroke();
  }, []);
  return (
    <div className={styles.canvas}>
      <canvas ref={canvas} />
      <div className={styles.preview}>{children}</div>
    </div>
  );
}

export default function Images({ product }) {
  const blueprint = product.blueprint.data.attributes;
  const display = product.displayImages.data[0].attributes;
  const image = product.images.data[0].attributes;
  return (
    <div className={styles.container}>
      <Canvas>
        <Image
          src={`${assetHost}${blueprint.url}`}
          alt={blueprint.alternativeText}
          layout="fill"
          objectFit="contain"
        />
      </Canvas>
      <div className={styles.bottom}>
        <div className={styles.left}>
          <Image
            src={`${assetHost}${display.url}`}
            alt={display.alternativeText}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className={styles.right}>
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
