import Image from "next/image";
import styles from "./styles.module.css";
import logo from "./logo.svg";
import menu from "./menu.svg";
import social from "./social";

const socialIcons = [
  { href: "", name: "Twitter", img: social.twitter },
  { href: "", name: "Instagram", img: social.insta },
  { href: "", name: "Facebook", img: social.fb },
  { href: "", name: "Youtube", img: social.yt },
  { href: "", name: "Pinterest", img: social.pinterest },
];

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Image src={logo.src} width={94} height={21} alt="Deess Logo" />
        <Image src={menu.src} width={22} height={18} alt="Menu" />
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <div className={styles.space}>
          <Image src={logo.src} width={139} height={29} alt="Deess Logo" />
        </div>
        <div className={styles.space}>
          <div className={styles.listHead}>Contact</div>
          <div className={styles.listItem}>
            <p>reachus@deess.com</p>
            <p>enquire@deess.com</p>
          </div>
        </div>
        <div className={styles.space}>
          <div className={styles.listHead}>Address</div>
          <div className={styles.listItem}>
            <p>1023, beige street, 4th main Belgium, 1987678.</p>
          </div>
        </div>
        <div>
          <div className={styles.listHead}>Follow us</div>
          <div className={styles.icons}>
            {socialIcons.map((link) => (
              <a href={link.href} key={link.name}>
                <Image
                  width={20}
                  height={20}
                  src={link.img.src}
                  alt={link.name}
                />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
