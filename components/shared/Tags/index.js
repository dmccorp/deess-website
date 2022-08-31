import classNames from "classnames";
import Link from "next/link";
import styles from "./styles.module.css";

export default function Tags({ list, current, onChange }) {
  return (
    <div className={styles.container}>
      {list.map((item) => (
        <Link key={item.value} href={`/products/${item.value}`}>
          <div
            className={classNames(styles.tag, {
              [styles.tagActive]: current === item.value,
            })}
            onClick={onChange}
          >
            {item.name}
          </div>
        </Link>
      ))}
    </div>
  );
}
