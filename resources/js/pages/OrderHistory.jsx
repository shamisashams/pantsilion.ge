import React from "react";
import { cartList } from "../components/Data";
import CabinetTabs from "../components/CabinetTabs";
import Layout from "../Layouts/Layout";

const OrderHistory = ({seo}) => {
  return (
      <Layout seo={seo}>
          <div className="overflow-hidden bg-zinc-100">
              <div className="wrapper h-full flex items-center justify-between flex-col lg:flex-row">
                  <CabinetTabs />
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
                                              className={`flex justify-between items-center border-b border-zinc-200 pb-5 mb-5 md:w-auto  sm:w-96 w-80 md:overflow-x-hidden  overflow-x-scroll scrollbar ${
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

export default OrderHistory;
