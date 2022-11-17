import React from "react";
import { BsArrowLeft } from "react-icons/bs";
//import { Link } from "react-router-dom";
import { Link, usePage } from "@inertiajs/inertia-react";
//import img1 from "../assets/images/blog/1.png";
import BlogSlider from "../components/BlogSlider";
import ProductBox from "../components/ProductBox";
//import productImg1 from "../assets/images/products/1.png";
//import productImg2 from "../assets/images/products/2.png";
//import productImg3 from "../assets/images/products/3.png";
import Layout from "@/Layouts/Layout";

const SingleBlog = ({ seo }) => {
    const { blog, related_blogs, localizations } = usePage().props;
    console.log(blog);

    const renderHTML = (rawHTML) =>
        React.createElement("p", {
            dangerouslySetInnerHTML: { __html: rawHTML },
        });

    return (
        <Layout seo={seo}>
            <div className="wrapper py-40 blogPage">
                <Link
                    className="bold text-center"
                    href={route("client.blog.index")}
                >
                    <BsArrowLeft className="inline-block mr-2 w-5 h-5" />
                    {__("client.back_to_blog", localizations)}
                </Link>
                <div className="max-w-6xl">
                    <img
                        className="my-5"
                        src={
                            blog.latest_image
                                ? blog.latest_image.file_full_url
                                : null
                        }
                        alt=""
                    />
                    <div className="opacity-50 tetx-sm">
                        {translateDate(blog.created_at)}
                    </div>
                    <div className="text-3xl bold mt-8 mb-5">{blog.title}</div>

                    {renderHTML(blog.text_top)}
                    {/*<p className="mb-5 text-justify max-w-4xl">
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                      nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                      sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
                      rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
                      ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
                      sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                      dolore magna aliquyam erat,
                  </p>
                  <p className="mb-5 text-justify max-w-4xl">
                      sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
                      rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
                      ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
                      sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                      dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
                      et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                      takimata sanctus est Lorem{" "}
                  </p>
                  <p className="mb-5 text-justify max-w-4xl">
                      ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
                      sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                      dolore magna aliquyam erat.
                  </p>
                  <div className="bold text-xl pl-4 py-3 border-l-2 border-custom-red my-5  max-w-4xl">
                      Choose from a wide range of premium quality wooden furniture online.
                      Comfort is our priority to satisfy our customers
                  </div>
                  <p className="mb-5 text-justify max-w-4xl">
                      sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
                      rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
                      ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
                      sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                      dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
                      et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                      takimata sanctus est Lorem{" "}
                  </p>
                  <div className="flex"></div>
                  <div className="bold text-xl my-5  max-w-4xl">
                      Choose from a wide range of premium quality wooden furniture online.
                      Comfort is our priority to satisfy our customers
                  </div>

                  <p className="mb-5 text-justify max-w-4xl">
                      sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
                      rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
                      ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
                      sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                      dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
                      et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                      takimata sanctus est Lorem{" "}
                  </p>*/}
                    {blog.products.length > 0 ? (
                        <div className="my-10">
                            {blog.products.map((item, index) => {
                                if (item.variant_count === 1) {
                                    return (
                                        <div className="max-w-xs mx-3 mb-10 inline-block">
                                            <ProductBox
                                                id={item.id}
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
                                                    item.last_variant
                                                        .special_price
                                                        ? item.last_variant
                                                              .special_price
                                                        : item.last_variant
                                                              .price
                                                }
                                                oldPrice={
                                                    item.last_variant
                                                        .special_price
                                                        ? item.last_variant
                                                              .price
                                                        : null
                                                }
                                                paragraph={
                                                    item.short_description
                                                }
                                                link={route(
                                                    "client.product.show",
                                                    item.slug
                                                )}
                                                single
                                            />
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div className="max-w-xs mx-3 mb-10 inline-block">
                                            <ProductBox
                                                id={item.id}
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
                                                paragraph={
                                                    item.short_description
                                                }
                                                link={route(
                                                    "client.product.show",
                                                    item.slug
                                                )}
                                            />
                                        </div>
                                    );
                                }
                            })}

                            {/*<div className="max-w-xs mx-3 mb-10 inline-block">
                          <ProductBox
                              new
                              img="/client/assets/images/products/2.png"
                              name="New product"
                              price="258"
                              paragraph="Choose from a wide range of premium quality wooden furniture online. "
                              link="/single-product"
                          />
                      </div>
                      <div className="max-w-xs mx-3 mb-10 inline-block">
                          <ProductBox
                              new
                              img="/client/assets/images/products/3.png"
                              name="New product"
                              price="258"
                              paragraph="Choose from a wide range of premium quality wooden furniture online. "
                              link="/single-product"
                          />
                      </div>*/}
                        </div>
                    ) : null}

                    {/*<p className="mb-5 text-justify max-w-4xl">
                      sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
                      rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
                      ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
                      sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                      dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
                      et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                      takimata sanctus est Lorem{" "}
                  </p>*/}
                </div>
                <div className="mt-10">
                    <div className="bold text-lg mb-7">
                        {__("client.related_posts", localizations)}
                    </div>
                    <BlogSlider blogs={related_blogs} />
                </div>
            </div>
        </Layout>
    );
};

export default SingleBlog;
