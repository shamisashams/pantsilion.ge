import React, { useState, useRef } from "react";
//import { Link } from "react-router-dom";
import { Link, usePage } from "@inertiajs/inertia-react";
import { cartList } from "../components/Data";
import MainButton from "../components/MainButton";
import { BsArrowLeft } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import { Inertia } from "@inertiajs/inertia";

//import flag from "../assets/images/svg/flag.svg";
//import pin from "../assets/images/svg/pin.svg";
//import phone from "../assets/images/svg/phone.svg";
//import i from "../assets/images/svg/i.svg";

import Layout from "../Layouts/Layout";

const Shipping = ({ seo }) => {
    const [chooseCity, setChooseCity] = useState(false);

    const { cart, cities, promocode, errors, shipping, localizations, total_cart_quantity } =
        usePage().props;

    const [selectedCity, setSelectedCity] = useState(
        shipping ? shipping.city_id : 0
    );



    let selected = null;
    let ship_price;
    if (shipping) {
        cities.map((item, index) => {
            if (item.id === shipping.city_id) {
                selected = item.title;
                ship_price = item.ship_price;
            }
        });
    }

    const [shipPrice, setShipPrice] = useState(
        shipping ? ship_price : 0
    );

    const [selectedCityL, setSelectedCityL] = useState(
        selected ? selected : __("client.choose_city", localizations)
    );

    function selectCity(city) {
        setSelectedCity(city.id);
        setSelectedCityL(city.title);
        values.city_id = city.id;
        values.ship_price = city.ship_price;
        setShipPrice(city.ship_sep === 1 ? city.ship_price * total_cart_quantity : city.ship_price);
    }

    const [values, setValues] = useState({
        city_id: selectedCity,
        address: shipping ? shipping.address : null,
        phone: shipping ? shipping.phone : null,
        comment: shipping ? shipping.comment : null,
        ship_price: shipping ? shipping.ship_price : 0,
    });

    function handleChange(e) {
        setValues((values) => ({
            ...values,
            [e.target.name]: e.target.value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        Inertia.post(route("shipping-submit"), values);
    }

    return (
        <Layout seo={seo}>
            <div className="bg-zinc-100 overflow-hidden ">
                <div className="wrapper h-full flex items-start justify-between flex-col xl:flex-row xl:pb-0 pb-20">
                    <div className="xl:w-3/4 w-full mr-10 pt-44 pb-20">
                        <div className="flex justify-between items-start border-b border-zinc-300 md:text-lg text-sm mb-10">
                            <Link
                                href={route("client.cart.index")}
                                className=" bold pb-5  md:w-1/3"
                            >
                                1. {__("client.cart", localizations)}
                            </Link>
                            <Link
                                href={route("client.shipping.index")}
                                className="border-b-4 bold pb-5 border-custom-red pb-5 text-custom-red md:w-1/3 text-center  "
                            >
                                2.{" "}
                                {__("client.shipping_details", localizations)}
                            </Link>
                            <Link
                                href={route("client.payment.index")}
                                className=" bold pb-5 text-gray-500 md:w-1/3 text-right"
                            >
                                3. {__("client.payment_details", localizations)}
                            </Link>
                        </div>
                        <div className="grid mb-16 py-5  mx-auto lg:grid-cols-2">
                            <div className="text-center max-w-lg lg:mr-10 mx-auto lg:mb-0 mb-10">
                                <div className="md:text-4xl text-2xl bold">
                                    {__(
                                        "client.shipping_header",
                                        localizations
                                    )}
                                </div>
                                <p className="md:my-10 my-5">
                                    {__("client.shipping_text", localizations)}
                                </p>
                                {/*<form>*/}
                                <div
                                    onClick={() => setChooseCity(!chooseCity)}
                                    className="w-full h-16 mb-3 text-center bg-white relative"
                                >
                                    <input
                                        type="hidden"
                                        name="city_id"
                                        value={selectedCity}
                                    />
                                    <div className="w-full h-full flex items-center justify-center relative">
                                        {selectedCityL}
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
                                        {cities.map((item, index) => {
                                            return (
                                                <button
                                                    onClick={() => {
                                                        selectCity(item);
                                                    }}
                                                    className="w-full p-3 transition-all hover:bg-zinc-100 block"
                                                >
                                                    {item.title}
                                                </button>
                                            );
                                        })}
                                        {/*<button className="w-full p-3 transition-all hover:bg-zinc-100 block">
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
                                      </button>*/}
                                    </div>
                                    {errors.city_id && (
                                        <div>{errors.city_id}</div>
                                    )}
                                </div>

                                <div className="relative mb-3">
                                    <img
                                        src="/client/assets/images/svg/pin.svg"
                                        alt=""
                                        className="absolute top-1/2 -translate-y-1/2 left-5 bg-white"
                                    />
                                    <input
                                        type="text"
                                        placeholder={__(
                                            "client.shipping_address",
                                            localizations
                                        )}
                                        className="w-full h-16 text-center bg-white placeholder:text-custom-dark"
                                        name="address"
                                        onChange={handleChange}
                                        value={values.address}
                                    />
                                    {errors.address && (
                                        <div>{errors.address}</div>
                                    )}
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
                                        placeholder={__(
                                            "client.shipping_phone",
                                            localizations
                                        )}
                                        className="w-full h-16 text-center bg-white placeholder:text-custom-dark"
                                        name="phone"
                                        onChange={handleChange}
                                        value={values.phone}
                                    />
                                    {errors.phone && <div>{errors.phone}</div>}
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
                                        placeholder={__(
                                            "client.shipping_comment",
                                            localizations
                                        )}
                                        className="w-full h-16 text-center bg-white placeholder:text-custom-dark"
                                        name="comment"
                                        onChange={handleChange}
                                        value={values.comment}
                                    />
                                </div>
                                {/*</form>*/}
                            </div>
                            {/*<iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d23822.04792854892!2d44.783817693307526!3d41.72578394199125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sge!4v1662101938952!5m2!1sen!2sge"
                                width="100%"
                                height="100%"
                                style={{ border: "0", minHeight: "250px" }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>*/}
                        </div>
                        <Link
                            className="bold"
                            href={route("client.cart.index")}
                        >
                            <BsArrowLeft className="inline-block mr-2 w-5 h-5" />
                            {__("client.back_to_cart", localizations)}
                        </Link>
                    </div>
                    <div
                        className="bg-white h-auto self-stretch relative p-8 xl:pt-60 pb-10 xl:mt-0 mt-10 flex flex-col justify-between
        after:left-full after:top-0 after:bg-white after:w-full after:xl:block after:hidden after:h-full after:min-w-lg "
                    >
                        <div className="mb-10">
                            <div className="text-3xl bold mb-3">
                                {__("client.summary", localizations)}
                            </div>
                            <div className="opacity-50 mb-3 ">
                                ({cart.count}{" "}
                                {__("client.cart_items", localizations)})
                            </div>
                            <div className="h-72 overflow-y-scroll pr-5 my-5 scrollbar">
                                {cart.products.map((item, index) => {
                                    let image = null;

                                    if (item.product.latest_image) {
                                        image =
                                            item.product.latest_image
                                                .file_full_url;
                                    } else {
                                        if (item.product.parent.latest_image) {
                                            image =
                                                item.product.parent.latest_image
                                                    .file_full_url;
                                        }
                                    }
                                    return (
                                        <div
                                            key={index}
                                            className="flex items-start justify-between mb-5"
                                        >
                                            <div className=" flex items-start">
                                                <div className="w-20 h-20 mr-3 shrink-0">
                                                    <img
                                                        src={image}
                                                        className="w-full h-full object-cover"
                                                        alt=""
                                                    />
                                                </div>
                                                <div>
                                                    <div className="bold mb-1">
                                                        {item.product.parent.title}{" "}
                                                    </div>
                                                    <div className="text-sm opacity-50 mb-1">
                                                        {item.product.attributes.map(
                                                            (attr, ind) => {
                                                                return attr
                                                                    .attribute
                                                                    .code ===
                                                                    "color" ? (
                                                                    <div>
                                                                        {
                                                                            attr
                                                                                .attribute
                                                                                .name
                                                                        }{" "}
                                                                        :{" "}
                                                                        <div
                                                                            style={{
                                                                                background:
                                                                                    attr.option,
                                                                                display:
                                                                                    "inline-block",
                                                                            }}
                                                                            className="rounded-full w-5 h-5"
                                                                        ></div>
                                                                    </div>
                                                                ) : (
                                                                    <div>
                                                                        {
                                                                            attr
                                                                                .attribute
                                                                                .name
                                                                        }{" "}
                                                                        :{" "}
                                                                        {
                                                                            attr.option
                                                                        }
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                        {__(
                                                            "client.quantity",
                                                            localizations
                                                        )}
                                                        : {item.quantity}
                                                        {/* <div
                                                            style={{
                                                                background:'#0000FF',
                                                            }}
                                                            className="rounded-full w-5 h-5"
                                                        ></div> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-lg ml-4">
                                                ₾
                                                {item.product.special_price
                                                    ? item.product.special_price
                                                    : item.product.price}
                                            </div>
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
                                                        src={
                                                            item.collection
                                                                .latest_image
                                                                ? item
                                                                      .collection
                                                                      .latest_image
                                                                      .file_full_url
                                                                : null
                                                        }
                                                        className="w-full h-full object-cover"
                                                        alt=""
                                                    />
                                                </div>
                                                <div>
                                                    <div className="bold mb-1">
                                                        {item.collection.title}{" "}
                                                    </div>
                                                    <div className=" mb-1">
                                                        furniture set{" "}
                                                    </div>
                                                    <div className="text-sm opacity-50 mb-1">
                                                        Color:{" "}
                                                        {
                                                            item.collection
                                                                .attributes
                                                                .label
                                                        }
                                                        <br />
                                                        Quantity:{" "}
                                                        {item.quantity}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-lg ml-4">
                                                ₾
                                                {item.collection.special_price
                                                    ? item.collection
                                                          .special_price
                                                    : item.collection.price}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="flex items-center justify-between border-b border-t border-zinc-200  py-3 mb-5">
                                <div>
                                    {__("client.subtotal", localizations)}
                                </div>
                                <div className="bold text-lg">
                                    ₾ {cart.total}
                                </div>
                            </div>
                            <div className="flex items-center justify-between  mb-5">
                                <div>
                                    {__("client.shipping", localizations)}
                                </div>
                                <div className="bold text-lg">
                                    ₾ {shipPrice}
                                </div>
                            </div>
                            <div>
                                { !Array.isArray(promocode.active.products_disc) ? Object.keys(promocode.active.products_disc).map((item,index) => {

                                    return <div>Discount {promocode.active.products_disc[item].reward}% on {promocode.active.products_disc[item].product.title}</div>
                                }) : null}
                                {!Array.isArray(promocode.active.collections_disc) ? Object.keys(promocode.active.collections_disc).map((item,index) => {
                                    return <div>Discount {promocode.active.collections_disc[item].reward}% on {promocode.active.collections_disc[item].collection.title}</div>
                                }):null}
                            </div>
                        </div>
                        <Link className="w-full" href="/payment">
                            <MainButton onclick={handleSubmit}>
                                {__("client.to_payment", localizations)}
                            </MainButton>
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Shipping;
