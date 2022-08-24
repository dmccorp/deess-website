import classNames from "classnames";
import styles from "./styles.module.css";

export default function Tags({ list, current, onChange }) {
  return (
    <div className={styles.container}>
      {list.map((item) => (
        <div
          key={item.value}
          className={classNames(styles.tag, {
            [styles.tagActive]: current === item.value,
          })}
          onClick={() => onChange(item.value)}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
}
