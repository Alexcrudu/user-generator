import React from "react";

function Button(props) {
  let { styled, clicked, text } = props;
  return (
    <button
      type="button"
      onClick={clicked}
      className={"rounded-3xl py-5  mt-8 placeholder:font-semibold " + styled}
    >
      {text}
    </button>
  );
}

export default Button;
