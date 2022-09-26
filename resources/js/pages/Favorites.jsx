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

    const {wishlist,localizations} = usePage().props;

    console.log(wishlist);

    function removeFromWishlist(id){
        Inertia.get(route('client.favorite.remove'), {id:id})
    }

    function addToCart(product,qty){


        if(product.stocks){
            alert('out of stock')
            return;
        }
        Inertia.post(route('add-to-cart'), {id: product.id,qty:qty});
    }

    function buyNow(product,qty){
        if(product.stocks){
            alert('out of stock')
            return;
        }
        Inertia.post(route('add-to-cart'), {id: product.id,qty:qty, buy_now:true});
    }

    function addToCartCollection(collection){
        console.log(collection)


            Inertia.post(route('add-to-cart-collection'), {collection:collection.id});


    }

    function buyNowCollection(collection){
        console.log(collection)


        Inertia.post(route('add-to-cart-collection'), {collection:collection.id, buy_now: true});


    }

  return (
      <Layout seo={seo}>
          <div className="wrapper py-40">
              <div className="text-4xl bold mb-10">{__('client.favorites_title',localizations)}</div>
              {wishlist.map((item, index) => {
                  return (
                      item.product ? <div
                          key={index}
                          className={`flex justify-between items-center border-b border-zinc-200 pb-5 mb-5 lg:overflow-x-hidden  overflow-x-scroll scrollbar ${
                              wishlist.length === index + 1 ? "border-none mb-10" : ""
                          }`}
                      >
                          <div className="shrink-0 lg:w-96 w-80 flex items-center">
                              <div className="w-32 h-32 mr-5 shrink-0">
                                  <img
                                      src={item.product.latest_image ? item.product.latest_image.file_full_url:null}
                                      className="w-full h-full object-cover"
                                      alt=""
                                  />
                              </div>
                              <div>
                                  <div className="bold mb-1">{item.product.title} </div>
                                  <div className="text-sm opacity-50 mb-1">
                                      {item.product.attributes.map((attr,ind) => {

                                          return <div>{attr.attribute.name} : {attr.option}</div>
                                      })}
                                      {/*Color: {item.color}
                                      <br />
                                      Size: {item.size}*/}
                                  </div>
                                  {/*<Link href="/" className=" text-sm text-sky-500 hover:underline">
                                      Edit
                                  </Link>*/}
                              </div>
                          </div>

                          <Quantity item={item.product} />
                          <div className="w-28 text-lg bold whitespace-nowrap mx-4">
                              ₾ {item.product.min_price}
                          </div>

                          <button onClick={() => {
                              removeFromWishlist(item.product.id)
                          }} className="shrink-0 w-12 h-12 flex items-center justify-center rounded-full text-custom-red hover:bg-zinc-200 hover:text-black  transition-all">
                              <IoTrashOutline className="w-6 h-6 " />
                          </button>
                          <div className="w-52 ml-10 mr-3">
                              {" "}
                              <MainButton onclick={() => {
                                  let qty = document.getElementById('qty_' + item.product.id).value;
                                  console.log(qty)
                                  buyNow(item.product,qty)
                              }}>{__('client.buy_now',localizations)}</MainButton>
                          </div>
                          <div className="">
                              {" "}
                              <MainButton onclick={() => {

                                  let qty = document.getElementById('qty_' + item.product.id).value;
                                  console.log(qty)
                                      addToCart(item.product,qty)

                              }} reverse>{__('client.add_to_cart',localizations)}</MainButton>
                          </div>
                      </div>:<div
                          key={index}
                          className={`flex justify-between items-center border-b border-zinc-200 pb-5 mb-5 lg:overflow-x-hidden  overflow-x-scroll scrollbar ${
                              wishlist.length === index + 1 ? "border-none mb-10" : ""
                          }`}
                      >
                          <div className="shrink-0 lg:w-96 w-80 flex items-center">
                              <div className="w-32 h-32 mr-5 shrink-0">
                                  <img
                                      src={item.collection.latest_image ? item.collection.latest_image.file_full_url :null}
                                      className="w-full h-full object-cover"
                                      alt=""
                                  />
                              </div>
                              <div>
                                  <div className="bold mb-1">{item.collection.title} </div>
                                  <div className="text-sm opacity-50 mb-1">
                                      {item.collection.attributes.map((attr,ind) => {

                                          return <div>{attr.attribute.name} : {attr.option}</div>
                                      })}
                                      {/*Color: {item.color}
                                      <br />
                                      Size: {item.size}*/}
                                  </div>
                                  <Link href="/" className=" text-sm text-sky-500 hover:underline">
                                      furniture set
                                  </Link>
                              </div>
                          </div>

                          <Quantity item={item.collection} />
                          <div className="w-28 text-lg bold whitespace-nowrap mx-4">
                              ₾ {item.collection.price}
                          </div>

                          <button onClick={() => {
                              removeFromWishlist(item.collection.id)
                          }} className="shrink-0 w-12 h-12 flex items-center justify-center rounded-full text-custom-red hover:bg-zinc-200 hover:text-black  transition-all">
                              <IoTrashOutline className="w-6 h-6 " />
                          </button>
                          <div className="w-52 ml-10 mr-3">
                              {" "}
                              <MainButton onclick={() => {

                                  let qty = document.getElementById('qty_' + item.collection.id).value;
                                  console.log(qty)
                                  buyNowCollection(item.collection)

                              }}>{__('client.buy_now',localizations)}</MainButton>
                          </div>
                          <div className="">
                              {" "}
                              <MainButton onclick={() => {

                                  let qty = document.getElementById('qty_' + item.collection.id).value;
                                  console.log(qty)
                                  addToCartCollection(item.collection)

                              }} reverse>{__('client.add_to_cart',localizations)}</MainButton>
                          </div>
                      </div>
                  );
              })}
          </div>
      </Layout>

  );
};

export default Favorites;
