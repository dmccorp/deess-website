import styles from "./styles.module.css";
import Image from "next/image";
import images from "./images";
import logo from "assets/logo.svg";
import deess from "assets/deess.svg";

const AboutUs = () => {
  return (
    <div className={styles.section}>
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
                <p>
                  Déess aims to offer the most attractive, modern and innovative
                  lighting products. This is our mission, and we stand behind it
                  with the utmost commitment, constantly aiming to surpass
                  customer expectations. Our products are aimed at sophisticated
                  customers who appreciate innovative design, craftsmanship and
                  quality.
                </p>
                <p>
                  Déess resonates with the spirit and passion needed for light
                  fixtures to feel like an art. The company&apos;s mission is to
                  create modern, minimal and astonishing finishes by offering
                  products of highest quality at an affordable price. Déess
                  intends to become a benchmark within the lighting market by
                  delivering contemporary designs, high quality standards and a
                  distinctive identity.
                </p>
                <p>
                  Our ambition is to create lighting that makes a statement.
                  Light fixtures that are unique and personal to you. We combine
                  minimalism and elegance with every fixture tailored to you. We
                  pride ourselves on being a premium brand with an eye on
                  quality. Our products are designed in Belgium, manufactured at
                  our factories across Europe and assembled locally by experts.{" "}
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
