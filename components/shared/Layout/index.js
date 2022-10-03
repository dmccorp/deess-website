import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";
import logo from "assets/logo.svg";
import lightLogo from "assets/logo_light.svg";
import menu from "./menu.svg";
import social from "./social";
import classNames from "classnames";
import { searchProducts } from "lib/utils";
import { createContext, useContext, useState } from "react";
import Search from "./Search";

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

const LayoutContext = createContext();

export const useLayoutContext = () => useContext(LayoutContext);

export default function Layout({ children, fixedHead }) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const loadOptions = async (str, cb) => {
    const rsp = await searchProducts(str);
    cb(rsp.data);
    setResults(rsp.data);
  };
  const onInputChange = (value, x) => {
    if (x.action === "input-change") {
      if (!value) setResults([]);
      setSearch(value);
    }
  };

  return (
    <LayoutContext.Provider value={{ light: fixedHead }}>
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
          <div className={classNames(styles.menu, { [styles.open]: menuOpen })}>
            <div className={styles.button}>
              <button onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? (
                  <>&times;</>
                ) : (
                  <Image src={menu.src} width={22} height={18} alt="Menu" />
                )}
              </button>
            </div>
            <div className={styles.list}>
              {links.map((link) => (
                <div key={link.link}>
                  <Link href={link.link}>{link.label}</Link>
                </div>
              ))}
            </div>
          </div>
          <nav className={styles.nav}>
            {links.map((link) => (
              <Link href={link.link} key={link.link}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className={styles.search}>
            <Search
              results={results}
              search={search}
              onInputChange={onInputChange}
              loadOptions={loadOptions}
              light={fixedHead}
            />
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
              <Search
                results={results}
                search={search}
                onInputChange={onInputChange}
                loadOptions={loadOptions}
              />
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
                <p>info@deess.be</p>
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
      </div>
    </LayoutContext.Provider>
  );
}
