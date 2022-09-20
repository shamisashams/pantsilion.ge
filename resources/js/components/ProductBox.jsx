import React, { useState } from "react";
import { FiSearch, FiHeart, FiShoppingCart } from "react-icons/fi";
//import { Link } from "react-router-dom";
import { Link, usePage } from "@inertiajs/inertia-react";
import { Inertia } from '@inertiajs/inertia';


const ProductBox = (props) => {
  const [favorite, setFavorite] = useState(false);
  const [addToCart, setAddToCart] = useState(false);

  function addToWishlist(id){
      Inertia.post(route('client.favorite.add'), {id:id});
  }

  function addToCartF(id){
      Inertia.post(route('add-to-cart'), {id:id,qty:1});
  }

  return (
    <div className="group md:max-w-sm inline-block">
      <div className="w-full h-80 mb-4 overflow-hidden  relative">
        {(props.new || props.sale) && (
          <div
            className={`absolute top-2 left-2 bg-white rounded-lg py-4 px-3 bold z-20 ${
              props.sale ? "text-green-500" : ""
            }`}
          >
            {props.new ? "New" : "Sale"}
          </div>
        )}
        <img src={props.img} className="w-full h-full object-cover" alt="" />
        <div className="absolute left-0 top-0 w-full h-full transition-all duration-500 opacity-0 group-hover:opacity-40 bg-zinc-100"></div>
        <div className="flex items-center justify-center absolute left-1/2 top-full group-hover:top-1/2 group-hover:-translate-y-1/2 -translate-x-1/2 transition-all duration-300 ">
          <button
            onClick={() => {
                setFavorite(!favorite)
                addToWishlist(props.id)
            }}
            className="bg-white rounded-lg flex items-center justify-center w-12 h-12 transition-all duration-500 translate-y-5 group-hover:translate-y-0 "
          >
            <FiHeart className={favorite ? "text-custom-red" : ""} />
          </button>
          <Link href={props.link}>
              <button
                  onClick={() => {
                      setAddToCart(!addToCart)
                      addToCartF(props.id)
                  }}
                  className="bg-white rounded-lg flex items-center justify-center w-12 h-12 mx-2 transition-all duration-500 translate-y-16 group-hover:translate-y-0"
              >
                  <FiShoppingCart className={addToCart ? "text-orange-400" : ""} />
              </button>
          </Link>
            {" "}
          <Link href={props.link}>
            <button className="bg-white rounded-lg flex items-center justify-center w-12 h-12 transition-all duration-500 translate-y-24 group-hover:translate-y-0">
              <FiSearch />
            </button>
          </Link>
        </div>
      </div>
      <div className="flex justify-between items-center ">
        <div className="bold">{props.name}</div>
        <div className="text-xl bold">
          <span
            className={`line-through text-sm opacity-50 ${
              props.oldPrice ? "inline-block " : "hidden"
            }`}
          >
            ₾{props.oldPrice}
          </span>{" "}
          <span className={props.oldPrice ? "text-custom-red" : ""}>
            ₾{props.price}
          </span>
        </div>
      </div>
      <p className="text-sm pt-3">{props.paragraph}</p>
    </div>
  );
};

export default ProductBox;
