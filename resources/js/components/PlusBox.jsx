import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";
import { FiHeart } from "react-icons/fi";
import { HiCheck } from "react-icons/hi";

const PlusBox = (props) => {
    const [displayBox, setDisplayBox] = useState(false);
    const [favorite, setFavorite] = useState(false);
    const [addToCart, setAddToCart] = useState(false);

    console.log(
        ` plus box inset : ${
            (props.top, props.right, props.bottom, props.left)
        }`
    );
    return (
        <div
            className="absolute sm:block hidden z-30"
            style={{
                top: props.top,
                right: props.right,
                bottom: props.bottom,
                left: props.left,
            }}
        >
            <div className="relative w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-sm bg-white/[0.3]">
                <button
                    onClick={() => setDisplayBox(!displayBox)}
                    className="w-7 h-7 flex items-center justify-center rounded-full bg-custom-red text-white text-xl"
                >
                    <BiPlus
                        className={` transition-all duration-300 ${
                            displayBox ? "rotate-45 " : ""
                        }`}
                    />
                </button>
                {/* if too close to right => right-full , if not left-full 👇 */}
                <div
                    className={`absolute top-full bg-white px-6 py-6 transition-all duration-500 ${
                        props.floatLeft ? " right-full" : " left-full"
                    } ${
                        displayBox
                            ? "translate-y-0 opacity-100 visible"
                            : "translate-y-20 opacity-0 invisible"
                    } `}
                >
                    <button
                        onClick={() => setDisplayBox(false)}
                        className="absolute top-3 right-2"
                    >
                        <IoCloseOutline />
                    </button>

                    <div className="bold text-lg mb-2">{props.title}</div>
                    <p className="opacity-50 text-sm mb-3">{props.para}</p>
                    <div className="bold whitespace-nowrap mb-3">
                        Price:
                        {props.sale && (
                            <span className="text-sm line-through opacity-50 pr-2">
                                ₾{props.oldPrice}
                            </span>
                        )}{" "}
                        <span className="text-xl">₾{props.price}</span>
                    </div>
                    <div className="flex items-center">
                        <button
                            onClick={() => {
                                setAddToCart(!addToCart);
                                props.addToCart();
                            }}
                            className="bg-zinc-100 bold h-10 pl-6 pr-2 whitespace-nowrap mr-2"
                        >
                            Add to cart{" "}
                            <HiCheck
                                className={` inline-block ${
                                    addToCart ? "opacity-100" : "opacity-0"
                                }`}
                            />
                        </button>
                        <button
                            className=" w-10 h-10 rounded-full flex items-center justify-center hover:bg-zinc-100 transition-all cursor-pointer relative "
                            onClick={() => {
                                setFavorite(!favorite);
                                props.addToWishlist();
                            }}
                        >
                            <FiHeart
                                className={favorite ? "text-custom-red" : ""}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlusBox;
