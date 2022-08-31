import Layout from "components/shared/Layout";
import { CarouselProvider, Image, Slide, Slider } from "pure-react-carousel";
import { Carousel } from "react-responsive-carousel";
import ProductInfo from "./ProductInfo";
import styles from "./styles.module.scss";
import "pure-react-carousel/dist/react-carousel.es.css";
import Head from "next/head";
import Thumbs from "./Thumbs";
import Button from "components/shared/Button";
import { useState } from "react";
import Images from "./Images";
// import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function ProductDetail({ product }) {
  const displayImage = product.images.data[0].attributes;
  const [configureMode, setConfigureMode] = useState(false);
  const toggleConfigure = () => setConfigureMode(!configureMode);
  return (
    <Layout lightHead>
      <Head>
        <title>{product.name} - déess lighting</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.productDisplay}>
          <div className={styles.productPicture}>
            {/* <figure>
              <Image
                src={`https://deess.dmcworks.in${displayImage.url}`}
                alt={displayImage.alternativeText}
                height={displayImage.height}
                width={displayImage.width}
                layout="fill"
                objectFit="cover"
              />
            </figure> */}
            {/* <Carousel
              showArrows={false}
              showStatus={false}
              showIndicators={false}
              renderThumbs={() =>
                product.images.data.map((img, index) => (
                  <img
                    key={index}
                    src={`https://deess.dmcworks.in${img.attributes.url}`}
                    alt={img.attributes.alternativeText}
                  />
                ))
              }
            >
              {product.images.data.map((img, index) => (
                <Image
                  key={index}
                  src={`https://deess.dmcworks.in${img.attributes.url}`}
                  alt={img.attributes.alternativeText}
                  height={img.attributes.height}
                  width={img.attributes.width}
                />
              ))}
              <style jsx>{`
                .carousel .thumb,
                .carousel .thumb.selected {
                  border-width: 1px;
                }
              `}</style>
            </Carousel> */}
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
                      src={`https://deess.dmcworks.in${img.attributes.url}`}
                      alt={img.attributes.alternativeText}
                    />
                  </Slide>
                ))}
              </Slider>
              <Thumbs images={product.images.data} />
            </CarouselProvider>
          </div>
          <div className={styles.productDetail}>
            <div className={styles.productText}>
              <h1>{product.name}</h1>
              <div className={styles.cat}>
                {product.categories.data
                  .map((category) => category.attributes.name)
                  .join(", ")}
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
