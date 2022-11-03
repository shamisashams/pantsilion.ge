import React, { useRef, useEffect } from "react";
import { productSlider } from "../components/Data";
import ProductBox from "../components/ProductBox";
import { TbAdjustments } from "react-icons/tb";
import { useState } from "react";
//import { Link } from "react-router-dom";
import { Link, usePage } from "@inertiajs/inertia-react";
import MainButton from "../components/MainButton";
import { IoCloseOutline } from "react-icons/io5";
import MultiRangeSlider from "../components/RangeSlider/RangeSlider";
import Layout from "../Layouts/Layout";
import { Inertia } from "@inertiajs/inertia";
import RangeSlider from "../components/PriceRange/PriceRange";
import {
    HiOutlineArrowNarrowRight,
    HiOutlineArrowNarrowLeft,
} from "react-icons/hi";

const Products = ({ seo }) => {
    let appliedFilters = {};
    let urlParams = new URLSearchParams(window.location.search);

    const renderHTML = (rawHTML) =>
        React.createElement("div", {
            dangerouslySetInnerHTML: { __html: rawHTML },
        });

    urlParams.forEach((value, index) => {
        appliedFilters[index] = value.split(",");
    });

    const [showFilters, setShowFilters] = useState(true);
    const [selectedItems, setSelectedItems] = useState(
        appliedFilters.hasOwnProperty("subcategory")
            ? appliedFilters["subcategory"]
            : []
    );

    function removeA(arr) {
        var what,
            a = arguments,
            L = a.length,
            ax;
        while (L > 1 && arr.length) {
            what = a[--L];
            while ((ax = arr.indexOf(what)) !== -1) {
                arr.splice(ax, 1);
            }
        }
        return arr;
    }

    const addToSelected = (item) => {
        if (!selectedItems.includes(item.id.toString())) {
            setSelectedItems([...selectedItems, item.id]);

            if (appliedFilters.hasOwnProperty("subcategory")) {
                appliedFilters["subcategory"].push(item.id);
            } else appliedFilters["subcategory"] = [item.id];

            console.log(appliedFilters);

            let params = [];
            for (let key in appliedFilters) {
                params.push(key + "=" + appliedFilters[key].join(","));
            }

            Inertia.visit("?" + params.join("&"));
        }
    };

    const removeSelected = (item) => {
        setSelectedItems(selectedItems.filter((el) => el !== item));

        if (appliedFilters["subcategory"].length > 1)
            removeA(appliedFilters["subcategory"], item.toString());
        else delete appliedFilters["subcategory"];

        console.log(appliedFilters);
        let params = [];

        for (let key in appliedFilters) {
            params.push(key + "=" + appliedFilters[key].join(","));
        }

        Inertia.visit("?" + params.join("&"));
    };

    const clearFilter = function () {
        appliedFilters = {};
        let params = [];

        for (let key in appliedFilters) {
            params.push(key + "=" + appliedFilters[key].join(","));
        }

        Inertia.visit("?" + params.join("&"));
    };

    const { subcategories, products, localizations, collections } =
        usePage().props;

    console.log(products,collections);

    let subcats = {};
    subcategories.map((item, index) => {
        subcats[item.id] = item.title;
    });

    // handle click outside of the box

    const wrapperRef = useRef(null);

    useOutsideAlerter(wrapperRef);
    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setShowFilters(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }


    let links = function (links) {
        let rows = [];
        //links.shift();
        //links.splice(-1);
        {
            links.map(function (item, index) {
                if (index > 0 && index < links.length - 1) {
                    rows.push(
                        <Link
                            href={item.url}
                            className={
                                item.active
                                    ? "mx-2 bold"
                                    : "opacity-50 mx-2 bold"
                            }
                        >
                            {item.label}
                        </Link>
                    );
                }
            });
        }
        return <div className="nums"> {rows.length > 1 ? rows : null} </div>;
    };

    let linksPrev = function (links) {
        let rowCount = 0;
        links.map(function (item, index) {
            if (index > 0 && index < links.length - 1) {
                rowCount++;
            }
        });
        return rowCount > 1 ? (
            <Link href={links[0].url}>
                <HiOutlineArrowNarrowLeft className="w-6 h-6" />
            </Link>
        ) : null;
    };
    let linksNext = function (links) {
        let rowCount = 0;
        links.map(function (item, index) {
            if (index > 0 && index < links.length - 1) {
                rowCount++;
            }
        });
        return rowCount > 1 ? (
            <Link href={links[links.length - 1].url}>
                <HiOutlineArrowNarrowRight className="w-6 h-6" />
            </Link>
        ) : null;
    };

    return (
        <Layout seo={seo}>
            <>
                <div className="relative wrapper py-40  ">
                    <button
                        onClick={() => setShowFilters(true)}
                        className="bold text-lg "
                    >
                        <TbAdjustments className="w-6 h-6 inline-block mb-1" />
                        {__("client.filter", localizations)}
                    </button>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-y-20 gap-x-10 pt-10">
                        {products.data.map((item, index) => {
                            if (item.variant_count === 1) {
                                return (
                                    <ProductBox
                                        key={index}
                                        link={route(
                                            "client.product.show",
                                            item.slug
                                        )}
                                        new={item.new}
                                        sale={item.sale}
                                        img={
                                            item.latest_image
                                                ? item.latest_image
                                                      .file_full_url
                                                : null
                                        }
                                        name={item.title}
                                        price={
                                            item.last_variant.special_price
                                                ? item.last_variant
                                                      .special_price
                                                : item.last_variant.price
                                        }
                                        oldPrice={
                                            item.last_variant.special_price
                                                ? item.last_variant.price
                                                : null
                                        }
                                        paragraph={item.short_description}
                                        id={item.id}
                                        single
                                    />
                                );
                            } else {
                                return (
                                    <ProductBox
                                        key={index}
                                        link={route(
                                            "client.product.show",
                                            item.slug
                                        )}
                                        new={item.new}
                                        sale={item.sale}
                                        img={
                                            item.latest_image
                                                ? item.latest_image
                                                      .file_full_url
                                                : null
                                        }
                                        name={item.title}
                                        price={item.min_price}
                                        oldPrice={item.special_price}
                                        paragraph={item.short_description}
                                        id={item.id}
                                    />
                                );
                            }
                        })}

                        {collections.data.map((item, index) => {
                            return (
                                <ProductBox
                                    key={index}
                                    link={route(
                                        "client.collection.show",
                                        item.slug
                                    )}
                                    new={item.new}
                                    sale={item.sale}
                                    img={
                                        item.latest_image
                                            ? item.latest_image.file_full_url
                                            : null
                                    }
                                    name={item.title}
                                    price={
                                        item.special_price
                                            ? item.special_price
                                            : item.price
                                    }
                                    oldPrice={
                                        item.special_price ? item.price : null
                                    }
                                    paragraph={renderHTML(
                                        item.shorted_description
                                    )}
                                    id={item.id}
                                    collection={item}
                                    set
                                />
                            );
                        })}
                    </div>
                    <div className="flex justify-center items-center mt-10">
                        {linksPrev(products.data.length > collections.data.length ? products.links : collections.links)}
                        {/*<button className="mx-3">
                            {" "}
                            <HiOutlineArrowNarrowLeft className="w-6 h-6" />
                        </button>*/}
                        {links(products.data.length > collections.data.length ? products.links : collections.links)}
                        {/*<button className=" mx-2 bold">1</button>

                        <button className="opacity-50 mx-2 bold">2</button>
                        <button className="opacity-50 mx-2 bold">3</button>
                        <button className="opacity-50 mx-2 bold">4</button>*/}
                       {/* <button className="mx-3">
                            <HiOutlineArrowNarrowRight className="w-6 h-6" />
                        </button>*/}
                        {linksNext(products.data.length > collections.data.length ? products.links : collections.links)}
                    </div>
                </div>
                <div
                    ref={wrapperRef}
                    className={`fixed top-0 left-0 h-screen 2xl:w-1/4 sm:w-96 w-80  bg-white z-40 md:pt-36 pt-32  pb-5 flex flex-col items-center justify-between transition-all duration-500 md:overflow-hidden overflow-y-scroll shadow-lg  ${
                        showFilters ? "translate-x-0" : "-translate-x-full"
                    }`}
                >
                    {" "}
                    <button
                        onClick={() => setShowFilters(false)}
                        className="absolute top-30 right-5"
                    >
                        <IoCloseOutline className="w-6 h-6" />
                    </button>
                    <div className="w-4/5 flex flex-col items-start justify-between h-full ">
                        <div className="block -mb-10">
                            {selectedItems.map((item, index) => {
                                return (
                                    <div
                                        className="inline-block text-sm opacity-50 w-fit py-1 pl-3 pr-2 bg-zinc-200 rounded-full mr-1 mb-1"
                                        key={index}
                                    >
                                        {subcats[item]}
                                        <button
                                            onClick={() => removeSelected(item)}
                                            className=" inline-block "
                                        >
                                            <IoCloseOutline className="w-4 h-4 inline-block mb-px ml-1" />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="mt-10">
                            {/*<MultiRangeSlider
                                onChange={({ min, max }) => {}}
                                appliedFilters={appliedFilters}
                            />*/}

                            <div style={{ width: "200px" }}>
                                <RangeSlider appliedFilters={appliedFilters} />
                            </div>
                        </div>

                        <ul
                            className={`h-2/3 pt-0 transition-all duration-500 w-full scrollbar overflow-y-scroll `}
                        >
                            {subcategories.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <button
                                            onClick={() => addToSelected(item)}
                                            className={`lg:py-3 py-2 lg:text-base text-sm px-5  block w-fit rounded-full hover:bg-zinc-100 transition-all ${
                                                selectedItems.includes(
                                                    item.id.toString()
                                                )
                                                    ? "!bg-custom-dark text-white"
                                                    : ""
                                            } `}
                                        >
                                            {item.title}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                        <div className="flex items-center justify-start  mt-10 pb-5 whitespace-nowrap">
                            <MainButton onclick={clearFilter} reverse>
                                {__("client.clear_filter", localizations)}
                            </MainButton>
                            {/*<button
                                onClick={clearFilter}
                                className="underline ml-5"
                            >
                                Clear filter
                            </button>*/}
                        </div>
                    </div>
                </div>
            </>
        </Layout>
    );
};

export default Products;
