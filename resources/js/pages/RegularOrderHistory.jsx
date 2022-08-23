import React, { useRef } from "react";
import { MdContentCopy } from "react-icons/md";
import { GoCreditCard } from "react-icons/go";
import { MdHistory } from "react-icons/md";
import {
  RiSettings3Line,
  RiBankLine,
  RiLogoutBoxLine,
  RiListUnordered,
} from "react-icons/ri";
//import { Link } from "react-router-dom";
import { Link, usePage } from "@inertiajs/inertia-react";
import { IoTrashOutline } from "react-icons/io5";
import { cartList } from "../components/Data";
import Layout from "../Layouts/Layout";

const RegularOrders = ({seo}) => {

    const {user} = usePage().props;

  const affiliationLink = useRef();

  const copyText = () => {
    navigator.clipboard.writeText(affiliationLink.current.value);
  };

  return (
      <Layout seo={seo}>
          <div className="overflow-hidden bg-zinc-100">
              <div className="wrapper h-full flex items-center justify-between flex-col lg:flex-row">
                  <div className="md:bg-white md:pt-60 pt-32 w-full md:w-auto relative md:pb-32 pb-10 pr-5 h-auto md:self-stretch md:pr-20">
                      <div
                          className="hidden md:block absolute right-full top-0 h-full bg-white "
                          style={{ width: "500px" }}
                      ></div>
                      <div>Partner Cabinet</div>
                      <div className="bold text-2xl mb-5 mt-1">Name Surname</div>

                      <Link
                          href={route('client.orders')}
                          className="flex lg:text-lg items-center  justify-start px-5 py-3 transition-all duration-300 bg-custom-dark text-white "
                      >
                          <MdHistory className="w-6 h-6 mr-6" />
                          <div>Order history</div>
                      </Link>
                      <Link
                          href={route('logout')}
                          className="flex md:text-lg items-center  justify-start px-5 py-3 transition-all duration-300 hover:bg-zinc-100  "
                      >
                          <RiLogoutBoxLine className="w-6 h-6 mr-6" />
                          <div>Sign out</div>
                      </Link>
                  </div>
                  <div className=" lg:pt-52 pb-32  mx-auto">
                      <div className=" mx-auto">
                          <div className="text-3xl bold mb-12  text-center">
                              Order history
                          </div>
                          <div className=" pb-20">
                              <div className="">
                                  <div className="flex justify-between mb-5 text-sm    ">
                                      <div className="opacity-50 ">Product</div>
                                      <div className="opacity-50 mx-8  pl-40">Date</div>
                                      <div className="opacity-50 ">Price</div>
                                  </div>
                                  {cartList.map((item, index) => {
                                      return (
                                          <div
                                              key={index}
                                              className={`flex justify-between items-center border-b border-zinc-200 pb-5 mb-5 md:w-auto sm:w-96 w-80 md:overflow-x-hidden  overflow-x-scroll scrollbar ${
                                                  cartList.length === index + 1 ? "border-none mb-10" : ""
                                              }`}
                                          >
                                              <div className="shrink-0 w-80 flex items-center">
                                                  <div className="w-24 h-24 mr-5 shrink-0">
                                                      <img
                                                          src={item.img}
                                                          className="w-full h-full object-cover"
                                                          alt=""
                                                      />
                                                  </div>
                                                  <div>
                                                      <div className="bold mb-1">{item.name} </div>
                                                      <div className="text-sm opacity-50 mb-1">
                                                          Color: {item.color}
                                                          <br />
                                                          Size: {item.size}
                                                      </div>
                                                  </div>
                                              </div>
                                              <div className="opacity-50 mr-8">{item.date}</div>
                                              <div className=" bold whitespace-nowrap  ">
                                                  ₾ {item.price}
                                              </div>
                                          </div>
                                      );
                                  })}
                              </div>

                              <div className="flex items-center justify-center text-lg mt-10">
                                  <button className="bold mx-2 underline">1</button>
                                  <button className="bold mx-2 ">2</button>
                                  <button className="bold mx-2 ">3</button>
                              </div>
                          </div>{" "}
                      </div>
                  </div>
              </div>
          </div>
      </Layout>

  );
};

export default RegularOrders;
