import styles from "./styles.module.scss";

export default function Button({ children, ...props }) {
  return (
    <button {...props} className={styles.container}>
      {children}
    </button>
  );
}
