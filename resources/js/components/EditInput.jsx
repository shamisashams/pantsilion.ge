import React, { useRef } from "react";
import { BiEditAlt } from "react-icons/bi";

const EditInput = ({ label, value, onChange, id }) => {
  const content = useRef();

  const editContent = () => {
    content.current.contentEditable = true;
    content.current.focus();
    content.current.textContent.select();
  };

  return (
    <div className="flex justify-between items-center w-full bg-white h-12 px-4 mb-4 relative text-sm">
      <label className="opacity-50">{label}</label>
      <div id={id} className="text-right outline-none" onKeyUp={onChange} ref={content}>
        {value}
      </div>
      <button
        onClick={editContent}
        className="absolute -right-6 top-1/2 -translate-y-1/2 "
        type="button"
      >
        <BiEditAlt className="w-5 h-5" />
      </button>
    </div>
  );
};

export default EditInput;
