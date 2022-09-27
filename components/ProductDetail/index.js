import Layout from "components/shared/Layout";
import { CarouselProvider, Image, Slide, Slider } from "pure-react-carousel";
import ProductInfo from "./ProductInfo";
import styles from "./styles.module.scss";
import "pure-react-carousel/dist/react-carousel.es.css";
import Head from "next/head";
import Thumbs from "./Thumbs";
import Button from "components/shared/Button";
import { useState } from "react";
import Images from "./Images";
import { siteName } from "lib/constants";
import { Skeleton } from "@mui/material";
import { assetHost } from "lib/constants";

export default function ProductDetail({ product }) {
  const [configureMode, setConfigureMode] = useState(false);
  const toggleConfigure = () => setConfigureMode(!configureMode);
  return (
    <Layout>
      <Head>
        <title>
          {product.name} - ${siteName}
        </title>
      </Head>
      <div className={styles.container}>
        <div className={styles.mobileTitle}>
          <h1>{product.name}</h1>
          <div className={styles.cat}>
            {product.categories.data
              .map((category) => category.attributes.name)
              .join(", ")}
          </div>
        </div>
        <div className={styles.productDisplay}>
          <div className={styles.productPicture}>
            <CarouselProvider
              naturalSlideWidth={23}
              naturalSlideHeight={27}
              totalSlides={product.images.data.length}
            >
              <Slider>
                {product.images.data.map((img, index) => (
                  <Slide index={index} key={index}>
                    <Image
                      className={styles.image}
                      src={`${assetHost}${img.attributes.url}`}
                      alt={img.attributes.alternativeText}
                      renderLoading={() => (
                        <Skeleton
                          variant="rectangular"
                          width={480}
                          height={480 * 1.17}
                        />
                      )}
                    />
                  </Slide>
                ))}
              </Slider>
              <Thumbs images={product.images.data} />
            </CarouselProvider>
          </div>
          <div className={styles.productDetail}>
            <div className={styles.productText}>
              <div className={styles.small}>
                <h3>Description</h3>
              </div>
              <div className={styles.big}>
                <h1>{product.name}</h1>
                <div className={styles.cat}>
                  {product.categories.data
                    .map((category) => category.attributes.name)
                    .join(", ")}
                </div>
              </div>
              <div className={styles.desc}>
                <p>{product.description}</p>
              </div>
            </div>
            <div className={styles.bottom}>
              <h4>Configure your {product.name}</h4>
              <div>
                <Button onClick={toggleConfigure} light={configureMode}>
                  {configureMode ? "Exit Configurator" : "Configure"}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <ProductInfo product={product} configureMode={configureMode} />
          <Images product={product} />
        </div>
      </div>
    </Layout>
  );
}
