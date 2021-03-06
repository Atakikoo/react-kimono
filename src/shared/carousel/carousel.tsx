import React, { useState } from "react";
import "./carousel.scss";
import {
  CarouselDisplay,
  CarouselDisplayEnums
} from "../../domain/carousel-display-type";
import { ISlideContent } from '../photos-displayer/photos-displayer';
import { RichText } from 'prismic-reactjs';

interface PropsType {
  content: ISlideContent[];
  type?: CarouselDisplay;
}

export const Carousel = (props: PropsType) => {
  const slides: ISlideContent[] = props.content;
  const length = slides.length;
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const type = props.type || CarouselDisplayEnums.CLASSIC;
  const nextSlide = () => {
    if (type === CarouselDisplayEnums.PREVIEW || length === 1) return;
    const nextSlide = currentSlide + 1 === length ? 0 : currentSlide + 1;
    setCurrentSlide(nextSlide);
  };

  return (
    <div className={"carousel " + type}>
      <div className="slide-container">
        {slides.map((slide, key) => (
          <div
            className="slide"
            style={{
              opacity:
                key === currentSlide || type === CarouselDisplayEnums.PREVIEW
                  ? 1
                  : 0,
              cursor:
                key === currentSlide &&
                  (type === CarouselDisplayEnums.PREVIEW || length > 1)
                  ? "pointer"
                  : "none",
              zIndex:
                key === currentSlide || type === CarouselDisplayEnums.PREVIEW
                  ? 10
                  : 0
            }}
            key={key}
            onClick={nextSlide}
          >
            <img src={slide.url} alt={"Slide " + key} />
            {type === CarouselDisplayEnums.CLASSIC &&
              slides &&
              slides.length > 1 && (
                <div className="info">
                  <div>{RichText.render(slide.text)}</div>
                  <div>{key + 1} / {length}</div>
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};
