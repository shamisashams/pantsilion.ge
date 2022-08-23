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

const SingleBlog = ({seo}) => {
    const {blog, related_blogs} = usePage().props;
    console.log(blog);

    const renderHTML = (rawHTML) =>
        React.createElement("p", {
            dangerouslySetInnerHTML: { __html: rawHTML },
        });

  return (
      <Layout seo={seo}>
          <div className="wrapper py-40">
              <Link className="bold text-center" href={route('client.blog.index')}>
                  <BsArrowLeft className="inline-block mr-2 w-5 h-5" />
                  Back to Blog
              </Link>
              <div className="max-w-6xl">
                  <img className="my-5" src={blog.latest_image ? '/' + blog.latest_image.path + '/' + blog.latest_image.title:null} alt="" />
                  <div className="opacity-50 tetx-sm">{blog.created_at}</div>
                  <div className="text-3xl bold mt-8 mb-5">
                      {blog.title}
                  </div>

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
                  {/*<div className="my-10">
                      <div className="max-w-xs mx-3 mb-10 inline-block">
                          <ProductBox
                              new
                              img="/client/assets/images/products/1.png"
                              name="New product"
                              price="258"
                              paragraph="Choose from a wide range of premium quality wooden furniture online. "
                              link="/single-product"
                          />
                      </div>
                      <div className="max-w-xs mx-3 mb-10 inline-block">
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
                      </div>
                  </div>*/}

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
                  <div className="bold text-lg mb-7">Related posts</div>
                  <BlogSlider blogs={related_blogs} />
              </div>
          </div>
      </Layout>

  );
};

export default SingleBlog;
