import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";
import "swiper/css";
//import { team } from "./Data";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { Navigation, FreeMode } from "swiper";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import TeamBox from "./TeamBox";
import { Link, usePage } from "@inertiajs/inertia-react";

const TeamSlider = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const {team} = usePage().props;
  //console.log(team)
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
        {team.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <TeamBox
                img={item.file ? '/' + item.file.path + '/' + item.file.title : null}
                name={item.name + ' ' + item.surname}
                position={item.position}
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

export default TeamSlider;
