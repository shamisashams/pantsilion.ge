import React from "react";
//import { Link } from "react-router-dom";
import { Link, usePage } from "@inertiajs/inertia-react";
import { socialMedia } from "./NavData";
//import Arrows from "../assets/images/svg/arrows.svg";

const BlogBox = (props) => {
    return (
        <Link href={props.link} className="h-full ">
            <div className="bg-white p-5 text-sm h-full flex flex-col justify-between group">
                <div>
                    <div>{props.date}</div>
                    <div className="2xl:text-3xl xl:text-2xl text-xl bold my-5">
                        {props.title}
                    </div>
                    <div
                        className={` relative w-full ${
                            props.largeImg ? "sm:h-80 h-auto" : "h-32"
                        }  overflow-hidden mb-4`}
                    >
                        <img
                            src={props.img}
                            className="w-full h-full object-cover mb-5"
                            alt=""
                        />
                        <div className="absolute w-full h-full left-0 top-0 bg-custom-dark/[0.0] transition-all duration-500 flex items-center justify-center group-hover:bg-custom-dark/[0.5]">
                            <img
                                src="/client/assets/images/svg/arrows.svg"
                                className="scale-50 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 opacity-0 relative"
                                alt=" "
                            />
                        </div>
                    </div>
                    <p>{props.paragraph}</p>
                </div>
                <div className="my-5 ml-0 mr-auto">
                    <div className="opacity-50 ">Share to:</div>
                    {socialMedia.map((item, index) => {
                        return (
                            <a href={item.link} key={index}>
                                <div className="bold mr-3 inline-block">
                                    {item.name}
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
        </Link>
    );
};

export default BlogBox;
