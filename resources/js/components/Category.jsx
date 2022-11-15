import React from "react";
//import { Link } from "react-router-dom";
import { Link, usePage } from "@inertiajs/inertia-react";
import { category, socialMedia, subCategoryList } from "./NavData";
import { BsArrowLeft } from "react-icons/bs";
import { useState } from "react";

const Category = ({ open }) => {
    const [subCategory, setSubCategory] = useState(false);
    const { categories, localizations } = usePage().props;
    //console.log(categories)

    const navigations = [
        {
            text: __("client.navbar_home", localizations),
            link: route('client.home.index'),
        },
        {
            text: __("client.navbar_aboutus", localizations),
            link: route('client.about.index'),
        },
        {
            text: __("client.navbar_contact", localizations),
            link: route('client.contact.index'),
        },
        {
            text: __("client.navbar_blog", localizations),
            link: route('client.blog.index'),
        },
    ];

    return (
        <div
            className={`fixed top-0 left-0 h-screen 2xl:w-1/4 sm:w-96 w-80  bg-white z-40 pt-32 pb-5 flex flex-col items-center justify-between transition-all duration-500 md:overflow-hidden overflow-y-scroll overflow-x-hidden shadow-lg   ${
                open ? "translate-x-0" : "-translate-x-full"
            }`}
        >
            <div className="w-4/5 flex flex-col items-start justify-between h-full">
                <ul className=" md:hidden inline-block">
                    {navigations.map((nav, index) => {
                        return (
                            <li
                                key={index}
                                className="inline-block md:px-5 px-1 md:text-base text-xs"
                            >
                                <Link href={nav.link}>{nav.text}</Link>
                            </li>
                        );
                    })}
                </ul>
                <ul className={`md:pt-40 pt-10 transition-all duration-500 `}>
                    {categories.map((item, index) => {
                        return (
                            <Link
                                href={route("client.category.show", item.slug)}
                                key={index}
                            >
                                <button
                                    onClick={() => setSubCategory(true)}
                                    className="lg:py-3 py-2 lg:text-base text-sm px-5 -ml-5 block w-fit rounded-full hover:bg-zinc-100 transition-all"
                                >
                                    {item.title}
                                </button>
                            </Link>
                        );
                    })}
                </ul>
                <div className="flex items-center justify-start 2xl:mt-40 mt-20 pb-5">
                    <div className="opacity-50 mr-3 text-lg">{__("client.follow_us", localizations)}</div>
                    {socialMedia.map((item, index) => {
                        return (
                            <a href={item.link} key={index} className="mx-2">
                                <img src={item.icon} alt="" />
                            </a>
                        );
                    })}
                </div>
            </div>
            {/* <div
        className={`absolute left-0 top-0 w-full h-full shadow-xl transition-all duration-500  bg-white ${
          subCategory ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="w-4/5 mx-auto flex flex-col items-start justify-center h-full">
          <button
            className="mb-10 text-sm"
            onClick={() => setSubCategory(false)}
          >
            <BsArrowLeft className="inline-block mr-2 " />
            Back to categories
          </button>
          <ul>
            {subCategoryList.map((item, index) => {
              return (
                <li key={index}>
                  <Link
                    to={item.link}
                    className="lg:py-3 py-2 lg:text-base text-sm px-5 -ml-5 block w-fit rounded-full hover:bg-zinc-100 transition-all"
                  >
                    {item.text}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div> */}
        </div>
    );
};

export default Category;
