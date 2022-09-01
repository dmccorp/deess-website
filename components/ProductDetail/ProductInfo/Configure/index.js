import {
  CircularProgress,
  createTheme,
  Dialog,
  FormControlLabel,
  Radio,
  RadioGroup,
  styled,
  ThemeProvider,
} from "@mui/material";
import styles from "./styles.module.scss";
import download from "./download.svg";
import { Color, COLORS, DRIVERS } from "../common";
import { useEffect, useRef, useState } from "react";
import DataSheet from "./DataSheet";
import { generatePDF } from "./DataSheet/generate";
import { assetHost } from "lib/constants";

const theme = createTheme({
  components: {
    MuiCheckbox: {},
  },
  typography: {
    fontFamily: "Quicksand",
  },
});

function Attribute({ name, children }) {
  return (
    <div className={styles.field}>
      <div className={styles.title}>{name}</div>
      <div>{children}</div>
    </div>
  );
}

const StyledRadio = styled(Radio)(({ theme }) => ({
  "&.Mui-checked": {
    color: "#000",
  },
}));

function Options({ name, options }) {
  const [state, setState] = useState(options[0]);
  return (
    <RadioGroup
      name={name}
      value={state}
      onChange={(e) => setState(e.target.value)}
    >
      {options.map((option) => (
        <FormControlLabel
          key={option}
          value={option}
          control={<StyledRadio />}
          label={option}
        />
      ))}
    </RadioGroup>
  );
}

function Colors() {
  const [state, setState] = useState(COLORS[0].name);
  return (
    <RadioGroup
      row
      name="color"
      value={state}
      onChange={(e) => setState(e.target.value)}
    >
      {COLORS.map((option) => (
        <FormControlLabel
          key={option.name}
          labelPlacement="top"
          value={option.name}
          control={<StyledRadio />}
          label={<Color color={option} />}
        />
      ))}
    </RadioGroup>
  );
}

function getProductCode(product, selection) {
  const cct = selection.cct.slice(0, 2);
  const beamAngle = selection.beamAngle.slice(0, -1);
  let driver = DRIVERS[selection.drivers.slice(4).slice(0, -7)] || "";
  return `${product.code}-${cct}${selection.cri}${beamAngle}${driver}`;
}

function addImage(src) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve();
    image.src = src;
  });
}

export default function Configure({ product }) {
  const container = useRef();
  const [busy, setBusy] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    data.code = getProductCode(product, data);
    setBusy(true);
    await addImage(`${assetHost}${product.blueprint.data.attributes.url}`);
    await addImage(
      `${assetHost}${product.displayImages.data[0].attributes.url}`
    );
    await generatePDF(product, data);
    setBusy(false);
  };
  useEffect(() => {
    container.current.scrollIntoView({ behavior: "smooth" });
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.container} ref={container}>
        <h1>Configure {product.name}</h1>
        <form className={styles.row} onSubmit={onSubmit}>
          <div className={styles.parts}>
            <div className={styles.col}>
              <Attribute name="Color Temperature">
                <Options
                  name="cct"
                  options={product.cct.map((cct) => cct.value)}
                />
              </Attribute>
              <Attribute name="CRI">
                <Options
                  name="cri"
                  options={product.cri.map((cct) => cct.value)}
                />
              </Attribute>
              <Attribute name="Drivers">
                <Options
                  name="drivers"
                  options={[
                    ...Object.keys(DRIVERS).map(
                      (driver) => `TCI ${driver} driver`
                    ),
                    "No driver",
                  ]}
                />
              </Attribute>
            </div>
            <div className={styles.col}>
              <Attribute name="Colors">
                <Colors />
              </Attribute>
              <Attribute name="Beam angle">
                <Options
                  name="beamAngle"
                  options={product.beamAngle.map((cct) => `${cct.value}°`)}
                />
              </Attribute>
            </div>
          </div>
          <div className={styles.download}>
            <h4>Product Code</h4>
            <div className={styles.code}>{product.code}</div>
            <div>
              <button type="submit">
                <span className={styles.box}>
                  {busy ? (
                    <CircularProgress sx={{ color: "white" }} size={25} />
                  ) : (
                    <img src={download.src} alt="download" />
                  )}
                </span>
                Download details
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* {configured && (
        <Dialog open onClose={() => setConfigured()} maxWidth>
          <DataSheet product={product} selection={configured} />
        </Dialog>
      )} */}
    </ThemeProvider>
  );
}
