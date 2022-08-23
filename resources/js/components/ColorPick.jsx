import React, { useState } from "react";
import { colors } from "./Data";

const ColorPick = ({colors,category}) => {
  const [chooseColor, setChooseColor] = useState(0);
  //console.log(colors)
  return (
    <>
      {colors.map((color, index) => {
        return (
          <button
            onClick={() => {
                setChooseColor(index)
                //alert(index);
                if(category){
                    let img = document.getElementById('cat_col_img').src = colors[index].file ? '/' + colors[index].file.path + '/' + colors[index].file.title:null;
                }

                //console.log(img)
            }}
            key={index}
            className={`w-6 h-6 flex justify-center items-center inline-block rounded-full mr-3 mb-2 border transition-all ${
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
