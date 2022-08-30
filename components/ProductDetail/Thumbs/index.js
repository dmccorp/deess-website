import styles from "./styles.module.scss";
import arrow from "./arrow.svg";
import { ButtonBack, ButtonNext, CarouselContext } from "pure-react-carousel";
import { useContext } from "react";

export default function Thumbs({ images }) {
  const carouselContext = useContext(CarouselContext);
  return (
    <div className={styles.container}>
      <ButtonBack className={styles.backButton}>
        <img src={arrow.src} alt="prev" />
      </ButtonBack>
      <div className={styles.thumbs}>
        {images.map((img, index) => (
          <button
            key={index}
            type="button"
            onClick={() => {
              console.log(index, carouselContext.state);
              carouselContext.setStoreState({ currentSlide: index });
            }}
          >
            <img
              src={`https://deess.dmcworks.in${img.attributes.formats.thumbnail.url}`}
              alt={img.attributes.alternativeText}
            />
          </button>
        ))}
      </div>
      <ButtonNext className={styles.nextButton}>
        <img src={arrow.src} alt="prev" />
      </ButtonNext>
    </div>
  );
}
