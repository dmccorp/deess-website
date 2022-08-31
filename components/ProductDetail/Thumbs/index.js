import styles from "./styles.module.scss";
import arrow from "./arrow.svg";
import { ButtonBack, ButtonNext, CarouselContext } from "pure-react-carousel";
import { useContext, useEffect, useRef, useState } from "react";
import classNames from "classnames";

export default function Thumbs({ images }) {
  const carouselContext = useContext(CarouselContext);
  const thumbs = useRef();
  const [currentSlide, setCurrentSlide] = useState(
    carouselContext.state.currentSlide
  );
  useEffect(() => {
    function onChange() {
      const idx = carouselContext.state.currentSlide;
      setCurrentSlide(idx);
      const target = thumbs.current.querySelector(
        `button:nth-child(${idx + 1})`
      );
      target.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
    carouselContext.subscribe(onChange);
    return () => carouselContext.unsubscribe(onChange);
  }, [carouselContext]);
  return (
    <div className={styles.container}>
      <ButtonBack className={styles.backButton}>
        <img src={arrow.src} alt="prev" />
      </ButtonBack>
      <div className={styles.thumbs} ref={thumbs}>
        {images.map((img, index) => (
          <button
            key={index}
            type="button"
            className={classNames({
              [styles.active]: index === currentSlide,
            })}
            onClick={() =>
              carouselContext.setStoreState({ currentSlide: index })
            }
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
