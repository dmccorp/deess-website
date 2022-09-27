import Head from "next/head";
import Layout from "../shared/Layout";
import styles from "./styles.module.scss";
import Hero from "./Hero";
import Display1 from "./Display1";
import Catalog from "./Catalog";
import Craft from "./Craft";
import { siteName } from "lib/constants";
import NewProducts from "./NewProducts";
import Link from "next/link";

function Contact() {
  return (
    <div className={styles.center}>
      <div className={styles.pad}>
        <div className={styles.regHead}>
          <div>Feel free to</div>
          <div className={styles.trail}>Enquire about products</div>
        </div>
        <div>
          <div className={styles.button}>
            <Link href="/contact-us">
              <button>Enquire</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const Homepage = ({ products, newProducts }) => {
  return (
    <Layout fixedHead>
      <Head>
        <title>{siteName}</title>
      </Head>
      <Hero />
      <Display1 />
      <Craft />
      <Catalog products={products} />
      <NewProducts products={newProducts} />
      <Contact />
    </Layout>
  );
};

export default Homepage;
