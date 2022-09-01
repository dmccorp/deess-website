import Image from "next/image";
import styles from "./styles.module.scss";
import arrow from "./arrow.svg";
import NextLink from "next/link";

export default function Link({ to, children }) {
  return (
    <NextLink href={to}>
      <div className={styles.container}>
        <span>{children}</span>
        <Image width={34} height={34} src={arrow.src} alt="arrow" />
      </div>
    </NextLink>
  );
}
