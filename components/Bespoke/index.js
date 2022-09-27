import Layout from "components/shared/Layout";
import Image from "next/image";
import styles from "./styles.module.scss";
import images from "./images";
import assets from "./assets";
import Head from "next/head";
import { siteName } from "lib/constants";

export default function Bespoke() {
  return (
    <Layout>
      <Head>
        <title>Bespoke - {siteName}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.top}>
          <h1>Research & development</h1>
          <div className={styles.text}>
            Our R&D team consisting of engineers and designers with decades of
            combined experience, are constantly looking to push the boundaries
            in design and technology, as well as finding new ways to reduce
            energy consumption.You will experience a new level of lighting with
            déess. All our lamps are a result of achievements in design,
            electronics and mechanics. We aim to balance form and function with
            a minimalistic approach and focus on the details.
          </div>
          <div className={styles.gallery}>
            <img src={assets.i1.src} alt="Gallery 1" className={styles.i1} />
            <img src={assets.i3.src} alt="Gallery 3" className={styles.i3} />
            <img src={assets.i4.src} alt="Gallery 4" className={styles.i4} />
            <img src={assets.i5.src} alt="Gallery 5" className={styles.i5} />
            <img src={assets.i2.src} alt="Gallery 2" className={styles.i2} />
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.text}>
            <div className={styles.inner}>
              <h1>Experience the luxury</h1>
              <div>
                You will experience a new level of lighting with déess. All our
                lamps are a result of achievements in design, electronics and
                mechanics. We aim to balance form and function with a
                minimalistic approach and focus on the details. We pride
                ourselves on creating beautiful, functional products. We have
                designed each fixture with practicality of our customers in
                mind. For all indoor luminaires, we use industry leading LED
                chips that we use, which provide minimal glare, maximum
                performance and built to last for decades.
              </div>
            </div>
          </div>
          <div className={styles.image}>
            <Image
              src={images.bottomRight}
              alt="Bespoke lighting"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
