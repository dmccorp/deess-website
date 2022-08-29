import styles from "./styles.module.scss";

export default function Input({ label, ...props }) {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <input {...props} />
    </div>
  );
}
