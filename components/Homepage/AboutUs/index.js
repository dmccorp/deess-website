import styles from "./styles.module.css";
import Image from "next/image";
import images from "./images";
import logo from "assets/logo.svg";
import deess from "assets/deess.svg";

const AboutUs = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageRight}>
        <div>
          <div className={styles.splitL}>
            <div className={styles.gridC}>
              <div className={styles.logoC}>
                <Image width={209} height={45} src={logo.src} alt="DEESS" />
                <div className={styles.logoBg}>
                  <Image layout="fill" src={deess.src} alt="DEESS" />
                </div>
              </div>
              <div className={styles.pad}>
                <p>
                  Deess was founded as a brand in 2015 in Belgium, by a team
                  with more than 20 years of experience in manufacturing
                  lighting fixtures. Our journey is marked by two fundamental
                  approaches: close collaboration with architects, engineers and
                  designers to create customized solutions for each project, and
                  a constant desire to excel.
                </p>
                <p>
                  We tend to minimize the fitting dimensions, and maximize the
                  performance. We are focusing on minimum glare, discreet and
                  ultra- modern designs, combined with the highest luminous
                  flux.
                </p>
                <p>
                  We believe that design is about more than just aesthetics.
                  It&apos;s about the balance between design in combination with
                  optics, electronics and finishing. The final products are
                  always a perfect match combining all the values.
                </p>
                <p>
                  Deess designs products with precision in mind—from their final
                  form to their effect on your life—so that you can enjoy the
                  best possible experience every time you use them.
                </p>
                <p>
                  Déess was born from a search for something poetic, modern and
                  minimal. The result is elegant and sophisticated minimalist
                  light fixtures. Each fixture creates internal glow that will
                  make any space feel warm, cozy and refined. We understand the
                  important of an interior design, and we pride ourselves in
                  designing products that only elevates and enhances your
                  design.
                </p>
                <p>
                  For centuries, we have lived by the belief that light is a
                  crucial component of life. It helps us see, learn and work,
                  but more importantly it gives us the energy to enjoy
                  life&apos;s pleasures. With our modern designs and
                  cutting-edge technology, each fixture is engineered with your
                  comfort in mind.
                </p>
              </div>
            </div>
            <div className={styles.gridC}>
              <div className={styles.grid}>
                <div className={`${styles.gridImg}`}>
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src={images[0].src}
                    alt="Image"
                  />
                </div>
                <div className={`${styles.gridImg} ${styles.gridImgLeft}`}>
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src={images[1].src}
                    alt="Image"
                  />
                </div>
                <div className={`${styles.gridImg} ${styles.gridImgRight}`}>
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src={images[2].src}
                    alt="Image"
                  />
                </div>
                <div className={`${styles.gridImg} ${styles.gridImgUp}`}>
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src={images[3].src}
                    alt="Image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
