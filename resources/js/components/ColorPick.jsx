import React, { useState } from "react";
import { colors } from "./Data";

const ColorPick = ({ colors, onClick }) => {
    const [chooseColor, setChooseColor] = useState(0);
    //console.log(colors)
    const handleClick = (color, index) => {
        setChooseColor(index);
        //alert(index);

        onClick(color);
        //document.getElementById('cat_col_img').src = colors[index].file ? '/' + colors[index].file.path + '/' + colors[index].file.title:null;
    };
    return (
        <>
            {colors.map((color, index) => {
                return (
                    <button
                        type="button"
                        onClick={() => handleClick(color, index)}
                        key={index}
                        className={`w-6 h-6 flex justify-center items-center inline-block rounded-full mr-3 mb-2 border border-solid transition-all ${
                            chooseColor === index
                                ? "border-custom-dark"
                                : "border-transparent"
                        } `}
                    >
                        <div
                            style={{
                                background: color.color,
                            }}
                            className="rounded-full w-5 h-5"
                        ></div>
                    </button>
                );
            })}
        </>
    );
};

export default ColorPick;
