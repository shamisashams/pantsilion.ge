import React from "react";
//import { Link } from "react-router-dom";
import { Link, usePage } from "@inertiajs/inertia-react";
//import Logo from "../assets/images/logo/1.png";
import { AiOutlineMenu, AiOutlineUser } from "react-icons/ai";
import { FiSearch, FiHeart, FiShoppingCart } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { BsGlobe2 } from "react-icons/bs";
import { useState } from "react";
import Category from "./Category";

import { Inertia } from '@inertiajs/inertia'

const Navbar = () => {
    const renderHTML = (rawHTML) =>
        React.createElement("div", {
            dangerouslySetInnerHTML: { __html: rawHTML },
        });
    const sharedData = usePage().props.localizations;

    const navigations = [
        {
            text: __("client.navbar_home", sharedData),
            link: route('client.home.index'),
        },
        {
            text: __("client.navbar_aboutus", sharedData),
            link: route('client.about.index'),
        },
        {
            text: __("client.navbar_contact", sharedData),
            link: route('client.contact.index'),
        },
        {
            text: __("client.navbar_blog", sharedData),
            link: route('client.blog.index'),
        },
    ];
    const { locales, currentLocale, locale_urls, cart_count, wishlist_count } = usePage().props;
    const [searchInput, setSearchInput] = useState(false);
    const [showCategory, setShowCategory] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    });


    const [values, setValues] = useState({
        first_name: "",
        last_name: "",
        email: "",
    })

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        Inertia.get(route('search.index'), values)
    }

    return (
        <>
            <div
                className={`fixed left-0 top-0 w-full pb-3 z-50 transition-all duration-500 ${scrolled ? "bg-white shadow" : ""
                    }`}
            >
                <div className="wrapper">
                    <div className="flex items-center justify-between md:py-3 pt-1">
                        <Link href="/">
                            <img src="/client/assets/images/logo/1.png" alt="" />
                        </Link>
                        <ul className="hidden md:inline-block">
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
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <button
                                onClick={() => setShowCategory(!showCategory)}
                                className={`inline-block md:py-3 md:px-5 md:-ml-5 rounded-full transition-all md:hover:bg-zinc-100 ${showCategory ? "md:bg-zinc-100" : ""
                                    }`}
                            >
                                {showCategory ? (
                                    <IoCloseOutline className="inline-block md:mr-2 w-5 h-5 md:mb-1" />
                                ) : (
                                    <AiOutlineMenu className="inline-block md:mr-2 w-5 h-5 md:mb-1" />
                                )}

                                <span className="hidden md:inline-block ">
                                    {/* Catalog */}
                                    {__("client.navbar_catalog", sharedData)}
                                </span>
                            </button>
                            <Link
                                href={route('client.category.new')}
                                className="hidden md:inline-block py-3 px-5 rounded-full transition-all hover:bg-zinc-100"
                            >
                                {/* New products */}
                                {__("client.navbar_new_products", sharedData)}
                            </Link>
                            <Link
                                href={route('client.category.sale')}
                                className="hidden md:inline-block py-3 px-5 rounded-full transition-all hover:bg-zinc-100"
                            >
                                {/* Sale */}
                                {__("client.navbar_sale", sharedData)}
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <div
                                className={` rounded-full relative md:h-12 h-10 overflow-hidden  transition-all  ${searchInput
                                    ? "w-60 bg-zinc-100"
                                    : " md:w-12 w-10 bg-transparent"
                                    }`}
                            >
                                <form onSubmit={handleSubmit}>
                                    <input
                                        className={`bg-transparent h-full w-full text-sm pl-5  transition-all   ${searchInput ? " opacity-100" : "  opacity-0"
                                            }`}
                                        type="text"
                                        placeholder="Search here"
                                        name="term"
                                        onChange={handleChange}
                                    />
                                </form>

                                <div
                                    className="md:w-12 w-10 h-full rounded-full flex items-center justify-center hover:bg-zinc-100 absolute top-0 right-0 transition-all cursor-pointer"
                                    onClick={() => setSearchInput(!searchInput)}
                                >
                                    {searchInput ? <IoCloseOutline /> : <FiSearch />}
                                </div>
                            </div>
                            <Link
                                href={route('client.favorite.index')}
                                className="md:w-12 md:h-12 w-10 h-10 rounded-full flex items-center justify-center hover:bg-zinc-100 transition-all cursor-pointer relative hover:text-custom-red"
                                onClick={() => ""}
                            >
                                {wishlist_count > 0 ? <button
                                    className="absolute top-0 right-0 text-xs w-5 h-5 rounded-full bg-custom-red text-white bold shadow shadow-custom-red"
                                    style={{ fontSize: "11px" }}
                                >
                                    {wishlist_count}
                                </button> : null}
                                <FiHeart />
                            </Link>
                            <Link
                                href={route('client.cart.index')}
                                className="md:w-12 md:h-12 w-10 h-10 rounded-full flex items-center justify-center hover:bg-zinc-100 transition-all cursor-pointer relative"
                                onClick={() => ""}
                            >
                                {cart_count > 0 ? <button
                                    className="absolute top-0 right-0 text-xs w-5 h-5 rounded-full bg-custom-red text-white bold shadow shadow-custom-red"
                                    style={{ fontSize: "11px" }}
                                >
                                    {cart_count}
                                </button> : null}
                                <FiShoppingCart />
                            </Link>
                            <div
                                className="md:w-12 md:h-12 w-10 h-10 rounded-full flex items-center justify-center hover:bg-zinc-100 transition-all cursor-pointer relative group"
                                onClick={() => ""}
                            >
                                <AiOutlineUser className="w-5 h-5" />
                                <div
                                    className={`mt-px rounded bg-zinc-100 py-5 px-4 pl-6 absolute right-0 top-full text-right group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 translate-y-5 invisible opacity-0 transition-all`}
                                >
                                    <Link href={route('client.login.index')} className="whitespace-nowrap pb-2">
                                        {__('client.nav_sign_in', sharedData)}{" "}
                                    </Link>
                                    <Link href={route('client.registration.index')} className="whitespace-nowrap">
                                        {__('client.nav_signup', sharedData)}{" "}
                                    </Link>

                                    <Link href={route('partner.login.index')} className="whitespace-nowrap">
                                        {__('client.nav_partner_sign_in', sharedData)}{" "}
                                    </Link>
                                </div>
                            </div>
                            <div
                                className="md:w-12 md:h-12 w-10 h-10 rounded-full flex items-center justify-center hover:bg-zinc-100 transition-all cursor-pointer relative group"
                                onClick={() => ""}
                            >
                                <BsGlobe2 className="relative z-10" />
                                <div
                                    className={` bg-zinc-100 w-full rounded-full text-center py-5 pt-10 absolute right-0 top-0 group-hover:opacity-100 group-hover:visible group-hover:max-h-40 max-h-0 overflow-hidden invisible opacity-0 transition-all duration-500`}
                                >

                                    {Object.keys(locales).map((name, index) => {
                                        if (locales[name] === currentLocale) {
                                            return (
                                                <a
                                                    key={name + "locale"}
                                                    href="javascript:void(0)"
                                                    className="w-fit mx-auto text-sm block mb-1 relative after:w-1 after:h-1 after:bg-custom-dark after:rounded-full after:-left-2 after:top-1/2 after:-translate-y-1/2"
                                                >
                                                    {name}
                                                </a>
                                            );
                                        }
                                    })}


                                    {Object.keys(locales).map((name, index) => {
                                        if (locales[name] !== currentLocale) {
                                            return (
                                                <a
                                                    href={locale_urls[name]}
                                                    className="w-fit mx-auto text-sm block opacity-50 relative "
                                                >
                                                    {name}
                                                </a>
                                            );
                                        }
                                    })}


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Category open={showCategory} />
        </>
    );
};

export default Navbar;
