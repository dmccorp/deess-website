import { useState } from "react";
import styles from "./styles.module.scss";

function Characteristic({ name, children }) {
  return (
    <li>
      <div className={styles.characteristic}>
        <div className={styles.name}>{name}</div>
        <div>{children}</div>
      </div>
    </li>
  );
}

function Colors({ product }) {
  return (
    <div className={styles.colors}>
      {product.colors.map((color) => (
        <div key={color.id}>
          <div className={styles.dot} style={{ background: color.color }} />
          <div>{color.label}</div>
        </div>
      ))}
    </div>
  );
}

function IlluminationInfo({ product }) {
  return (
    <div className={styles.column}>
      <h3>Illumination info</h3>
      <div>
        <ul>
          <Characteristic name="Colors">
            <Colors product={product} />
          </Characteristic>
          <Characteristic name="CCT">
            {product.cct.map((cct) => cct.value).join("/")}
          </Characteristic>
          <Characteristic name="CRI">
            {product.cri.map((cri) => cri.value).join("/")}
          </Characteristic>
          <Characteristic name="Beam Angle">
            {product.beamAngle.map((angle) => `${angle.value}°`).join("/")}
          </Characteristic>
          {product.illumination.map((attr) => (
            <Characteristic key={attr.id} c name={attr.name}>
              {attr.value}
            </Characteristic>
          ))}
          <Characteristic name="Drivers">
            {product.drivers.map((attr) => (
              <div key={attr.id}>{attr.value}</div>
            ))}
          </Characteristic>
        </ul>
      </div>
    </div>
  );
}

function Dimensions({ product }) {
  return (
    <div className={styles.column}>
      <h3>Dimensions</h3>
      <div>
        <ul>
          {product.dimensions.map((attr) => (
            <Characteristic key={attr.id} name={attr.name}>
              {attr.value}
            </Characteristic>
          ))}
          <Characteristic name="Cut-out dimensions">
            {product.cutoutDimensions.map((attr) => (
              <div key={attr.id}>{attr.value}</div>
            ))}
          </Characteristic>
        </ul>
      </div>
    </div>
  );
}

export default function ProductInfo({ product }) {
  const [configureMode, setConfigureMode] = useState(false);
  console.log(product);
  return (
    <div className={styles.container}>
      <h2>Product description</h2>
      <div className={styles.row}>
        <IlluminationInfo product={product} />
        <Dimensions product={product} />
      </div>
    </div>
  );
}
