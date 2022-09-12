import React from "react";
//import { Link } from "react-router-dom";
import { Link, usePage } from "@inertiajs/inertia-react";
import MainButton from "../components/MainButton";
//import img1 from "../assets/images/other/1.png";
import Gallery from "../components/Gallery2";
import TeamSlider from "../components/TeamSlider";
import Layout from "../Layouts/Layout";

const About = ({ seo, images }) => {

    const renderHTML = (rawHTML) =>
        React.createElement("div", {
            dangerouslySetInnerHTML: { __html: rawHTML },
        });
    const sharedData = usePage().props.localizations;

    const {gallery} = usePage().props;
    console.log(gallery)

    return (
        <Layout seo={seo}>
            <div className="wrapper py-40">
                <section className="flex items-center justify-between mb-20 flex-col lg:flex-row">
                    <div>
                        <div className="bold text-4xl mb-5">
                            {/* About us */}
                            {__("client.about_aboutus", sharedData)}
                        </div>
                        <p className="mb-5 text-justify">
                            {" "}
                            {/* Choose from a wide range of premium quality wooden furniture online.
                            Comfort is our priority to satisfy our customers, and we provide all
                            the furniture that you can easily and quickly get in love with
                            Choose from a wide range of premium quality wooden furniture online.{" "} */}
                            {renderHTML(
                                __("client.about_text1", sharedData).replace(
                                    /(?:\r\n|\r|\n)/g,
                                    "<br>"
                                )
                            )}
                        </p>
                        <p className="mb-5 text-justify">
                            {/* Comfort is our priority to satisfy our customers, and we provide all
                            the furniture that you can easily and quickly get in love with */}
                            {renderHTML(
                                __("client.home_getdiscounts_text2", sharedData).replace(
                                    /(?:\r\n|\r|\n)/g,
                                    "<br>"
                                )
                            )}
                        </p>
                        <div className="flex">
                            <Link href={route('client.contact.index')}>
                                <MainButton reverse>
                                    {/* Contact */}
                                    {__("client.button_contact", sharedData)}
                                </MainButton>
                            </Link>
                            <Link href={route('partner.join')} className="ml-4">
                                <MainButton>
                                    {/* Join our team */}
                                    {__("client.button_joinourteam", sharedData)}
                                </MainButton>
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
                        <div className="text-3xl bold mb-2">
                            {/* Gallery */}
                            {__("client.about_gallery", sharedData)}
                        </div>
                        <p className="opacity-50">
                            {/* New and trending products for best price */}
                            {__("client.about_gallery_text", sharedData)}
                        </p>
                    </div>
                    <Gallery gallery={gallery.files} />
                </section>
                <section>
                    <div className="text-center mb-10">
                        <div className="text-3xl bold mb-2">
                            {/* Team */}
                            {__("client.about_team", sharedData)}
                        </div>
                        <p className="opacity-50">
                            {/* New and trending products for best price */}
                            {__("client.about_team_text", sharedData)}
                            </p>
                    </div>
                    <TeamSlider />
                </section>
            </div>
        </Layout>

    );
};

export default About;
