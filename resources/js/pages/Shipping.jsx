import React, { useState } from "react";
//import { Link } from "react-router-dom";
import { Link, usePage } from "@inertiajs/inertia-react";
import { cartList } from "../components/Data";
import MainButton from "../components/MainButton";
import { BsArrowLeft } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";

//import flag from "../assets/images/svg/flag.svg";
//import pin from "../assets/images/svg/pin.svg";
//import phone from "../assets/images/svg/phone.svg";
//import i from "../assets/images/svg/i.svg";

import Layout from "../Layouts/Layout";

const Shipping = ({seo}) => {
  const [chooseCity, setChooseCity] = useState(false);

  const {cart, cities} = usePage().props;

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
                              className="border-b-4 bold pb-5 border-custom-red pb-5 text-custom-red md:w-1/3 text-center  "
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
                      <div className="text-center py-5 mb-16 max-w-lg mx-auto">
                          <div className="md:text-4xl text-2xl bold">
                              Pick location where we should deliver items
                          </div>
                          <p className="md:my-10 my-5">
                              Choose from a wide range of premium quality wooden furniture
                              online.{" "}
                          </p>
                          <form>
                              <div
                                  onClick={() => setChooseCity(!chooseCity)}
                                  className="w-full h-16 mb-3 text-center bg-white relative"
                              >
                                  <div className="w-full h-full flex items-center justify-center relative">
                                      Choose city
                                      <FiChevronDown className="absolute top-1/2 -translate-y-1/2 right-5" />
                                      <img
                                          src="/client/assets/images/svg/flag.svg"
                                          alt=""
                                          className="absolute top-1/2 -translate-y-1/2 left-5 bg-white"
                                      />
                                  </div>
                                  <div
                                      className={`absolute left-0 top-full w-full bg-white scrollbar transition-all duration-300 z-10  ${
                                          chooseCity
                                              ? "max-h-72  overflow-y-scroll"
                                              : " max-h-0  overflow-y-hidden"
                                      }`}
                                  >
                                      <button className="w-full p-3 transition-all hover:bg-zinc-100 block">
                                          Tbilisi
                                      </button>
                                      <button className="w-full p-3 transition-all hover:bg-zinc-100 block">
                                          Gori
                                      </button>
                                      <button className="w-full p-3 transition-all hover:bg-zinc-100 block">
                                          Mstkheta
                                      </button>
                                      <button className="w-full p-3 transition-all hover:bg-zinc-100 block">
                                          Batumi
                                      </button>
                                      <button className="w-full p-3 transition-all hover:bg-zinc-100 block">
                                          Zugdidi
                                      </button>
                                      <button className="w-full p-3 transition-all hover:bg-zinc-100 block">
                                          Mstkheta
                                      </button>
                                      <button className="w-full p-3 transition-all hover:bg-zinc-100 block">
                                          Batumi
                                      </button>
                                      <button className="w-full p-3 transition-all hover:bg-zinc-100 block">
                                          Zugdidi
                                      </button>
                                  </div>
                              </div>
                              <div className="relative mb-3">
                                  <img
                                      src="/client/assets/images/svg/pin.svg"
                                      alt=""
                                      className="absolute top-1/2 -translate-y-1/2 left-5 bg-white"
                                  />
                                  <input
                                      type="text"
                                      placeholder="Enter your address"
                                      className="w-full h-16 text-center bg-white placeholder:text-custom-dark"
                                  />
                              </div>
                              <div className="relative mb-3">
                                  {" "}
                                  <img
                                      src="/client/assets/images/svg/phone.svg"
                                      alt=""
                                      className="absolute top-1/2 -translate-y-1/2 left-5 bg-white"
                                  />
                                  <input
                                      type="text"
                                      placeholder="Enter phone number"
                                      className="w-full h-16 text-center bg-white placeholder:text-custom-dark"
                                  />
                              </div>
                              <div className="relative mb-3">
                                  {" "}
                                  <img
                                      src="/client/assets/images/svg/i.svg"
                                      alt=""
                                      className="absolute top-1/2 -translate-y-1/2 left-5 bg-white"
                                  />
                                  <input
                                      type="text"
                                      placeholder="Leave a comment"
                                      className="w-full h-16 text-center bg-white placeholder:text-custom-dark"
                                  />
                              </div>
                          </form>
                      </div>
                      <Link className="bold" href="/cart">
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
                      <Link href="/payment">
                          <MainButton>Proceed to payment</MainButton>
                      </Link>
                  </div>
              </div>
          </div>
      </Layout>

  );
};

export default Shipping;
