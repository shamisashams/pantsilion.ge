import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";
import "swiper/css";
import { blogSlider } from "./Data";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { Navigation, FreeMode } from "swiper";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import BlogBox from "./BlogBox";

const BlogSlider = ({blogs}) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <React.StrictMode>
      <Swiper
        navigation={true}
        freeMode={true}
        modules={[Navigation, FreeMode]}
        grabCursor
        spaceBetween={30}
        slidesPerView={4}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        breakpoints={{
          1300: {
            slidesPerView: 4,
          },

          1100: {
            slidesPerView: 3,
            centeredSlides: false,
          },
          600: {
            slidesPerView: 2,
          },
          200: {
            slidesPerView: 1,
            centeredSlides: true,
          },
        }}
      >
        {blogs.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <BlogBox
                link={route('client.blog.show',item.slug)}
                date={translateDate(item.created_at)}
                title={item.title}
                img={item.latest_image ? item.latest_image.file_full_url :null}
                paragraph={item.short_description}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="wrapper flex items-center justify-between pt-10 ">
        <button
          ref={prevRef}
          className="   rounded-full text-custom-dark flex items-center justify-center w-10 h-10 hover:bg-zinc-200  transition duration-300   z-10 cursor-pointer"
        >
          <BsArrowLeft className="w-8 h-8" />
        </button>
        <button
          ref={nextRef}
          className="  rounded-full text-custom-dark flex items-center justify-center w-10 h-10 hover:bg-zinc-200  transition duration-300  z-10 cursor-pointer"
        >
          <BsArrowRight className="w-8 h-8" />
        </button>
      </div>
    </React.StrictMode>
  );
};

export default BlogSlider;
