import styles from "./styles.module.scss";

export const COLORS = [
  {
    name: "White",
    value: "AW",
    style: {
      border: "1px solid #ccc",
      borderWidth: ".5px",
      background: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",
    },
  },
  {
    name: "Black",
    value: "BL",
    style: {
      background: "linear-gradient(to right, #434343 0%, black 100%)",
    },
  },
  {
    name: "Bronze",
    value: "BR",
    style: {
      background: "linear-gradient(90deg, #E5A081 -1%, #A2350F 99.27%)",
    },
  },
  {
    name: "RAL",
    value: "RA",
    style: {
      borderWidth: "11px",
      borderStyle: "solid",
      borderColor: "#7cc043 #0092cf #f37738 #ee4035",
    },
  },
];

export const DRIVERS = {
  "0-10V": "010",
  DALI: "064",
  "ON/OFF": "001",
  "Phase-cut": "002",
};

export function Color({ color }) {
  return (
    <div>
      <div className={styles.dot} style={color.style} />
      <div>{color.name}</div>
    </div>
  );
}

export function Characteristic({ name, children }) {
  return (
    <li>
      <div className={styles.characteristic}>
        <div className={styles.name}>{name}</div>
        <div>{children}</div>
      </div>
    </li>
  );
}
