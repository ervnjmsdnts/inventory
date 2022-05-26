import React from "react";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";

import "keen-slider/keen-slider.min.css";

import Food from "../assets/food.jpg";
import Drinks from "../assets/juice.jpg";
import Fries from "../assets/fries.jpg";
import Tea from "../assets/tea.jpg";
import Tea2 from "../assets/tea2.jpg";
import Tea3 from "../assets/tea3.jpg";

const animation = { duration: 15000, easing: (t: any) => t };

const Slider = () => {
  const [sliderRef] = useKeenSlider({
    loop: true,
    renderMode: "performance",
    drag: false,
    created(s) {
      s.moveToIdx(5, true, animation);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
  });

  return (
    <div className="w-full md:block hidden ">
      <div className="w-[700px] mx-auto mt-16">
        <div ref={sliderRef} className="keen-slider">
          <div className="keen-slider__slide number-slide">
            <Image src={Drinks} alt="drinks" layout="fill" priority={true} />
          </div>
          <div className="keen-slider__slide number-slide">
            <Image src={Food} alt="food" layout="fill" priority={true} />
          </div>
          <div className="keen-slider__slide number-slide">
            <Image src={Fries} alt="fries" layout="fill" priority={true} />
          </div>
          <div className="keen-slider__slide number-slide">
            <Image src={Tea} alt="tea" layout="fill" priority={true} />
          </div>
          <div className="keen-slider__slide number-slide">
            <Image src={Tea2} alt="tea2" layout="fill" priority={true} />
          </div>
          <div className="keen-slider__slide number-slide">
            <Image src={Tea3} alt="tea3" layout="fill" priority={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
