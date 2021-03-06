import React from "react";
function Input(props) {
  let { name, value, type, styled, placeholder, isDisabled, isChange, isValid } =
    props;
  return (
    <input
      onChange={isChange}
      disabled={isDisabled}
      required
      name={name}
      type={type}
      value={value}
      className={
        styled +
        " py-5 pl-6 mt-6 focus:outline-none cursor-pointer " +
        `${
          isDisabled
            ? "bg-gray-100 rounded-3xl py-5 pl-6 mt-6 font-semibold text-base tracking-tight placeholder-[#222222] placeholder-opacity-[50%] placeholder-font-semibold placeholder-text-xl "
            : !isValid
            ? "bg-transparent border-b-2 border-green-400"
            : "bg-transparent border-b-2 border-red-500 text-red-500 "
        }`
      }
      placeholder={placeholder}
    ></input>
  );
}

export default Input;
