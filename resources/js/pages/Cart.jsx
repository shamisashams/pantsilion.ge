import React, { useState } from "react";
//import { Link } from "react-router-dom";
import { Link, usePage } from "@inertiajs/inertia-react";
import { IoTrashOutline } from "react-icons/io5";
import { cartList } from "../components/Data";
import MainButton from "../components/MainButton";
import { BsArrowLeft } from "react-icons/bs";
import Quantity from "../components/Quantity";
import Layout from "../Layouts/Layout";
import { Inertia } from '@inertiajs/inertia'

const Cart = ({seo}) => {

    const {cart} = usePage().props;
    console.log(cart);

    function removeItem(id){
        Inertia.get(route('remove-from-cart'), {id:id})
    }

    function removeCollection(id){
        Inertia.get(route('remove-from-cart-collection'), {id:id})
    }

  return (
      <Layout seo={seo}>
          <div className="bg-zinc-100 overflow-hidden ">
              <div className="wrapper h-full flex items-start justify-between flex-col xl:flex-row xl:pb-0 pb-20">
                  <div className="xl:w-3/4 w-full mr-10 pt-44 pb-20">
                      <div className="flex justify-between items-start border-b border-zinc-300 md:text-lg text-sm mb-10">
                          <Link
                              href={route('client.cart.index')}
                              className="border-b-4 border-custom-red bold pb-5 text-custom-red md:w-1/3"
                          >
                              1. Cart
                          </Link>
                          <Link
                              href={route('client.shipping.index')}
                              className=" bold pb-5 text-gray-500 md:w-1/3 text-center"
                          >
                              2. Shipping details
                          </Link>
                          <Link
                              href={route('client.payment.index')}
                              className=" bold pb-5 text-gray-500 md:w-1/3 text-right"
                          >
                              3. Payment details
                          </Link>
                      </div>
                      {cart.products.map((item, index) => {
                          return (
                              <div
                                  key={index}
                                  className={`flex justify-between items-center border-b border-zinc-200 pb-5 mb-5 md:overflow-x-hidden  overflow-x-scroll scrollbar ${
                                      cart.length === index + 1 ? "border-none mb-10" : ""
                                  }`}
                              >
                                  <div className="shrink-0 md:w-96 w-80 flex items-center">
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
                                              Color: {item.product.attributes.color}
                                              <br />
                                              Size: {item.product.attributes.size}
                                          </div>
                                          <Link
                                              href="/"
                                              className=" text-sm text-sky-500 hover:underline"
                                          >
                                              Edit
                                          </Link>
                                      </div>
                                  </div>

                                  <Quantity item={item} cart={true} />
                                  <div className="w-28 text-lg bold whitespace-nowrap mx-4">
                                      ₾ {item.product.price}
                                  </div>

                                  <button onClick={() => {removeItem(item.product.id)}} className="shrink-0 w-12 h-12 flex items-center justify-center rounded-full text-custom-red hover:bg-zinc-200 hover:text-black  transition-all">
                                      <IoTrashOutline className="w-6 h-6 " />
                                  </button>
                              </div>
                          );
                      })}


                      {cart.collections.map((item, index) => {
                          return (
                              <div
                                  key={index}
                                  className={`flex justify-between items-center border-b border-zinc-200 pb-5 mb-5 md:overflow-x-hidden  overflow-x-scroll scrollbar ${
                                      cart.length === index + 1 ? "border-none mb-10" : ""
                                  }`}
                              >
                                  <div className="shrink-0 md:w-96 w-80 flex items-center">
                                      <div className="w-32 h-32 mr-5 shrink-0">
                                          <img
                                              src={item.collection.latest_image ? '/' + item.collection.latest_image.path + '/' + item.collection.latest_image.title:null}
                                              className="w-full h-full object-cover"
                                              alt=""
                                          />
                                      </div>
                                      <div>
                                          <div className="bold mb-1">{item.collection.title} </div>
                                          <div className="text-sm opacity-50 mb-1">
                                              Color: {item.collection.attributes.label}

                                          </div>
                                          <Link
                                              href="/"
                                              className=" text-sm text-sky-500 hover:underline"
                                          >
                                              furniture set
                                          </Link>
                                      </div>
                                  </div>

                                  <Quantity item={item} collection={true} />
                                  <div className="w-28 text-lg bold whitespace-nowrap mx-4">
                                      ₾ {item.collection.price}
                                  </div>

                                  <button onClick={() => {removeCollection(item.collection.id)}} className="shrink-0 w-12 h-12 flex items-center justify-center rounded-full text-custom-red hover:bg-zinc-200 hover:text-black  transition-all">
                                      <IoTrashOutline className="w-6 h-6 " />
                                  </button>
                              </div>
                          );
                      })}

                      <Link className="bold" href="/products">
                          <BsArrowLeft className="inline-block mr-2 w-5 h-5" />
                          Continue shopping
                      </Link>
                  </div>
                  <div
                      className="bg-white h-auto self-stretch relative p-8 xl:pt-60 pb-10 xl:mt-0 mt-10 flex flex-col justify-between
            after:left-full after:top-0 after:bg-white after:w-full after:xl:block after:hidden after:h-full after:min-w-lg"
                  >
                      <div className="mb-10">
                          <div className="text-3xl bold mb-3">Summary</div>
                          <div className="opacity-50 mb-3 ">({cart.count} items)</div>
                          <div className="flex items-center justify-between border-b border-t border-zinc-200  py-3 mb-5">
                              <div>Subtotal</div>
                              <div>₾ {cart.total}</div>
                          </div>
                          <div className="text-sky-500 bold mb-3">Use discount code</div>
                          <input
                              type="text"
                              className="border border-zinc-200 mb-3 w-full h-10 pl-3"
                          />
                          <button className="bg-zinc-100 bold py-2 px-10">Apply code</button>
                      </div>
                      <Link href={route('client.shipping.index')}>
                          <MainButton>Proceed to Shipping details</MainButton>
                      </Link>
                  </div>
              </div>
          </div>
      </Layout>

  );
};

export default Cart;
