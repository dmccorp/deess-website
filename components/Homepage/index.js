import Head from "next/head";
import Layout from "../shared/Layout";
import styles from "./styles.module.css";
import Hero from "./Hero";
import Display1 from "./Display1";
import Catalog from "./Catalog";
import Display2 from "./Display2";
import Craft from "./Craft";

const Homepage = () => {
  return (
    <Layout>
      <Head>
        <title>DEESS</title>
      </Head>
      <Hero />
      <Display1 />
      <Craft />
      <Catalog />
      <Display2 />
      <div>
        <div className={styles.pad}>
          <div className={styles.regHead}>
            <div>Feel free to</div>
            <div className={styles.trail}>Enquire about products</div>
          </div>
          <div>
            <div className={styles.fields}>
              <div className={styles.input}>
                <input type="email" name="email" placeholder="Email" />
              </div>
              <div className={styles.input}>
                <input type="text" name="product" placeholder="Product" />
              </div>
              <div className={styles.input}>
                <input type="text" name="message" placeholder="Message" />
              </div>
            </div>
            <div className={styles.button}>
              <button>Enquire</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
