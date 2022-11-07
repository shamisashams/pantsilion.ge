import React, { useState } from "react";
//import { Link } from "react-router-dom";
import { Link, usePage } from "@inertiajs/inertia-react";
import { IoTrashOutline } from "react-icons/io5";
import { cartList } from "../components/Data";
import MainButton from "../components/MainButton";
import { BsArrowLeft } from "react-icons/bs";
import Quantity from "../components/Quantity";
import Layout from "../Layouts/Layout";
import { Inertia } from "@inertiajs/inertia";

const Cart = ({ seo }) => {
    const { cart, promocode, localizations } = usePage().props;
    console.log(promocode);

    function removeItem(id) {
        Inertia.get(route("remove-from-cart"), { id: id });
    }

    function removeCollection(id) {
        Inertia.get(route("remove-from-cart-collection"), { id: id });
    }

    const [values, setValues] = useState({
        promocode: "",
    });

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        Inertia.post(route("apply-promocode"), values);
    }

    return (
        <Layout seo={seo}>
            <div className="bg-zinc-100 overflow-hidden ">
                <div className="wrapper h-full flex items-start justify-between flex-col xl:flex-row xl:pb-0 pb-20">
                    <div className="xl:w-3/4 w-full mr-10 pt-44 pb-20">
                        <div className="flex justify-between items-start border-b border-zinc-300 md:text-lg text-sm mb-10">
                            <Link
                                href={route("client.cart.index")}
                                className="border-b-4 border-custom-red bold pb-5 text-custom-red md:w-1/3"
                            >
                                1. {__("client.cart", localizations)}
                            </Link>
                            <Link
                                href={route("client.shipping.index")}
                                className=" bold pb-5 text-gray-500 md:w-1/3 text-center"
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
                        {cart.products.map((item, index) => {
                            let image = null;

                            if (item.product.latest_image) {
                                image = item.product.latest_image.file_full_url;
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
                                    className={`flex justify-between items-center border-b border-zinc-200 pb-5 mb-5 md:overflow-x-hidden  overflow-x-scroll scrollbar ${
                                        cart.length === index + 1
                                            ? "border-none mb-10"
                                            : ""
                                    }`}
                                >
                                    <div className="shrink-0 md:w-96 w-80 flex items-center">
                                        <div className="w-32 h-32 mr-5 shrink-0">
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
                                                        return attr.attribute
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
                                                                : {attr.option}
                                                            </div>
                                                        );
                                                    }
                                                )}
                                                {/*Color: {item.product.attributes.color}
                                              <br />
                                              Size: {item.product.attributes.size}*/}
                                            </div>
                                            {/*<Link
                                              href="/"
                                              className=" text-sm text-sky-500 hover:underline"
                                          >
                                              Edit
                                          </Link>*/}
                                        </div>
                                    </div>

                                    <Quantity item={item} cart={true} />
                                    <div className="w-28 text-lg bold whitespace-nowrap mx-4">
                                        ₾{" "}
                                        {item.product.special_price
                                            ? item.product.special_price
                                            : item.product.price}
                                    </div>

                                    <button
                                        onClick={() => {
                                            removeItem(item.product.id);
                                        }}
                                        className="shrink-0 w-12 h-12 flex items-center justify-center rounded-full text-custom-red hover:bg-zinc-200 hover:text-black  transition-all"
                                    >
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
                                        cart.length === index + 1
                                            ? "border-none mb-10"
                                            : ""
                                    }`}
                                >
                                    <div className="shrink-0 md:w-96 w-80 flex items-center">
                                        <div className="w-32 h-32 mr-5 shrink-0">
                                            <img
                                                src={
                                                    item.collection.latest_image
                                                        ? item.collection
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
                                            <div className="text-sm opacity-50 mb-1">
                                                Color:{" "}
                                                {
                                                    item.collection.attributes
                                                        .label
                                                }
                                            </div>
                                            {/*<Link
                                              href="/"
                                              className=" text-sm text-sky-500 hover:underline"
                                          >
                                              {__('client.furniture_set', localizations)}
                                          </Link>*/}
                                        </div>
                                    </div>

                                    <Quantity item={item} collection={true} />
                                    <div className="w-28 text-lg bold whitespace-nowrap mx-4">
                                        ₾{" "}
                                        {item.collection.special_price
                                            ? item.collection.special_price
                                            : item.collection.price}
                                    </div>

                                    <button
                                        onClick={() => {
                                            removeCollection(
                                                item.collection.id
                                            );
                                        }}
                                        className="shrink-0 w-12 h-12 flex items-center justify-center rounded-full text-custom-red hover:bg-zinc-200 hover:text-black  transition-all"
                                    >
                                        <IoTrashOutline className="w-6 h-6 " />
                                    </button>
                                </div>
                            );
                        })}

                        <Link
                            className="bold"
                            href={route("client.home.index")}
                        >
                            <BsArrowLeft className="inline-block mr-2 w-5 h-5" />
                            {__("client.continue_shopping", localizations)}
                        </Link>
                    </div>
                    <div
                        className="bg-white h-auto self-stretch relative p-8 xl:pt-60 pb-10 xl:mt-0 mt-10 flex flex-col justify-between
            after:left-full after:top-0 after:bg-white after:w-full after:xl:block after:hidden after:h-full after:min-w-lg"
                    >
                        <div className="mb-10">
                            <div className="text-3xl bold mb-3">
                                {__("client.summary", localizations)}
                            </div>
                            <div className="opacity-50 mb-3 ">
                                ({cart.count}{" "}
                                {__("client.cart_items", localizations)})
                            </div>
                            <div className="flex items-center justify-between border-b border-t border-zinc-200  py-3 mb-5">
                                <div>
                                    {__("client.subtotal", localizations)}
                                </div>
                                <div>₾ {cart.total}</div>
                            </div>
                            <div className="text-sky-500 bold mb-3">
                                {__("client.use_promocode", localizations)}
                            </div>
                            <input
                                name="promocode"
                                type="text"
                                className="border border-solid border-zinc-200 mb-3 w-full h-10 pl-3"
                                onChange={handleChange}
                            />
                            <button
                                onClick={handleSubmit}
                                className="bg-zinc-100 bold py-2 px-10"
                            >
                                {__("client.apply_code", localizations)}
                            </button>
                            {/*<div>{flash ? flash :null}</div>*/}
                            <div>
                                { !Array.isArray(promocode.active.products_disc) ? Object.keys(promocode.active.products_disc).map((item,index) => {

                                    return <div>Discount {promocode.active.products_disc[item].reward}% on {promocode.active.products_disc[item].product.title}</div>
                                }) : null}
                                {!Array.isArray(promocode.active.collections_disc) ? Object.keys(promocode.active.collections_disc).map((item,index) => {
                                    return <div>Discount {promocode.active.collections_disc[item].reward}% on {promocode.active.collections_disc[item].collection.title}</div>
                                }):null}

                            </div>
                        </div>
                        <Link
                            className="w-full"
                            href={route("client.shipping.index")}
                        >
                            <MainButton>
                                {__("client.to_shipping", localizations)}
                            </MainButton>
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Cart;
