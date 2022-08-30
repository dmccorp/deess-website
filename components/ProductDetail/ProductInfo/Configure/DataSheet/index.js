import { Characteristic, Color } from "../../common";
import styles from "./styles.module.scss";
import deess from "assets/deess.svg";
import logo from "assets/logo.svg";
import { useRef } from "react";

export default function DataSheet({ product, selection }) {
  const ref = useRef();
  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.head}>
        <h1>{product.name}</h1>
        <div className={styles.category}>
          {product.categories.data
            .map((category) => category.attributes.name)
            .join(", ")}
        </div>
      </div>
      <div className={styles.info}>
        <h2>Product description</h2>
        <div className={styles.productCode}>
          <span className={styles.label}>Product code -</span>{" "}
          <span className={styles.code}>{product.code}</span>
        </div>
        <div className={styles.section}>
          <h3>Illumination info</h3>
          <div>
            <ul>
              <Characteristic name="Colors">
                <Color color={selection.color} />
              </Characteristic>
              <Characteristic name="CCT">{selection.cct}</Characteristic>
              <Characteristic name="CRI">{selection.cri}</Characteristic>
              <Characteristic name="Beam Angle">
                {selection.beamAngle}
              </Characteristic>
              {product.illumination.map((attr) => (
                <Characteristic key={attr.id} c name={attr.name}>
                  {attr.value}
                </Characteristic>
              ))}
              <Characteristic name="Driver">{selection.driver}</Characteristic>
            </ul>
          </div>
        </div>
        <div className={styles.section}>
          <h3>Dimensions</h3>
          <div>
            <ul>
              {product.dimensions.map((attr) => (
                <Characteristic key={attr.id} name={attr.name}>
                  {attr.value}
                </Characteristic>
              ))}
              <Characteristic name="Cut-out dimensions">
                <table>
                  <tbody>
                    {product.cutoutDimensions.map((attr) => (
                      <tr key={attr.id}>
                        <td className={styles.label}>{attr.name}</td>
                        {attr.value && (
                          <>
                            <td>-</td>
                            <td>{attr.value}</td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Characteristic>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.foot}>
        <div>
          <img src={deess.src} alt="logo" className={styles.float} />
          <img src={logo.src} alt="logo" className={styles.logo} />
        </div>
        <div className={styles.contact}>
          <div>
            <h4>ADDRESS</h4>
            <div className={styles.text}>
              DEESS BV, TER WAARDE 50,
              <br /> 8900 IEPER, BELGIUM
            </div>
          </div>
          <div>
            <h4>CONTACT</h4>
            <div className={styles.text}>contact@deess.com</div>
          </div>
        </div>
      </div>
    </div>
  );
}
