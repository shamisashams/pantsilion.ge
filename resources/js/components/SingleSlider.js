import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import { Pagination, FreeMode, Navigation, Thumbs } from "swiper";
import { singleSwiper } from "./Data";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const SingleSlider = ({images}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <>
      <Swiper
        pagination={{
          type: "fraction",
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Pagination, FreeMode, Navigation, Thumbs]}
        className="w-full "
        grabCursor
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
      >
        {images.map((item, index) => {
          return (
            <SwiperSlide
              key={index}
              className=" pb-12"
              style={{ maxHeight: "600px" }}
            >
              <img alt="" src={item.file_full_url} className="w-full h-full object-cover" />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className=" flex items-center justify-between  -mt-8 mb-8">
        <button
          ref={prevRef}
          className="  text-xs rounded-full text-custom-dark flex items-center justify-center  transition duration-300   z-10 cursor-pointer"
        >
          <div>
            Prev
            <BsArrowLeft className="w-6 h-6" />
          </div>
        </button>
        <button
          ref={nextRef}
          className=" text-xs rounded-full text-custom-dark flex items-center justify-center  transition duration-300  z-10 cursor-pointer"
        >
          <div>
            Next
            <BsArrowRight className="w-6 h-6" />
          </div>
        </button>
      </div>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="sm:h-32 h-20 thumbnailSlider"
      >
        {images.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <img
                alt=""
                src={item.file_full_url}
                className="h-full w-full object-cover transition-all duration-300"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default SingleSlider;
