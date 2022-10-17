import React, { useState } from "react";
//import { Link } from "react-router-dom";
import { Link, usePage } from "@inertiajs/inertia-react";
//import { gallery } from "./Data";

const Gallery = ({gallery}) => {

    const renderHTML = (rawHTML) =>
        React.createElement("div", {
            dangerouslySetInnerHTML: { __html: rawHTML },
        });

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 lg:gap-10 gap-3">
      {gallery.map((item, index) => {
        return (
          <Link
            href={route('client.collection.show',item.slug)}
            key={index}
            className={`w-full h-full odd:h-full lg:even:h-2/3 group overflow-hidden ${
              index === 4 ? "lg:-translate-y-1/3" : ""
            }`}
          >
            <div className="w-full h-full relative">
              <div className="w-full h-full relative after:w-full after:h-full after:top-0 after:left-0 after:bg-white after:opacity-0 group-hover:after:opacity-50 after:transition-all after:duration-700">
                <img
                  className="w-full h-full object-cover  scale-110 group-hover:scale-100 transition-all duration-500"
                  src={item.latest_image ? item.latest_image.file_full_url :null}
                  alt=""
                  style={{ maxHeight: "420px" }}
                />
              </div>
              <div className="absolute left-0 w-full -bottom-full group-hover:bottom-0 bg-white p-3 transition-all duration-500 ">
                <div className="flex justify-between mb-2">
                  <div className="bold text-lg">{item.title}</div>
                  <div className="bold text-xl">₾{item.price}</div>
                </div>
                <p className="text-sm lg:w-3/4">{renderHTML(item.shorted_description)}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Gallery;
