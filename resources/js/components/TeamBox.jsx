import React from "react";

const TeamBox = (props) => {
  return (
    <div className="lg:max-w-sm">
      <div className="w-full h-96 overflow-hidden mb-5">
        <img className="w-full h-full object-cover" src={props.img} alt="" />
      </div>
      <div>{props.name}</div>

      <div className="opacity-50 text-sm mt-1">{props.position}</div>
    </div>
  );
};

export default TeamBox;
