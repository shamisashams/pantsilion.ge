import React, { useState } from "react";
//import { Link } from "react-router-dom";
import { Link, usePage } from "@inertiajs/inertia-react";
import { IoTrashOutline } from "react-icons/io5";
import { cartList } from "../components/Data";
import MainButton from "../components/MainButton";
import Quantity from "../components/Quantity";
import Layout from "../Layouts/Layout";
import {Inertia} from "@inertiajs/inertia";

const Favorites = ({seo}) => {

    const {wishlist} = usePage().props;

    console.log(wishlist);

    function removeFromWishlist(id){
        Inertia.get(route('client.favorite.remove'), {id:id})
    }

  return (
      <Layout seo={seo}>
          <div className="wrapper py-40">
              <div className="text-4xl bold mb-10">Favorites</div>
              {wishlist.map((item, index) => {
                  return (
                      <div
                          key={index}
                          className={`flex justify-between items-center border-b border-zinc-200 pb-5 mb-5 lg:overflow-x-hidden  overflow-x-scroll scrollbar ${
                              cartList.length === index + 1 ? "border-none mb-10" : ""
                          }`}
                      >
                          <div className="shrink-0 lg:w-96 w-80 flex items-center">
                              <div className="w-32 h-32 mr-5 shrink-0">
                                  <img
                                      src={item.product.latest_image ? '/' + item.product.latest_image.path + '/' + item.product.latest_image.title:null}
                                      className="w-full h-full object-cover"
                                      alt=""
                                  />
                              </div>
                              <div>
                                  <div className="bold mb-1">{item.product.title} </div>
                                  <div className="text-sm opacity-50 mb-1">
                                      Color: {item.color}
                                      <br />
                                      Size: {item.size}
                                  </div>
                                  <Link href="/" className=" text-sm text-sky-500 hover:underline">
                                      Edit
                                  </Link>
                              </div>
                          </div>

                          <Quantity item={item} />
                          <div className="w-28 text-lg bold whitespace-nowrap mx-4">
                              ₾ {item.product.price}
                          </div>

                          <button onClick={() => {
                              removeFromWishlist(item.product.id)
                          }} className="shrink-0 w-12 h-12 flex items-center justify-center rounded-full text-custom-red hover:bg-zinc-200 hover:text-black  transition-all">
                              <IoTrashOutline className="w-6 h-6 " />
                          </button>
                          <div className="w-52 ml-10 mr-3">
                              {" "}
                              <MainButton>Buy now</MainButton>
                          </div>
                          <div className="">
                              {" "}
                              <MainButton reverse>Add to cart</MainButton>
                          </div>
                      </div>
                  );
              })}
          </div>
      </Layout>

  );
};

export default Favorites;
