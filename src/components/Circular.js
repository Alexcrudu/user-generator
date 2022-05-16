import React from "react";
import {
    CircularProgressbarWithChildren,
    buildStyles,
  } from "react-circular-progressbar";
  import user from "../image/user-regular.svg";

  function Circular (props)  {
      let{percentBar, userImg, } = props;
      return (
        <CircularProgressbarWithChildren
        value={percentBar}
        className={"w-[260px]"}
        strokeWidth={2}
        styles={buildStyles({
          strokeLinecap: "round",
          pathTransitionDuration: 0.5,
          strokeWidth: 2,
          pathColor: "#10AC84",
        })}
        >
        <img
          className={
            `${percentBar >= 100 ? "w-full rounded-full " : "mb-[25px]"}` +
            "block mx-auto my-auto  bg-gray-100 "
          }
          alt="user"
          src={percentBar < 99 ? user : userImg}
        ></img>
        {percentBar < 100 && percentBar > 0 && (
          <div className={"mb-[20px] "}>
            <p className={'text-green-400 text-lg font-bold'}>{percentBar } %</p>
          </div>
        )}
        </CircularProgressbarWithChildren>

      )
  }



export default Circular