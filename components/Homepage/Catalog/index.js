import styles from "./styles.module.scss";
import Link from "next/link";
import NextImage from "next/image";
import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  Image,
  Slide,
  Slider,
} from "pure-react-carousel";
import { Skeleton } from "@mui/material";
import { assetHost } from "lib/constants";
import SafePreview from "lib/components/SafePreview";
import "pure-react-carousel/dist/react-carousel.es.css";
import arrow from "assets/arrow.svg";
import { useRouter } from "next/router";

const Preview = ({ product }) => {
  const images = product.attributes.displayImages.data;
  if (!images) return <Skeleton variant="rectangular" height="100%" />;
  const img = images[0];
  return (
    <div className={styles.catalogImage}>
      <Image
        src={`${assetHost}${img.attributes.url}`}
        alt={img.attributes.alternativeText}
        renderLoading={() => <Skeleton variant="rectangular" height="100%" />}
      />
      <div className={styles.dark}>
        <div className={styles.name}>{product.attributes.name}</div>
      </div>
    </div>
  );
};

const Catalog = ({ products }) => {
  const router = useRouter();
  return (
    <div>
      <div className={styles.padH}>
        <div className={styles.regHead}>
          <div>Creating light</div>
          <div className={styles.trail}>In every environment</div>
        </div>
      </div>
      <div className={styles.catalog}>
        <div className={styles.grid}>
          <CarouselProvider
            naturalSlideWidth={12}
            naturalSlideHeight={25}
            totalSlides={products.length}
            visibleSlides={6}
          >
            <Slider>
              {products.map((product, index) => (
                <Slide
                  index={index}
                  key={product.id}
                  onClick={() =>
                    router.push(`/products/${product.attributes.slug}`)
                  }
                >
                  <SafePreview height="100%">
                    <Preview product={product} />
                  </SafePreview>
                </Slide>
              ))}
            </Slider>
            <ButtonBack className={styles.backButton}>
              <NextImage
                src={arrow.src}
                alt="previous"
                width={46}
                height={46}
              />
            </ButtonBack>
            <ButtonNext className={styles.nextButton}>
              <NextImage src={arrow.src} alt="next" width={46} height={46} />
            </ButtonNext>
          </CarouselProvider>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
