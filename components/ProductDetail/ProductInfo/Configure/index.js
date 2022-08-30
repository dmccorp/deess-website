import {
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
import { Color, COLORS } from "../common";
import { useEffect, useRef, useState } from "react";
import DataSheet from "./DataSheet";
import jsPDF from "jspdf";
import "./DataSheet/fonts";

function generatePDF(product, selection) {
  function addCharacteristic(key, value = "", y) {
    const keyWidth = 60;
    const lines = doc.splitTextToSize(key, keyWidth);
    const x = 20;
    lines.forEach((line, i) => {
      doc.setFont("Quicksand-SemiBold");
      doc.setTextColor("#000");
      doc.setFontSize(16);
      doc.text(line, x, y + i * 5);
    });

    doc.setFont("Quicksand-Regular");
    doc.setTextColor("#000");
    doc.setFontSize(16);
    doc.text(value, x + keyWidth, y);
    return y + (lines.length - 1) * 5;
  }
  const doc = new jsPDF();
  // doc.addFileToVFS("quicksand.ttf", fonts.regular);
  // doc.addFont("quicksand.ttf", "Quicksand", "normal");
  doc.setFont("Quicksand-Bold");
  doc.setFontSize(25);
  doc.text(product.name, doc.internal.pageSize.width / 2, 20, "center");

  doc.setFont("Quicksand-Regular");
  doc.setFontSize(16);
  doc.setTextColor("#B6B6B6");
  const category = product.categories.data
    .map((category) => category.attributes.name)
    .join(", ")
    .toUpperCase();
  doc.text(category, doc.internal.pageSize.width / 2, 30, "center");

  doc.setFont("Quicksand-Bold");
  doc.setTextColor("#000");
  doc.setFontSize(24);
  doc.text("Product description", 20, 50);

  doc.setFont("Quicksand-SemiBold");
  doc.setTextColor("#000");
  doc.setFontSize(18);
  doc.text("Product code -", 20, 65);
  doc.setFont("Quicksand-SemiBold");
  doc.setTextColor("#303030");
  doc.setFontSize(18);
  doc.text(product.code, 70, 65);

  doc.setFont("Quicksand-SemiBold");
  doc.setTextColor("#B8A078");
  doc.setFontSize(20);
  doc.text("Illumination info", 20, 85);

  const illumination = [
    ["Colors", selection.color],
    ["CCT", selection.cct],
    ["CRI", selection.cri],
    ["Beam Angle", selection.beamAngle],
    ...product.illumination.map((i) => [i.name, i.value]),
    ["Drivers", selection.drivers],
  ];
  illumination.forEach((c, i) => addCharacteristic(c[0], c[1], 100 + i * 10));

  let y = 100 + illumination.length * 10 + 5;
  doc.setFont("Quicksand-SemiBold");
  doc.setTextColor("#B8A078");
  doc.setFontSize(20);
  doc.text("Dimensions", 20, y);

  const dimensions = [
    ...product.dimensions.map((i) => [i.name, i.value]),
    // ["Drivers", product.drivers],
  ];
  dimensions.reduce((p, c) => addCharacteristic(c[0], c[1], p) + 10, y + 15);
  console.log(doc.splitTextToSize("Ingress protection rating", 52));
  // console.log(doc.internal.pageSize);
  // doc.save("file.pdf");
  doc.output("dataurlnewwindow");
}

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

const DRIVERS = ["0-10V", "DALI", "ON/OFF", "Phase-cut"];

export default function Configure({ product }) {
  const container = useRef();
  const [configured, setConfigured] = useState();
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    // setConfigured({
    //   ...data,
    //   color: COLORS.find((color) => color.name === data.color),
    // });
    generatePDF(product, data);
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
                    ...DRIVERS.map((driver) => `TCI ${driver} driver`),
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
                <span>
                  <img src={download.src} alt="download" />
                </span>
                Download details
              </button>
            </div>
          </div>
        </form>
      </div>
      {configured && (
        <Dialog open onClose={() => setConfigured()} maxWidth>
          <DataSheet product={product} selection={configured} />
        </Dialog>
      )}
    </ThemeProvider>
  );
}
