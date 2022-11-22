import React, { useState } from "react";
//import bg from "../assets/images/bg/3.png";
import ColorPick from "../components/ColorPick";
import { cartList } from "../components/Data";
import MainButton from "../components/MainButton";
import PlusBox from "../components/PlusBox";
import SingleSlider from "../components/SingleSlider";
import { FiHeart } from "react-icons/fi";
import ProductSlider from "../components/ProductSlider";
import Layout from "../Layouts/Layout";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "react-scroll";

const FurnitureSet = ({ seo }) => {
    const [favorite, setFavorite] = useState(false);
    const { collection, set_products, localizations } = usePage().props;

    const [colorId, setColorId] = useState(collection.colors[0].id);

    console.log(collection);

    const renderHTML = (rawHTML) =>
        React.createElement("div", {
            dangerouslySetInnerHTML: { __html: rawHTML },
        });

    function changeColor(color) {
        console.log(color);
        setColorId(color.id);
    }

    function addToCart(collection) {
        console.log(collection);
        if (colorId > 0) {
            Inertia.post(route("add-to-cart-collection"), {
                collection: collection.id,
                color: colorId,
            });
        } else {
            alert("select color");
        }
    }

    function buwNow(collection) {
        console.log(collection);
        if (colorId > 0) {
            Inertia.post(route("add-to-cart-collection"), {
                collection: collection.id,
                color: colorId,
                buy_now: true,
            });
        } else {
            alert("select color");
        }
    }

    function addToCartItem(product) {
        if (product.stocks !== null) {
            if (product.stocks.length === 0) {
                alert("out of stock");
                return;
            }
        } else {
            alert("out of stock");
            return;
        }

        Inertia.post(route("add-to-cart"), { id: product.id, qty: 1 });
    }

    function addToWishlist(id) {
        Inertia.post(route("client.favorite.add"), { id: id });
    }

    function addToWishlistCollection(id) {
        Inertia.post(route("client.favorite.add-set"), { id: id });
    }

    return (
        <Layout seo={seo}>
            <>
                <div className="relative w-full h-fit">
                    <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-b from-white to-transparent"></div>
                    <img
                        src={collection.set_image}
                        className="w-full h-auto"
                        alt=""
                    />
                    {collection.products.map((item, index) => {
                        let c = item.pivot.coordinates
                            ? item.pivot.coordinates.split(" ")
                            : new Array(4).fill("auto");

                        let left = c[3].match(/\d+/);
                        let right = c[1].match(/\d+/);

                        left = left ? parseInt(left[0]) : null;
                        right = right ? parseInt(right[0]) : null;
                        console.log("aaaaa", left, right);
                        let direction = false;
                        if (left) {
                            if (left >= 65) direction = true;
                        }

                        if (right) {
                            if (right <= 35) direction = true;
                        }

                        return (
                            <PlusBox
                                top={c[0]}
                                right={c[1]}
                                bottom={c[2]}
                                left={c[3]}
                                title={item.parent.title}
                                para={item.short_description}
                                price={
                                    item.special_price
                                        ? item.special_price
                                        : item.price
                                }
                                oldPrice={
                                    item.special_price ? item.price : null
                                }
                                addToCart={() => {
                                    addToCartItem(item);
                                }}
                                addToWishlist={() => {
                                    addToWishlist(item.id);
                                }}
                                floatLeft={direction}
                            />
                        );
                    })}

                    {/*<PlusBox
                      top="30%"
                      right="400px"
                      bottom="auto"
                      left="auto"
                      title="Modern Black Lamp"
                      para="Choose from a wide range of premium quality wooden furniture "
                      price="299.00"
                  />
                  <PlusBox
                      top="auto"
                      right="30%"
                      bottom="20%"
                      left="auto"
                      title="Modern Black Lamp"
                      para="Choose from a wide range of premium quality wooden furniture "
                      price="299.00"
                  />*/}
                </div>
                <div className="wrapper pb-20">
                    <div className="flex py-10 flex-col xl:flex-row mt-7 mb-20">
                        <div className="max-w-2xl xl:mr-20">
                            <SingleSlider images={collection.files} />
                            {/*{collection.video ? (
                                <div className="w-full sm:h-96 h-60 mt-20">
                                    {renderHTML(collection.video.path)}
                                </div>
                            ) : null}*/}
                            <div className="w-full sm:h-96 h-60 mt-20">
                                {collection.video ? (
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={`https://www.youtube.com/embed/${collection.video.path}`}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                ) : null}
                            </div>
                        </div>
                        <div className="max-w-xl xl:mt-0 mt-20">
                            <div className="opacity-50">
                                {__("client.product_code", localizations)} #{" "}
                                {collection.code}
                            </div>
                            <div className="bold text-4xl my-3">
                                {collection.title}
                            </div>
                            {renderHTML(collection.description)}
                            <div className="my-8">
                                {collection.products.map((item, index) => {
                                    let image = null;

                                    if (item.latest_image) {
                                        image = item.latest_image.file_full_url;
                                    } else {
                                        if (item.parent) {
                                            if (item.parent.latest_image) {
                                                image =
                                                    item.parent.latest_image
                                                        .file_full_url;
                                            }
                                        }
                                    }
                                    return (
                                        <Link
                                            href={route(
                                                "client.product.show",
                                                item.parent.slug
                                            )}
                                        >
                                            {" "}
                                            <div
                                                onClick={() => {
                                                    Inertia.visit(
                                                        route(
                                                            "client.product.show",
                                                            item.parent.slug
                                                        )
                                                    );
                                                }}
                                                key={index}
                                                className={`flex items-center justify-between mb-2 pb-2 ${
                                                    index + 1 ===
                                                    collection.products.length
                                                        ? ""
                                                        : "border-b"
                                                } border-zinc-200`}
                                            >
                                                <div className=" flex items-center">
                                                    <div className="w-20 h-20 mr-3 shrink-0">
                                                        <img
                                                            src={image}
                                                            className="w-full h-full object-cover"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="bold mb-1">
                                                            {item.parent.title}{" "}
                                                        </div>
                                                        {item.attributes.map(
                                                            (attr, ind) => {
                                                                return attr
                                                                    .attribute
                                                                    .code ===
                                                                    "color" ? (
                                                                    <div className="text-sm opacity-50 mb-1">
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
                                                                    <div className="text-sm opacity-50 mb-1">
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
                                                        {/*<div className="text-sm opacity-50 mb-1">
                                                      size: {item.attributes.size}
                                                  </div>*/}
                                                    </div>
                                                </div>
                                                <div className="text-lg ml-4">
                                                    ₾
                                                    {item.special_price
                                                        ? item.special_price
                                                        : item.price}
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                            <div className="flex my-5 justify-start ">
                                <p className="whitespace-nowrap">
                                    {__("client.set_colors", localizations)}:
                                </p>
                                <div className="ml-5 max-w-sm mt-1 flex flex-wrap">
                                    <ColorPick
                                        colors={collection.colors}
                                        onClick={changeColor}
                                    />
                                </div>
                            </div>
                            {!collection.special_price ? (
                                <div className="text-xl">
                                    {__("client.set_price", localizations)}:{" "}
                                    <span className="bold text-3xl pl-2">
                                        {" "}
                                        ₾{collection.price}
                                    </span>
                                </div>
                            ) : null}
                            {collection.special_price ? (
                                <div className="text-xl mt-3">
                                    {__("client.set_old_price", localizations)}:{" "}
                                    <span className="bold text-2xl pl-2 opacity-50 line-through">
                                        {" "}
                                        ₾ {collection.price}
                                    </span>
                                </div>
                            ) : null}
                            {collection.special_price ? (
                                <div className="text-xl mt-3">
                                    {__("client.set_new_price", localizations)}:{" "}
                                    <span className="bold text-3xl pl-2 text-red-400">
                                        {" "}
                                        ₾ {collection.special_price}
                                    </span>
                                </div>
                            ) : null}
                            <div className="w-44 my-5">
                                <div className="flex justify-between mb-2">
                                    <button
                                        onClick={() => {
                                            setFavorite(!favorite);
                                            addToWishlistCollection(
                                                collection.id
                                            );
                                        }}
                                        className="shrink-0 hover:bg-zinc-200 rounded-full flex items-center justify-center w-12 h-12 transition-all duration-500 "
                                    >
                                        <FiHeart
                                            className={
                                                favorite
                                                    ? "text-custom-red"
                                                    : ""
                                            }
                                        />
                                    </button>
                                    <input
                                        type="hidden"
                                        name="color_id"
                                        value={colorId}
                                    />
                                    <button
                                        onClick={() => {
                                            addToCart(collection);
                                        }}
                                        className={`ml- whitespace-nowrap bold  border border-custom-dark  py-2 px-3 rounded transition-all duration-500 bg-transparent text-custom-dark hover:bg-custom-dark hover:text-white`}
                                    >
                                        {__(
                                            "client.add_to_cart",
                                            localizations
                                        )}
                                    </button>
                                </div>
                                <MainButton
                                    onclick={() => {
                                        buwNow(collection);
                                    }}
                                >
                                    {__("client.buy_now", localizations)}
                                </MainButton>
                            </div>
                        </div>
                    </div>
                    <div className="bold text-2xl mb-1">
                        {__("client.products_in_set", localizations)}
                    </div>
                    <p className="opacity-50 mb-7">
                        {__("client.most_popular", localizations)}
                    </p>
                    <ProductSlider products={set_products} />
                </div>
            </>
        </Layout>
    );
};

export default FurnitureSet;
