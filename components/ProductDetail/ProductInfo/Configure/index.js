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
// import DataSheet from "./DataSheet";
import { generatePDF } from "./DataSheet/generate";
import { assetHost } from "lib/constants";
import { Canvg, presets } from "canvg";

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
  const [state, setState] = useState(COLORS[0].value);
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
          value={option.value}
          control={<StyledRadio />}
          label={<Color color={option} />}
        />
      ))}
    </RadioGroup>
  );
}

function getProductCode(product, selection) {
  const cct = selection.cct.slice(0, 2); // 2700 -> 27
  const beamAngle = selection.beamAngle?.slice(0, -1); // 180° -> 180
  let driver = DRIVERS[selection.drivers.slice(4).slice(0, -7)] || "";
  return `${product.code}-${cct}${selection.cri}${beamAngle || ""}${driver}-${
    selection.color
  }`;
}

function addImage(src) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve();
    image.src = src;
  });
}

async function drawCanvas(canvas, img) {
  const ctx = canvas.getContext("2d");
  const width = img.width;
  const height = img.height;
  console.log(`${assetHost}${img.url}`);
  const v = await Canvg.from(
    ctx,
    `${assetHost}${img.url}`
    // presets.offscreen()
  );
  const ratio = img.width / img.height;
  const t = 500;
  // v.resize(t, t * ratio);
  // v.resize(t, t * ratio, "xMidYMid meet");
  // v.resize(width, height, "xMidYMid meet");
  await v.render();
}

export default function Configure({ product }) {
  const container = useRef();
  const [busy, setBusy] = useState(false);
  const [configured, setConfigured] = useState();
  const canvas = useRef();
  const onSubmit = async (e) => {
    e.preventDefault();
    // const blueprint = product.blueprint.data;
    // let img = blueprint.attributes;
    // const rsp = await fetch(`${assetHost}${img.url}`);
    // const svg = await rsp.text();
    // const ratio = img.width / img.height;
    // const width = 100;
    // return await drawCanvas(canvas.current, img);
    // ---
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    data.code = getProductCode(product, data);
    // return setConfigured(data);
    setBusy(true);
    const blueprint = product.blueprint.data;
    if (blueprint) {
      await addImage(`${assetHost}${blueprint.attributes.url}`);
    }
    const displayImages = product.displayImages.data;
    if (displayImages) {
      await addImage(`${assetHost}${displayImages[0].attributes.url}`);
    }
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
            <Attribute name="Color Temperature">
              <Options
                name="cct"
                options={product.cct.map((cct) => cct.value)}
              />
            </Attribute>
            <Attribute name="Colors">
              <Colors />
            </Attribute>
            <Attribute name="CRI">
              <Options
                name="cri"
                options={product.cri.map((cct) => cct.value)}
              />
            </Attribute>
            {product.beamAngle.length > 0 && (
              <Attribute name="Beam angle">
                <Options
                  name="beamAngle"
                  options={product.beamAngle.map((cct) => `${cct.value}°`)}
                />
              </Attribute>
            )}
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
                Download Datasheet
              </button>
            </div>
            <div>
              <canvas ref={canvas} />
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
