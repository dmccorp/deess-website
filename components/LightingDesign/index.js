import Button from "components/shared/Button";
import Layout from "components/shared/Layout";
import { siteName } from "lib/constants";
import Head from "next/head";
import styles from "./styles.module.scss";

export default function LightingDesign() {
  return (
    <Layout lightHead>
      <Head>
        <title>Lighting design - ${siteName}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.head}>
          <h1>Building your dream home?</h1>
          <h2>
            At Déess, we can design lighting as per your needs by filling in the
            form below.
          </h2>
        </div>
        <div className={styles.rows}>
          <div className={styles.fields}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label>Name</label>
                <input type="text" />
              </div>
              <div className={styles.field}>
                <label>Contact</label>
                <input type="text" />
              </div>
              <div className={styles.field}>
                <label>Project name</label>
                <input type="text" />
              </div>
              <div className={styles.field}>
                <label>Project location</label>
                <input type="text" />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.field}>
                <label>Email</label>
                <input type="text" />
              </div>
              <div className={styles.field}>
                <label>Phone</label>
                <input type="text" />
              </div>
              <div className={styles.field}>
                <label>Required design date by</label>
                <input type="text" placeholder="dd/mm/yy" />
              </div>
              <div className={styles.field}></div>
            </div>
          </div>
          <div>
            <h3>Upload files</h3>
            <div className={styles.row}>
              <div className={styles.field}>
                <div className={styles.upload}>
                  CAD (.dwg) file of the design
                </div>
              </div>
              <div className={styles.field}>
                <div className={styles.upload}>
                  CAD (.dwg) file of the design
                </div>
              </div>
              <div className={styles.field}>
                <div className={styles.upload}>
                  CAD (.dwg) file of the design
                </div>
              </div>
            </div>
            <div className={styles.foot}>
              <Button>Upload</Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
