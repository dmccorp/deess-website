import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.css";
import logo from "./logo.svg";
import menu from "./menu.svg";
import social from "./social";
import search from "./search.svg";
import classNames from "classnames";

const socialIcons = [
  { href: "", name: "Twitter", img: social.twitter },
  { href: "", name: "Instagram", img: social.insta },
  { href: "", name: "Facebook", img: social.fb },
  { href: "", name: "Youtube", img: social.yt },
  { href: "", name: "Pinterest", img: social.pinterest },
];

export default function Layout({ children, lightHead }) {
  return (
    <div className={styles.container}>
      <header
        className={classNames(styles.header, {
          [styles.headLight]: lightHead,
        })}
      >
        <div className={styles.logo}>
          <Image src={logo.src} width={94} height={21} alt="Deess Logo" />
        </div>
        <div className={styles.menu}>
          <Image src={menu.src} width={22} height={18} alt="Menu" />
        </div>
        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/about-us">About us</Link>
        </nav>
        <div className={styles.search}>
          <input type="text" placeholder="Search for products" />
          <div className={styles.icon}>
            <Image width={14} height={14} src={search.src} alt="Search" />
          </div>
        </div>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <div>
          <div className={`${styles.space} ${styles.flogo}`}>
            <Image src={logo.src} width={139} height={29} alt="Deess Logo" />
          </div>
          <div className={`${styles.space} ${styles.textL}`}>
            <div className={styles.listHead}>Address</div>
            <div className={`${styles.listItem} ${styles.minText}`}>
              <p>1023, beige street, 4th main Belgium, 1987678.</p>
            </div>
          </div>
        </div>
        <div className={`${styles.col} ${styles.colL}`}>
          <div className={styles.search}>
            <input type="text" placeholder="Search for products" />
            <div className={styles.icon}>
              <Image width={14} height={14} src={search.src} alt="Search" />
            </div>
          </div>
          <div className={styles.cols}>
            <div>
              <div className={styles.listHead}>Products</div>
              <div className={styles.listItem}>
                <p>Wall lightings</p>
                <p>Accessories</p>
                <p>Outdoor</p>
                <p>Ceiling lightings</p>
              </div>
            </div>
            <div>
              <div className={styles.listHead}>Catalog</div>
              <div className={styles.listItem}>
                <p>Gaia</p>
                <p>Fabra</p>
                <p>Blanka</p>
                <p>Gratia</p>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.colRevL}`}>
          <div className={styles.space}>
            <div className={styles.listHead}>Contact</div>
            <div className={styles.listItem}>
              <p>reachus@deess.com</p>
              <p>enquire@deess.com</p>
            </div>
          </div>
          <div className={`${styles.space} ${styles.textS}`}>
            <div className={styles.listHead}>Address</div>
            <div className={`${styles.listItem} ${styles.minText}`}>
              <p>1023, beige street, 4th main Belgium, 1987678.</p>
            </div>
          </div>
          <div className={styles.space}>
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
        </div>
      </footer>
    </div>
  );
}
