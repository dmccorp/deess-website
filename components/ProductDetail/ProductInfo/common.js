import styles from "./styles.module.scss";

export const COLORS = [
  {
    name: "White",
    style: {
      border: "1px solid #ccc",
      borderWidth: ".5px",
      background: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",
    },
  },
  {
    name: "Black",
    style: {
      background: "linear-gradient(to right, #434343 0%, black 100%)",
    },
  },
  {
    name: "Bronze",
    style: {
      background: "linear-gradient(90deg, #E5A081 -1%, #A2350F 99.27%)",
    },
  },
  {
    name: "RAL",
    style: {
      borderWidth: "11px",
      borderStyle: "solid",
      borderColor: "#7cc043 #0092cf #f37738 #ee4035",
    },
  },
];

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
