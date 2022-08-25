import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
//import map from "../assets/images/other/map.png";
import { socialMedia } from "../components/NavData";
import MainButton from "../components/MainButton";
//import { Link } from "react-router-dom";
import { Link, usePage } from "@inertiajs/inertia-react";
import Layout from "@/Layouts/Layout";

const Contact = ({ seo }) => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const { pathname, errors } = usePage().props;

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
        Inertia.post(route("client.contact.mail"), values);
    }

    const renderHTML = (rawHTML) =>
        React.createElement("div", {
            dangerouslySetInnerHTML: { __html: rawHTML },
        });
    const sharedData = usePage().props.localizations;

    const [chooseCity, setChooseCity] = useState(false);
    return (
        <Layout seo={seo}>
            <div className="py-44 relative">
                <img className="absolute left-0 bottom-0 -z-10" src="/client/assets/images/other/map.png" alt="" />
                <div className="wrapper">
                    <div className="text-4xl bold mb-10">
                        {/* Contact us */}
                        {__("client.contact_contact_us", sharedData)}
                    </div>
                    <div className="flex justify-between items-start flex-col lg:flex-row">
                        <div>
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-12 xl:gap-20 mb-10">
                                <div>
                                    <div className="flex items-start mb-7">
                                        <img className="mr-3" src="/client/assets/images/svg/pin.svg" alt="" />
                                        <div>
                                            <div className="mb-2 bold">Address</div>
                                            <div>Didube, eristavi # 1</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start mb-7">
                                        <img className="mr-3" src="/client/assets/images/svg/phone.svg" alt="" />
                                        <div>
                                            <div className="mb-2 bold">Phone number</div>
                                            <div>
                                                +995 599 87 38 44 <br />
                                                +995 0322 04 05 50
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-start mb-7">
                                        <img className="mr-3" src="/client/assets/images/svg/clock.svg" alt="" />
                                        <div>
                                            <div className="mb-2 bold">Working hours</div>
                                            <div>10:00 - 19:00</div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-start mb-7">
                                        <img className="mr-3" src="/client/assets/images/svg/pin.svg" alt="" />
                                        <div>
                                            <div className="mb-2 bold">Address</div>
                                            <div>Didube, eristavi # 1</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start mb-7">
                                        <img className="mr-3" src="/client/assets/images/svg/phone.svg" alt="" />
                                        <div>
                                            <div className="mb-2 bold">Phone number</div>
                                            <div>
                                                +995 599 87 38 44 <br />
                                                +995 0322 04 05 50
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-start mb-7">
                                        <img className="mr-3" src="/client/assets/images/svg/clock.svg" alt="" />
                                        <div>
                                            <div className="mb-2 bold">Working hours</div>
                                            <div>10:00 - 19:00</div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-start mb-7">
                                        <img className="mr-3" src="/client/assets/images/svg/pin.svg" alt="" />
                                        <div>
                                            <div className="mb-2 bold">Address</div>
                                            <div>Didube, eristavi # 1</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start mb-7">
                                        <img className="mr-3" src="/client/assets/images/svg/phone.svg" alt="" />
                                        <div>
                                            <div className="mb-2 bold">Phone number</div>
                                            <div>
                                                +995 599 87 38 44 <br />
                                                +995 0322 04 05 50
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-start mb-7">
                                        <img className="mr-3" src="/client/assets/images/svg/clock.svg" alt="" />
                                        <div>
                                            <div className="mb-2 bold">Working hours</div>
                                            <div>10:00 - 19:00</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                onClick={() => setChooseCity(!chooseCity)}
                                className="w-80 h-16 mb-3 text-center bg-custom-dark text-white relative"
                            >
                                <div className="w-full h-full flex items-center justify-center relative">
                                    Choose city
                                    <FiChevronDown className="absolute top-1/2 -translate-y-1/2 right-5" />
                                    <img
                                        src="/client/assets/images/svg/flag-white.svg"
                                        alt=""
                                        className="absolute top-1/2 -translate-y-1/2 left-5 "
                                    />
                                </div>
                                <div
                                    className={`absolute left-0 top-full w-full bg-white text-custom-dark scrollbar transition-all duration-300 z-10  ${chooseCity
                                        ? "max-h-72  overflow-y-scroll"
                                        : " max-h-0  overflow-y-hidden"
                                        }`}
                                >
                                    <button className="w-full p-3 transition-all hover:bg-zinc-100 block">
                                        Tbilisi
                                    </button>
                                    <button className="w-full p-3 transition-all hover:bg-zinc-100 block">
                                        Gori
                                    </button>
                                    <button className="w-full p-3 transition-all hover:bg-zinc-100 block">
                                        Mstkheta
                                    </button>
                                    <button className="w-full p-3 transition-all hover:bg-zinc-100 block">
                                        Batumi
                                    </button>
                                    <button className="w-full p-3 transition-all hover:bg-zinc-100 block">
                                        Zugdidi
                                    </button>
                                    <button className="w-full p-3 transition-all hover:bg-zinc-100 block">
                                        Mstkheta
                                    </button>
                                    <button className="w-full p-3 transition-all hover:bg-zinc-100 block">
                                        Batumi
                                    </button>
                                    <button className="w-full p-3 transition-all hover:bg-zinc-100 block">
                                        Zugdidi
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="lg:text-right text-sm lg:mt-0 mt-10">
                            <form className="mx-auto lg:mr-0  lg:max-w-sm" onSubmit={handleSubmit}>
                                <div className="text-2xl bold mb-3">
                                    {/* Get in touch */}
                                    {__("client.form_getintouch", sharedData)}
                                </div>
                                <p className="mb-10">
                                    {/* Choose from a wide range of premium quality wooden furniture
                            online. Comfort is our{" "} */}

                                    {renderHTML(
                                        __("client.form_text", sharedData).replace(
                                            /(?:\r\n|\r|\n)/g,
                                            "<br>"
                                        )
                                    )}
                                </p>
                                <input
                                    type="text "
                                    placeholder={__("client.form_name", sharedData)}
                                    className="w-full bg-zinc-100 placeholder:text-custom-dark mb-4 h-12 pl-5 "
                                    onChange={handleChange}
                                    name="name"
                                />
                                {errors.name && <div>{errors.name}</div>}
                                <input
                                    type="text "
                                    placeholder={__("client.form_email", sharedData)}
                                    className="w-full bg-zinc-100 placeholder:text-custom-dark mb-4 h-12 pl-5 "
                                    onChange={handleChange}
                                    name="email"
                                />
                                {errors.email && <div>{errors.email}</div>}
                                <input
                                    type="text "
                                    placeholder={__("client.form_phone", sharedData)}
                                    className="w-full bg-zinc-100 placeholder:text-custom-dark mb-4 h-12 pl-5 "
                                    onChange={handleChange}
                                    name="phone"
                                />
                                {errors.phone && <div>{errors.phone}</div>}
                                <textarea
                                    placeholder={__("client.form_message", sharedData)}
                                    className="w-full bg-zinc-100 placeholder:text-custom-dark mb-6 h-20 pl-5 pt-3 "
                                    onChange={handleChange}
                                    name="message"
                                />
                                {errors.message && <div>{errors.message}</div>}
                                <div className="w-52 lg:mx-auto lg:mr-0">
                                    <MainButton type>
                                        {/* Send message */}
                                        {__("client.form_send", sharedData)}
                                    </MainButton>
                                </div>
                            </form>
                            <div className="flex items-center lg:justify-end mt-10 lg:whitespace-nowrap flex-wrap">
                                <div className="opacity-50 lg:text-lg  ">Follow us:</div>

                                {socialMedia.map((item, index) => {
                                    return (
                                        <Link href={item.link} key={index}>
                                            <div className="bold lg:ml-5 ml-3 inline-block lg:text-base">
                                                {item.name}
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>

    );
};

export default Contact;
