import React from "react";
const MainButton = ({ children, reverse, disabled, type, onclick }) => {
    return (
        <button
            className={`bold  border border-solid border-custom-dark  py-2 px-8 rounded w-full transition-all duration-500 h-full whitespace-nowrap ${
                disabled ? "opacity-50 !bg-custom-dark !text-white" : ""
            } ${
                reverse
                    ? "bg-transparent text-custom-dark hover:bg-custom-dark hover:text-white"
                    : "hover:bg-transparent hover:text-custom-dark text-white bg-custom-dark"
            }`}
            disabled={disabled}
            type={type ? type : "button"}
            onClick={onclick}
        >
            {children}
        </button>
    );
};

export default MainButton;
