import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/inertia-react";
import { BiPlay } from "react-icons/bi";
import Gallery from "../components/Gallery";
import ProductSlider from "../components/ProductSlider";
import MainButton from "../components/MainButton";
import BlogSlider from "../components/BlogSlider";
import PlusBox from "../components/PlusBox";
import Layout from "../Layouts/Layout";
import { Inertia } from "@inertiajs/inertia";
import { IoCloseSharp } from "react-icons/io5";

const Home = ({ seo }) => {
    const [videoPopup, setVideoPopup] = useState(false);

    const [video, setVideo] = useState(null);

    const renderHTML = (rawHTML) =>
        React.createElement("div", {
            dangerouslySetInnerHTML: { __html: rawHTML },
        });
    const sharedData = usePage().props.localizations;

    const { collections, products, blogs, images, collection } =
        usePage().props;

    console.log(collection);

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

    return (
        <Layout seo={seo}>
            <div className="overflow-hidden">
                {collection ? (
                    <section className="lg:min-h-screen bg-gray-50 relative ">
                        <div
                            className="lg:absolute relative lg:right-0 lg:bottom-0 lg:w-2/5 sm:mt-32 mt-28"
                            style={{ height: "calc(100% - 140px)" }}
                        >
                            <img
                                src={collection.set_image}
                                className="w-full h-full object-cover"
                                alt=""
                            />
                            {collection.products.map((item, index) => {
                                let c = item.pivot.coordinates
                                    ? item.pivot.coordinates.split(" ")
                                    : new Array(4).fill("auto");
                                console.log(c);

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
                                        title={item.title}
                                        para={item.short_description}
                                        price={
                                            item.special_price
                                                ? item.special_price
                                                : item.price
                                        }
                                        oldPrice={
                                            item.special_price
                                                ? item.price
                                                : null
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
                            top="100px"
                            right="auto"
                            bottom="auto"
                            left="200px"
                            title="Modern Black Lamp"
                            para="Choose from a wide range of premium quality wooden furniture "
                            price="299.00"
                        />
                        <PlusBox top="auto" right="260px" bottom="200px" left="auto" />*/}
                        </div>
                        <div className="wrapper lg:min-h-screen lg:pt-0 pt-5 flex items-center justify-between ">
                            <div className="lg:w-3/5 lg:mr-5 lg:pt-36">
                                <div className="lg:text-6xl md:text-4xl text-2xl max-w-3xl bold ">
                                    {/* Super quality furniture for your home */}
                                    {collection.title}
                                </div>
                                <p className="lg:my-10 my-6 lg:mr-5 max-w-3xl text-justify">
                                    {/* Choose from a wide range of premium quality wooden furniture
                                online. Comfort is our priority to satisfy our customers, and we
                                provide all the furniture that you can easily and quickly get in
                                love with */}
                                    {renderHTML(collection.description)}
                                </p>
                                <div className="md:text-3xl text-xl bold">
                                    {/* from ₾299 */}₾{collection.price}
                                </div>
                                <div className="flex items-center justify-start mt-10">
                                    <Link
                                        href={route(
                                            "client.collection.show",
                                            collection.slug
                                        )}
                                        className=""
                                    >
                                        <MainButton>
                                            {/* Learn more */}
                                            {__(
                                                "client.button_learn_more",
                                                sharedData
                                            )}
                                        </MainButton>
                                    </Link>

                                    {collection.video ? (
                                        <button
                                            onClick={() => {
                                                //alert(collection.video.path);
                                                setVideoPopup(true);
                                                setVideo(collection.video.path);
                                                //document.querySelector('iframe').className  = 'cmx-auto';
                                                //console.log(document.querySelector('iframe'));
                                            }}
                                            className="flex items-center md:ml-10 ml-5"
                                        >
                                            <div className="flex items-center justify-center bg-custom-red text-white w-8 h-8 rounded-full mr-2">
                                                <BiPlay />
                                            </div>
                                            <div className="bold">
                                                {/* Watch videnpo */}
                                                {__(
                                                    "client.button_watch_video",
                                                    sharedData
                                                )}
                                            </div>
                                        </button>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </section>
                ) : null}
                <section className="wrapper py-20">
                    <div className="text-center mb-10">
                        <div className="text-3xl bold mb-2">
                            {/* Collections */}
                            {__("client.home_collections", sharedData)}
                        </div>
                        <p className="opacity-50">
                            {/* Most popular products form us */}
                            {__("client.home_collections_text", sharedData)}
                        </p>
                    </div>
                    <Gallery gallery={collections} />
                </section>
                <section className="pb-20">
                    <div className="wrapper">
                        <div className="text-center mb-10">
                            <div className="text-3xl bold mb-2">
                                {/* New products */}
                                {__("client.home_products", sharedData)}
                            </div>
                            <p className="opacity-50">
                                {__("client.home_products_text", sharedData)}
                                {/* New and trending products for best price */}
                            </p>
                        </div>
                    </div>
                    <ProductSlider products={products.new} />
                </section>
                <section className="py-20 bg-white">
                    <div className="wrapper">
                        <div className="text-center mb-10">
                            <div className="text-3xl bold mb-2">
                                {/* Special price */}
                                {__("client.home_special_price", sharedData)}
                            </div>
                            <p className="opacity-50">
                                {/* New and trending products for best price */}
                                {__(
                                    "client.home_special_price_text",
                                    sharedData
                                )}
                            </p>
                        </div>
                    </div>
                    <ProductSlider products={products.special_price_tag} />
                </section>
                <section
                    className="py-20 bg-cover bg-no-repeat bg-center"
                    style={{ backgroundImage: `url('${images[0]}')` }}
                >
                    <div className="wrapper">
                        <div className="max-w-2xl">
                            <div className="lg:text-4xl text-3xl max-w-3xl bold ">
                                {/* Get discount for membership */}
                                {__("client.home_getdiscounts", sharedData)}
                            </div>
                            <p className="text-justify py-5">
                                {/* Choose from a wide range of premium quality wooden furniture
                                online. Comfort is our priority to satisfy our customers, and we
                                provide all the furniture that you can easily and quickly get in
                                love with */}
                                {renderHTML(
                                    __(
                                        "client.home_getdiscounts_text",
                                        sharedData
                                    ).replace(/(?:\r\n|\r|\n)/g, "<br>")
                                )}
                            </p>
                            <div className="w-52">
                                <Link href={route("client.registration.index")}>
                                    <MainButton reverse>
                                        {/* Create account */}
                                        {__(
                                            "client.button_create_account",
                                            sharedData
                                        )}
                                    </MainButton>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-20 wrapper">
                    <div className="text-center mb-10">
                        <div className="text-3xl bold mb-2">
                            {/* Blog */}
                            {__("client.home_blog", sharedData)}
                        </div>
                        <p className="opacity-50">
                            {/* New and trending products for best price */}
                            {__("client.home_blog_text", sharedData)}
                        </p>
                    </div>
                    <BlogSlider blogs={blogs} />
                </section>

                {/* video popup */}

                <div
                    className={`w-screen h-screen fixed left-0 top-0 bg-black/[0.8] flex items-center justify-center z-50 transition-all duration-500
                ${videoPopup ? "opacity-100 visible" : "invisible opacity-0"}
                `}
                >
                    <div
                        className="container w-4/5 h-4/5 relative"
                        style={{ height: "500px" }}
                    >
                        <button
                            onClick={() => setVideoPopup(false)}
                            className="absolute -top-7 -right-7 text-white"
                        >
                            <IoCloseSharp className="w-7 h-7" />
                        </button>
                        <iframe
                            className="mx-auto"
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${video}`}
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                        ></iframe>
                        {/*{renderHTML(video)}*/}
                        {/*<Iframe url="https://www.youtube.com/embed/LSt-Nj8_rGQ"
                                position="absolute"
                                width="100%"
                                id="myId"
                                className="myClassname"
                                height="100%"
                                styles={{height: "100%"}}/>*/}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Home;
