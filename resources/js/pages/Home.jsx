import React from "react";
//import { Link } from "react-router-dom";
import { Link, usePage } from "@inertiajs/inertia-react";
//import bg1 from "../assets/images/bg/1.png";
//import bg2 from "../assets/images/bg/2.png";
import { BiPlay } from "react-icons/bi";
import Gallery from "../components/Gallery";
import ProductSlider from "../components/ProductSlider";
import MainButton from "../components/MainButton";
import BlogSlider from "../components/BlogSlider";
import PlusBox from "../components/PlusBox";
import Layout from "../Layouts/Layout";

const Home = ({seo}) => {

    const {collections,products,blogs, images} = usePage().props;

    console.log(blogs)

  return (
      <Layout seo={seo}>
          <div className="overflow-hidden">
              <section className="lg:h-screen bg-gray-50 relative">
                  <div className="wrapper lg:h-full lg:pt-0 pt-40 flex items-center justify-between ">
                      <div className="lg:w-3/5 lg:mr-5">
                          <div className="lg:text-6xl text-4xl max-w-3xl bold ">
                              Super quality furniture for your home
                          </div>
                          <p className="lg:my-10 my-6 max-w-3xl text-justify">
                              Choose from a wide range of premium quality wooden furniture
                              online. Comfort is our priority to satisfy our customers, and we
                              provide all the furniture that you can easily and quickly get in
                              love with
                          </p>
                          <div className="text-3xl bold">from ₾299</div>
                          <div className="flex items-center justify-start mt-10">
                              <Link href="/" className="">
                                  <MainButton>Learn more</MainButton>
                              </Link>
                              <Link href="/" className="flex items-center md:ml-10 ml-5">
                                  <div className="flex items-center justify-center bg-custom-red text-white w-8 h-8 rounded-full mr-2">
                                      <BiPlay />
                                  </div>
                                  <div className="bold">Watch video</div>
                              </Link>
                          </div>
                      </div>
                  </div>
                  <div
                      className="lg:absolute relative lg:right-0 lg:bottom-0 lg:w-2/5 mt-10"
                      style={{ height: "calc(100% - 140px)" }}
                  >
                      <img src="/client/assets/images/bg/1.png" className="w-full h-full object-cover" alt="" />
                      <PlusBox
                          top="100px"
                          right="auto"
                          bottom="auto"
                          left="200px"
                          title="Modern Black Lamp"
                          para="Choose from a wide range of premium quality wooden furniture "
                          price="299.00"
                      />
                      <PlusBox top="auto" right="260px" bottom="200px" left="auto" />
                  </div>
              </section>
              <section className="wrapper py-20">
                  <div className="text-center mb-10">
                      <div className="text-3xl bold mb-2">Collections</div>
                      <p className="opacity-50">Most popular products form us</p>
                  </div>
                  <Gallery gallery={collections}/>
              </section>
              <section className="pb-20">
                  <div className="wrapper">
                      <div className="text-center mb-10">
                          <div className="text-3xl bold mb-2">New products</div>
                          <p className="opacity-50">
                              New and trending products for best price
                          </p>
                      </div>
                  </div>
                  <ProductSlider products={products.new} />
              </section>
              <section className="py-20 bg-white">
                  <div className="wrapper">
                      <div className="text-center mb-10">
                          <div className="text-3xl bold mb-2">Special price</div>
                          <p className="opacity-50">
                              New and trending products for best price
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
                          <div className="lg:text-6xl text-4xl max-w-3xl bold ">
                              Get discount for membership
                          </div>
                          <p className="text-justify py-5">
                              Choose from a wide range of premium quality wooden furniture
                              online. Comfort is our priority to satisfy our customers, and we
                              provide all the furniture that you can easily and quickly get in
                              love with
                          </p>
                          <div className="w-52">
                              <Link href="/">
                                  <MainButton reverse>Create account</MainButton>
                              </Link>
                          </div>
                      </div>
                  </div>
              </section>
              <section className="py-20 wrapper">
                  <div className="text-center mb-10">
                      <div className="text-3xl bold mb-2">Blog</div>
                      <p className="opacity-50">New and trending products for best price</p>
                  </div>
                  <BlogSlider blogs={blogs} />
              </section>
          </div>
      </Layout>

  );
};

export default Home;
