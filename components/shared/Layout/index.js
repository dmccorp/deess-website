import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";
import logo from "assets/logo.svg";
import lightLogo from "assets/logo_light.svg";
import menu from "./menu.svg";
import social from "./social";
import search from "./search.svg";
import classNames from "classnames";
import { Dialog } from "@mui/material";
import cone from "assets/cone.png";

const socialIcons = [
  { href: "", name: "Twitter", img: social.twitter },
  { href: "", name: "Instagram", img: social.insta },
  { href: "", name: "Facebook", img: social.fb },
  { href: "", name: "Youtube", img: social.yt },
  { href: "", name: "Pinterest", img: social.pinterest },
];

const links = [
  {
    link: "/products",
    label: "Products",
  },
  {
    link: "/bespoke",
    label: "Bespoke",
  },
  {
    link: "/lighting-design",
    label: "Lighting design",
  },
  {
    link: "/contact-us",
    label: "Contact us",
  },
  {
    link: "/about-us",
    label: "About us",
  },
  {
    link: "/downloads",
    label: "Downloads",
  },
];

export default function Layout({ children, fixedHead }) {
  return (
    <div className={styles.container}>
      <header
        className={classNames(styles.header, {
          [styles.fixed]: fixedHead,
        })}
      >
        <Link href="/">
          <div className={styles.logo}>
            <Image
              src={fixedHead ? lightLogo.src : logo.src}
              width={94}
              height={21}
              alt="Deess Logo"
            />
          </div>
        </Link>
        <div className={styles.menu}>
          <Image src={menu.src} width={22} height={18} alt="Menu" />
        </div>
        <nav className={styles.nav}>
          {links.map((link) => (
            <Link href={link.link} key={link.link}>
              {link.label}
            </Link>
          ))}
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
              <p>DEESS BV, TER WAARDE 50, 8900 IEPER, BELGIUM</p>
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
            <div className={styles.items}>
              <div className={styles.listHead}>Products</div>
              <Link href="/products/wall">
                <div className={styles.listItem}>Wall lightings</div>
              </Link>
              <Link href="/products/ceiling">
                <div className={styles.listItem}>Ceiling lightings</div>
              </Link>
              <Link href="/products/floor">
                <div className={styles.listItem}>Floor lightings</div>
              </Link>
            </div>
            <div className={styles.items}>
              <div className={styles.listHead}>Links</div>
              <Link href="/bespoke">
                <div className={styles.listItem}>Bespoke</div>
              </Link>
              <Link href="/lighting-design">
                <div className={styles.listItem}>Lighting design</div>
              </Link>
              <Link href="/downloads">
                <div className={styles.listItem}>Downloads</div>
              </Link>
            </div>
          </div>
        </div>
        <div className={`${styles.colRevL}`}>
          <div className={styles.space}>
            <div className={styles.listHead}>Contact</div>
            <div className={styles.listItem}>
              <p>contact@deess.com</p>
            </div>
          </div>
          <div className={`${styles.space} ${styles.textS}`}>
            <div className={styles.listHead}>Address</div>
            <div className={`${styles.listItem} ${styles.minText}`}>
              <p>DEESS BV, TER WAARDE 50, 8900 IEPER, BELGIUM</p>
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
      <Dialog open maxWidth>
        <div style={{ padding: "2rem 5rem", textAlign: "center" }}>
          <img src={cone.src} alt="Work in progress" style={{ height: '150px', marginBottom: '10px' }} />
          <h1>Website under maintenance!</h1>
        </div>
      </Dialog>
    </div>
  );
}
