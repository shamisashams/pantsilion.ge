import React from "react";
//import { Link, useLocation } from "react-router-dom";
import { Link, usePage } from "@inertiajs/inertia-react";
import { navigations } from "./NavData";
//import map from "../assets/images/other/map.png";
import MainButton from "./MainButton";
import { socialMedia } from "./NavData";

const Footer = () => {
  const { pathname } = usePage().props;

  return (
    <footer className={pathname === route('client.contact.index') ? "hidden" : "py-10"}>
      <div className="wrapper flex justify-between items-start flex-col lg:flex-row">
        <div>
          <div className="flex">
            {navigations.map((item, index) => {
              return (
                <Link href={item.link} key={index} className="lg:mr-10 mr-5 bold">
                  {item.text}
                </Link>
              );
            })}
          </div>
          <a href="#">
            <img src="/client/assets/images/other/map.png" alt="" />
          </a>
        </div>
        <div className="lg:text-right text-sm">
          <form className="mx-auto lg:mr-0  lg:max-w-sm">
            <div className="text-2xl bold mb-3">Get in touch</div>
            <p className="mb-10">
              Choose from a wide range of premium quality wooden furniture
              online. Comfort is our{" "}
            </p>
            <input
              type="text "
              placeholder="Name"
              className="w-full bg-zinc-100 placeholder:text-custom-dark mb-4 h-12 pl-5 "
            />
            <input
              type="text "
              placeholder="Email"
              className="w-full bg-zinc-100 placeholder:text-custom-dark mb-4 h-12 pl-5 "
            />
            <input
              type="text "
              placeholder="Phone"
              className="w-full bg-zinc-100 placeholder:text-custom-dark mb-4 h-12 pl-5 "
            />
            <textarea
              placeholder="Message"
              className="w-full bg-zinc-100 placeholder:text-custom-dark mb-6 h-20 pl-5 pt-3 "
            />
            <div className="w-52 lg:mx-auto lg:mr-0">
              <MainButton>Send message</MainButton>
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
    </footer>
  );
};

export default Footer;
