import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";
import "swiper/css";
import { productSlider } from "./Data";
import ProductBox from "./ProductBox";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { Navigation, FreeMode } from "swiper";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";

const ProductSlider = ({products}) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <React.StrictMode>
      <Swiper
        navigation={true}
        freeMode={true}
        modules={[Navigation, FreeMode]}
        grabCursor
        spaceBetween={40}
        slidesPerView={5}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        breakpoints={{
          1300: {
            slidesPerView: 5,
          },
          1200: {
            slidesPerView: 4,
          },
          1000: {
            slidesPerView: 3,
            centeredSlides: false,
          },
          500: {
            slidesPerView: 2,
          },
          200: {
            slidesPerView: 1,
            centeredSlides: true,
          },
        }}
      >
        {products.map((item, index) => {
            if(item.variant_count === 1){
                return (
                    <SwiperSlide key={index}>
                        <ProductBox
                            link={route('client.product.show',item.slug)}
                            new={item.new}
                            sale={item.sale}
                            img={item.latest_image ? item.latest_image.thumb_full_url:null}
                            name={item.title}
                            price={item.last_variant.special_price ? item.last_variant.special_price : item.last_variant.price}
                            oldPrice={item.last_variant.special_price ? item.last_variant.price : null}
                            paragraph={item.short_description}
                            id={item.id}
                            single
                        />
                    </SwiperSlide>
                );
            } else {
                return (
                    <SwiperSlide key={index}>
                        <ProductBox
                            link={route('client.product.show',item.slug)}
                            new={item.new}
                            sale={item.sale}
                            img={item.latest_image ? item.latest_image.thumb_full_url:null}
                            name={item.title}
                            price={item.min_price}
                            oldPrice={item.oldPrice}
                            paragraph={item.short_description}
                            id={item.id}
                        />
                    </SwiperSlide>
                );
            }

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

export default ProductSlider;
