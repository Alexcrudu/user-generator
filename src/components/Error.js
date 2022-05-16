import React from "react";

function Error(props) {
    let {displayed} = props;
  return (
    <div className={`${!displayed && 'invisible '}` + " flex bg-red-500 w-full max-w-2xl mx-auto py-[48px] rounded-b-3xl"}>
        <p className={"text-[#FFFFFF] ml-12 border-2 rounded-full border-[#FFFFFF] py-1 px-3 self-center text-lg font-bold"}>!</p>
      <p className={"text-[#FFFFFF] pt-2 pl-3 text-lg font-bold"}>
        Bitte korrigieren Sie die markierten Eingabefelder.
      </p>
    </div>
  );
}

export default Error;
