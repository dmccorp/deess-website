import Head from "next/head";
import Layout from "../shared/Layout";
import styles from "./styles.module.css";
import imgLeft from "./image_left.png";
import imgRight from "./image_right.png";
import Image from "next/image";
import images from "./images";
import images2 from "./images2";
import catalog from "./catalog";
import arrow from "./arrow.svg";
import lights from "./lights.png";
import deess from "./deess.svg";

const Homepage = () => {
  return (
    <Layout>
      <Head>
        <title>DEESS</title>
      </Head>
      <div className={styles.hero}>
        <div className={styles.limHead}>
          <h1>LIGHT IS WHAT WE CREATE</h1>
        </div>
        <div className={styles.imgLeft}>
          <Image width={106} height={210} src={imgLeft.src} alt="image" />
        </div>

        <div className={styles.imgRight}>
          <Image width={124} height={150} src={imgRight.src} alt="image" />
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.pad}>
          <div className={styles.sectionText}>
            <h1>Unique and versatile architecture</h1>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution.
            </p>
          </div>
          <div className={styles.grid}>
            {images.map((img, index) => (
              <div key={index}>
                <Image width={165} height={165} src={img.src} alt="Image" />
              </div>
            ))}
          </div>
          <div className={styles.link}>
            <span>EXPLORE MORE PRODUCTS</span>
            <Image width={34} height={34} src={arrow.src} alt="arrow" />
          </div>
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.spHead}>
          <h1>Craftsmanship</h1>
          <span>at it&apos;s best</span>
        </div>
        <div>
          <Image src={lights.src} width={414} height={206} alt="lights" />
        </div>
        <div className={styles.pad}>
          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of
          </p>
        </div>
      </div>
      <div>
        <div className={styles.padH}>
          <div className={styles.regHead}>
            <div>Creating light</div>
            <div className={styles.trail}>In every environment</div>
          </div>
        </div>
        <div className={styles.grid}>
          {catalog.map((img, index) => (
            <div key={index} className={styles.catalogImage}>
              <Image layout="fill" src={img.img} alt="Image" />
              <div className={styles.dark}>
                <div className={styles.name}>{img.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.section}>
        <Image width={357} height={77} src={deess.src} alt="DEESS" />
        <div className={styles.pad}>
          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            ofIt is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout
          </p>
        </div>
        <div className={styles.grid}>
          <div className={`${styles.gridImg}`}>
            <Image layout="fill" src={images2[0].src} alt="Image" />
          </div>
          <div className={`${styles.gridImg} ${styles.gridImgLeft}`}>
            <Image layout="fill" src={images2[1].src} alt="Image" />
          </div>
          <div className={`${styles.gridImg} ${styles.gridImgRight}`}>
            <Image layout="fill" src={images2[2].src} alt="Image" />
          </div>
          <div className={`${styles.gridImg} ${styles.gridImgUp}`}>
            <Image layout="fill" src={images2[3].src} alt="Image" />
          </div>
        </div>
        <div className={styles.link}>
          <span>EXPLORE MORE PRODUCTS</span>
          <Image width={34} height={34} src={arrow.src} alt="arrow" />
        </div>
      </div>
      <div>
        <div className={styles.pad}>
          <div className={styles.regHead}>
            <div>Creating light</div>
            <div className={styles.trail}>In every environment</div>
          </div>
          <div>
            <div className={styles.input}>
              <input type="email" name="email" placeholder="Email" />
            </div>
            <div className={styles.input}>
              <input type="text" name="product" placeholder="Product" />
            </div>
            <div className={styles.input}>
              <input type="text" name="message" placeholder="Message" />
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
