import React from "react";
//import { Link } from "react-router-dom";
import { Link, usePage } from "@inertiajs/inertia-react";
import MainButton from "../components/MainButton";
//import img1 from "../assets/images/other/1.png";
import Gallery from "../components/Gallery";
import TeamSlider from "../components/TeamSlider";
import Layout from "../Layouts/Layout";

const About = ({seo, images}) => {
  return (
      <Layout seo={seo}>
          <div className="wrapper py-40">
              <section className="flex items-center justify-between mb-20 flex-col lg:flex-row">
                  <div>
                      <div className="bold text-4xl mb-5">About us</div>
                      <p className="mb-5 text-justify">
                          {" "}
                          Choose from a wide range of premium quality wooden furniture online.
                          Comfort is our priority to satisfy our customers, and we provide all
                          the furniture that you can easily and quickly get in love with
                          Choose from a wide range of premium quality wooden furniture online.{" "}
                      </p>
                      <p className="mb-5 text-justify">
                          Comfort is our priority to satisfy our customers, and we provide all
                          the furniture that you can easily and quickly get in love with
                      </p>
                      <div className="flex">
                          <Link href={route('client.contact.index')}>
                              <MainButton reverse>Contact</MainButton>
                          </Link>
                          <Link href={route('partner.join')} className="ml-4">
                              <MainButton>Join our team</MainButton>
                          </Link>
                      </div>
                  </div>
                  <img
                      src={images[0]}
                      className="lg:w-1/2 lg:ml-10 lg:mt-0 mt-10 ml-0"
                      alt=""
                  />
              </section>
              <section className="wrapper py-10 lg:pb-10 pb-32">
                  <div className="text-center mb-10">
                      <div className="text-3xl bold mb-2">Gallery</div>
                      <p className="opacity-50">New and trending products for best price</p>
                  </div>
                  <Gallery gallery={[]} />
              </section>
              <section>
                  <div className="text-center mb-10">
                      <div className="text-3xl bold mb-2">Team</div>
                      <p className="opacity-50">New and trending products for best price</p>
                  </div>
                  <TeamSlider />
              </section>
          </div>
      </Layout>

  );
};

export default About;
