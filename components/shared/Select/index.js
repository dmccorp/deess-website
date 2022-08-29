import ReactSelect from "react-select";
import styles from "./styles.module.scss";

const CaretDown = () => (
  <div className="container">
    <svg width={12} height={9}>
      <path d="M6 9L0.803849 -9.78799e-07L11.1962 -7.02746e-08L6 9Z" />
    </svg>
    <style jsx>{`
      .container {
        padding: 0 10px;
      }
    `}</style>
  </div>
);

const selectStyles = {
  container: (base) => ({
    ...base,
    border: "none",
    outline: "none",
  }),
  control: (base) => ({
    ...base,
    border: "none",
    background: "#F0F0F0",
    borderRadius: "none",
    fontWeight: "bold",
    minHeight: "44px",
  }),
  option: (base, state) => ({
    ...base,
    background: state.isFocused ? "#F0F0F0" : "#fff",
    color: "#000",
    fontWeight: "bold",
  }),
};

export default function Select(props) {
  return (
    <div className={styles.container}>
      <label>I am a</label>
      <ReactSelect
        styles={selectStyles}
        components={{ IndicatorSeparator: null, DropdownIndicator: CaretDown }}
        {...props}
      />
    </div>
  );
}
