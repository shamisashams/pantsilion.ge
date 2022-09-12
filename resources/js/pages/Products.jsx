import React from "react";
import { productSlider } from "../components/Data";
import ProductBox from "../components/ProductBox";
import { TbAdjustments } from "react-icons/tb";
import { useState } from "react";
import { navigations, subCategoryList } from "../components/NavData";
//import { Link } from "react-router-dom";
import { Link, usePage } from "@inertiajs/inertia-react";
import MainButton from "../components/MainButton";
import { IoCloseOutline } from "react-icons/io5";
import MultiRangeSlider from "../components/RangeSlider/RangeSlider";
import Layout from "../Layouts/Layout";
import { Inertia } from "@inertiajs/inertia";

const Products = ({ seo }) => {
    let appliedFilters = [];
    let urlParams = new URLSearchParams(window.location.search);

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

        let params = [];

        for (let key in appliedFilters) {
            params.push(key + "=" + appliedFilters[key].join(","));
        }

        Inertia.visit("?" + params.join("&"));
    };

    const clearFilter = function () {
        appliedFilters = [];
        let params = [];

        for (let key in appliedFilters) {
            params.push(key + "=" + appliedFilters[key].join(","));
        }

        Inertia.visit("?" + params.join("&"));
    };

    const { subcategories, products } = usePage().props;



    let subcats = {};
    subcategories.map((item,index) => {
        subcats[item.id] = item.title;
    });
    console.log(subcats)

    return (
        <Layout seo={seo}>
            <>
                <div className="relative wrapper py-40  ">
                    <button
                        onClick={() => setShowFilters(true)}
                        className="bold text-lg "
                    >
                        <TbAdjustments className="w-6 h-6 inline-block mb-1" />
                        Filter
                    </button>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-y-20 gap-x-10 pt-10">
                        {products.data.map((item, index) => {
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
                                            ?
                                              item.latest_image.file_full_url
                                            : null
                                    }
                                    name={item.title}
                                    price={item.min_price}
                                    oldPrice={item.oldPrice}
                                    paragraph={item.short_description}
                                    id={item.id}
                                />
                            );
                        })}
                    </div>
                </div>
                <div
                    className={`fixed top-0 left-0 h-screen 2xl:w-1/4 sm:w-96 w-80  bg-white z-40 md:pt-36 pt-32  pb-5 flex flex-col items-center justify-between transition-all duration-500 md:overflow-hidden overflow-y-scroll shadow-lg ${
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
                            <MultiRangeSlider
                                onChange={({ min, max }) => {}}
                                appliedFilters={appliedFilters}
                            />
                        </div>

                        <ul className={` pt-0 transition-all duration-500  `}>
                            {subcategories.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <button
                                            onClick={() => addToSelected(item)}
                                            className={`lg:py-3 py-2 lg:text-base text-sm px-5 -ml-5 block w-fit rounded-full hover:bg-zinc-100 transition-all ${
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
                            <MainButton reverse>Search products</MainButton>
                            <button
                                onClick={clearFilter}
                                className="underline ml-5"
                            >
                                Clear filter
                            </button>
                        </div>
                    </div>
                </div>
            </>
        </Layout>
    );
};

export default Products;
