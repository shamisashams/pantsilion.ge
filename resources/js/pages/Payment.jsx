import React, { useState } from "react";
//import { Link } from "react-router-dom";
import { Link, usePage } from "@inertiajs/inertia-react";
import { cartList } from "../components/Data";
import MainButton from "../components/MainButton";
import { BsArrowLeft } from "react-icons/bs";
//import card1 from "../assets/images/icons/1.png";
//import card2 from "../assets/images/icons/2.png";
//import card3 from "../assets/images/icons/3.png";
//import card4 from "../assets/images/icons/4.png";
//import bank1 from "../assets/images/icons/5.png";
//import bank2 from "../assets/images/icons/6.png";
import { HiQuestionMarkCircle } from "react-icons/hi";
import Layout from "../Layouts/Layout";
import {Inertia} from "@inertiajs/inertia";

const Payment = ({seo}) => {
    const {cart} = usePage().props;

    function makeOrder(){
        Inertia.post(route('client.checkout.order'))
    }
  return (
      <Layout seo={seo}>
          <div className="bg-zinc-100 overflow-hidden ">
              <div className="wrapper h-full flex items-start justify-between flex-col xl:flex-row xl:pb-0 pb-20">
                  <div className="xl:w-3/4 w-full mr-10 pt-44 pb-20">
                      <div className="flex justify-between items-start border-b border-zinc-300 md:text-lg text-sm mb-10">
                          <Link href={route('client.cart.index')} className=" bold pb-5  md:w-1/3">
                              1. Cart
                          </Link>
                          <Link
                              href={route('client.shipping.index')}
                              className="bold pb-5  pb-5  md:w-1/3 text-center  "
                          >
                              2. Shipping details
                          </Link>
                          <Link
                              href={route('client.payment.index')}
                              className="border-b-4
border-custom-red
text-custom-red bold pb-5  md:w-1/3 text-right"
                          >
                              3. Payment details
                          </Link>
                      </div>
                      <div className=" mb-16 max-w-lg mx-auto">
                          <div className="relative mb-3 w-full p-5  bg-white flex">
                              <div className="shrink-0 w-24 inline-block mr-">Ship to:</div>
                              <span className="opacity-50">
                Tbilisi, Kaspi street #32. flat 15bilisi
              </span>
                          </div>
                          <div className="relative mb-3 w-full py-5 pl-5  bg-white">
                              <div className="shrink-0 w-24 inline-block mr-">Contact:</div>
                              <span className="opacity-50">598 33 21 53</span>
                          </div>
                          <div className="bold text-lg mt-10 mb-5">Payment details</div>
                          <div className="flex justify-between mb-4">
                              <div>Cards we accept</div>
                              <div>
                                  <img
                                      className="bg-white inline-block ml-2"
                                      src="/client/assets/images/icons/1.png"
                                      alt=""
                                  />
                                  <img
                                      className="bg-white inline-block ml-2"
                                      src="/client/assets/images/icons/2.png"
                                      alt=""
                                  />
                                  <img
                                      className="bg-white inline-block ml-2"
                                      src="/client/assets/images/icons/3.png"
                                      alt=""
                                  />
                                  <img
                                      className="bg-white inline-block ml-2"
                                      src="/client/assets/images/icons/4.png"
                                      alt=""
                                  />
                              </div>
                          </div>
                          <div className="relative mb-3">
                              <input
                                  type="text"
                                  placeholder="Card number"
                                  className="w-full h-16 pl-5 bg-white placeholder:text-custom-dark"
                              />
                          </div>
                          <div className="relative mb-3">
                              <input
                                  type="text"
                                  placeholder="Name on card"
                                  className="w-full h-16 pl-5 bg-white placeholder:text-custom-dark"
                              />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                              <div className="relative mb-3">
                                  <input
                                      type="text"
                                      placeholder="Expiration date (MM/YY)"
                                      className="w-full h-16 pl-5 bg-white placeholder:text-custom-dark"
                                  />
                              </div>
                              <div className="relative mb-3">
                                  <input
                                      type="text"
                                      placeholder="Security code"
                                      className="w-full h-16 pl-5 bg-white placeholder:text-custom-dark"
                                  />
                                  <Link href="/">
                                      <HiQuestionMarkCircle className="w-5 h-5 absolute top-1/2 -translate-y-1/2 right-3 bg-white" />
                                  </Link>
                              </div>
                          </div>
                          <div className="bold text-lg mt-10 mb-5">
                              Or make an installment
                          </div>
                          <div className="grid grid-cols-2 gap-3 mb-5">
                              <Link
                                  href="/"
                                  className="bg-white flex justify-center items-center py-2"
                              >
                                  <img src="/client/assets/images/icons/5.png" alt="" />
                              </Link>
                              <Link
                                  href="/"
                                  className="bg-white flex justify-center items-center py-2"
                              >
                                  <img src="/client/assets/images/icons/6.png" alt="" />
                              </Link>
                          </div>
                          <MainButton onclick={makeOrder}> Make a payment now</MainButton>
                      </div>
                      <Link className="bold text-center" href="/cart">
                          <BsArrowLeft className="inline-block mr-2 w-5 h-5" />
                          Back to carts
                      </Link>
                  </div>
                  <div
                      className="bg-white h-auto self-stretch relative p-8 xl:pt-60 pb-10 xl:mt-0 mt-10 flex flex-col justify-between
        after:left-full after:top-0 after:bg-white after:w-full after:xl:block after:hidden after:h-full after:min-w-lg "
                  >
                      <div className="mb-10">
                          <div className="text-3xl bold mb-3">Summary</div>
                          <div className="opacity-50 mb-3 ">({cart.count} items)</div>
                          <div className="h-72 overflow-y-scroll pr-5 my-5 scrollbar">
                              {cart.products.map((item, index) => {
                                  return (
                                      <div
                                          key={index}
                                          className="flex items-start justify-between mb-5"
                                      >
                                          <div className=" flex items-start">
                                              <div className="w-20 h-20 mr-3 shrink-0">
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
                                                      Quantity: {item.quantity}
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="text-lg ml-4">₾{item.product.price}</div>
                                      </div>
                                  );
                              })}

                              {cart.collections.map((item, index) => {
                                  return (
                                      <div
                                          key={index}
                                          className="flex items-start justify-between mb-5"
                                      >
                                          <div className=" flex items-start">
                                              <div className="w-20 h-20 mr-3 shrink-0">
                                                  <img
                                                      src={item.collection.latest_image ? '/' + item.collection.latest_image.path + '/' + item.collection.latest_image.title:null}
                                                      className="w-full h-full object-cover"
                                                      alt=""
                                                  />
                                              </div>
                                              <div>
                                                  <div className="bold mb-1">{item.collection.title} </div>
                                                  <div className=" mb-1">furniture set </div>
                                                  <div className="text-sm opacity-50 mb-1">
                                                      Color: {item.collection.attributes.label}
                                                      <br />
                                                      Quantity: {item.quantity}
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="text-lg ml-4">₾{item.collection.price}</div>
                                      </div>
                                  );
                              })}
                          </div>

                          <div className="flex items-center justify-between border-b border-t border-zinc-200  py-3 mb-5">
                              <div>Subtotal</div>
                              <div className="bold text-lg">₾ {cart.total}</div>
                          </div>
                          <div className="flex items-center justify-between  mb-5">
                              <div>Shipping</div>
                              <div className="bold text-lg">₾ 4495.55</div>
                          </div>
                      </div>
                      <div className="flex items-center justify-between  mb-5">
                          <div className="bold text-lg">Total</div>
                          <div className="bold text-xl">₾ 4495.55</div>
                      </div>
                  </div>
              </div>
          </div>
      </Layout>

  );
};

export default Payment;
