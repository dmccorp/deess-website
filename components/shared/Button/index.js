import classNames from "classnames";
import styles from "./styles.module.scss";

export default function Button({ children, light = false, ...props }) {
  return (
    <button
      {...props}
      className={classNames(styles.container, {
        [styles.light]: light,
      })}
    >
      {children}
    </button>
  );
}
