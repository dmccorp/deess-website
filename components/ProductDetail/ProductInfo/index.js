import { Characteristic, Color, COLORS, DRIVERS } from "./common";
import Configure from "./Configure";
import styles from "./styles.module.scss";

function Colors({ product }) {
  return (
    <div className={styles.colors}>
      {COLORS.map((color) => (
        <Color key={color.name} color={color} />
      ))}
    </div>
  );
}

function IlluminationInfo({ product, configureMode }) {
  return (
    <div className={styles.column}>
      <h3>Illumination info</h3>
      <div>
        <ul>
          {!configureMode && (
            <>
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
            </>
          )}
          {product.illumination.map((attr) => (
            <Characteristic key={attr.id} c name={attr.name}>
              {attr.value}
            </Characteristic>
          ))}
          {!configureMode && (
            <Characteristic name="Drivers">
              <table>
                <tbody>
                  {Object.keys(DRIVERS).map((attr) => (
                    <tr key={attr}>
                      <td className={styles.label}>TCI {attr} driver</td>
                    </tr>
                  ))}
                  <tr>
                    <td>No driver</td>
                  </tr>
                </tbody>
              </table>
            </Characteristic>
          )}
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
  );
}

export default function ProductInfo({ product, configureMode }) {
  return (
    <div className={styles.container}>
      {configureMode && <Configure product={product} />}
      <h2>Product description</h2>
      <div className={styles.row}>
        <IlluminationInfo product={product} configureMode={configureMode} />
        <Dimensions product={product} />
      </div>
    </div>
  );
}
