import React, { useState, useEffect } from "react";
import user from "../image/user-regular.svg";
import Input from "./Input";
import Error from "./Error";
import Button from "./Button";
import axios from "axios";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Form() {
  const [userValue, setUserValue] = useState({
    vorname: "",
    nachname: "",
    eMailAdresse: "",
    strasse: "",
    hsNr: "",
    plz: "",
    ort: "",
    img: "",
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeUser, setActiveUser] = useState(false);
  const [isDisabled, setDisabled] = useState(true);
  const [valueErrors, setValueErrors] = useState({});
  const [isError, setIsError] = useState(false);
  const [percent, setPercent] = useState(0);
  const [running, setRunning] = useState(false);
  const [intervalVal, setIntervalVal] = useState(null);

  useEffect(() => {
    if (running) {
      setIntervalVal(
        setInterval(() => {
          setPercent((prev) => {
            return prev + 2;
          });
        }, 50)
      );
    } else {
      clearInterval(intervalVal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  useEffect(() => {
    if (percent >= 100) {
      setRunning(false);
      clearInterval(intervalVal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percent]);

  const onClickHandler = () => {
    axios.get("https://randomuser.me/api/").then((response) => {
      setActiveUser(true);
      setRunning(true);
      setUserValue({
        vorname: response.data.results[0].name.first,
        nachname: response.data.results[0].name.last,
        eMailAdresse: response.data.results[0].email,
        strasse: response.data.results[0].location.street.name,
        hsNr: response.data.results[0].location.street.number,
        plz: response.data.results[0].location.postcode,
        ort: response.data.results[0].location.city,
        img: response.data.results[0].picture.large,
      });
    });
  };

  const onEditClickHandler = () => {
    setDisabled(false);
    localStorage.setItem("User", JSON.stringify(userValue));
  };

  const onCancelClickHandler = () => {
    setDisabled(true);
    let user = localStorage.getItem("User");
    user = JSON.parse(user);
    localStorage.clear();
    setUserValue(user);
  };

  const onChangeHandler = (evt) => {
    setUserValue((currentState) => {
      return {
        ...currentState,
        [evt.target.name]: evt.target.value,
      };
    });
  };

  const onSaveClickHandler = () => {

    const errors = validate(userValue);

    if (Object.keys(errors).length === 0) {
      setIsError(false);
      setDisabled(true);
      localStorage.clear();
      localStorage.setItem("User", JSON.stringify(userValue));
    } else {
      setValueErrors(errors);
      setIsError(true);
    }
  };

  useEffect(() => {
    if (Object.keys(valueErrors).length === 0) {
    }
  }, [valueErrors]);

  const validate = (values) => {
    const errors = {};
    const regex =
    //eslint-disable-next-line
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!values.vorname) {
      errors.vorname = false;
    }
    if (!values.nachname) {
      errors.nachname = false;
    }
    if (!values.eMailAdresse || !regex.test(values.eMailAdresse)) {
      errors.eMailAdresse = false;
    }
    if (!values.strasse) {
      errors.strasse = false;
    }
    if (!values.hsNr) {
      errors.hsNr = false;
    }
    if (!values.plz || values.plz.length < 5) {
      errors.plz = false;
    }
    if (!values.ort) {
      errors.ort = false;
    }
    return errors;
  };

  const createUserClickHandler = () => {
    setUserValue({
      vorname: "",
      nachname: "",
      eMailAdresse: "",
      strasse: "",
      hsNr: "",
      plz: "",
      ort: "",
      img: "",
    });
    setIsLoaded(false);
    setActiveUser(false);
    setDisabled(true);
    setRunning(false);
    setPercent(0)
  };

  return (
    <>
       <Error displayed={isError}></Error>
      <form className="font-publicSans flex flex-col mt-[50px] w-1/3 m-auto left-2/4 top-2/4 bg-white rounded-3xl shadow-lg shadow-gray-50 mb-32">
        <div
          className={
            "flex justify-center ml-auto mr-auto w-[260px] h-[260px] rounded-full mt-12 bg-[#F1F2F6] "
          }
        >
          <CircularProgressbarWithChildren
            value={percent}
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
                `${percent >= 100 ? "w-full rounded-full " : "mb-[25px]"}` +
                "block mx-auto my-auto  bg-gray-100 "
              }
              alt="user"
              src={percent < 99 ? user : userValue.img}
            ></img>
            {percent < 100 && percent > 0 && (
              <div className={"mb-[20px]"}>
                <strong>{percent} %</strong>
              </div>
            )}
          </CircularProgressbarWithChildren>
        </div>
        <div className="flex justify-between flex-wrap w-[85%] mx-auto mb-12">
          <Input
            isChange={onChangeHandler}
            isDisabled={isDisabled}
            name={"vorname"}
            type={"text"}
            value={userValue.vorname}
            styled={"w-[47.5%]"}
            placeholder={"Vorname"}
            isValid={"vorname" in valueErrors ? true : false}
          ></Input>
          <Input
            isChange={onChangeHandler}
            isDisabled={isDisabled}
            name={"nachname"}
            type={"text"}
            value={userValue.nachname}
            styled={"w-[47.5%]"}
            placeholder={"Nachname"}
            isValid={"nachname" in valueErrors ? true : false}
          ></Input>
          <Input
            isChange={onChangeHandler}
            isDisabled={isDisabled}
            name={"eMailAdresse"}
            type={"email"}
            value={userValue.eMailAdresse}
            styled={"w-[100%]"}
            placeholder={"E-Mail-Adresse"}
            isValid={"eMailAdresse" in valueErrors ? true : false}
          ></Input>
          <Input
            isChange={onChangeHandler}
            isDisabled={isDisabled}
            name={"strasse"}
            type={"text"}
            value={userValue.strasse}
            styled={"w-[70%]"}
            placeholder={"Straße"}
            isValid={"strasse" in valueErrors ? true : false}
          ></Input>
          <Input
            isChange={onChangeHandler}
            isDisabled={isDisabled}
            name={"hsNr."}
            type={"number"}
            value={userValue.hsNr}
            styled={"w-[25%]"}
            placeholder={"Hsnr."}
            isValid={"hsNr" in valueErrors ? true : false}
          ></Input>
          <Input
            isChange={onChangeHandler}
            isDisabled={isDisabled}
            name={"plz"}
            type={""}
            value={userValue.plz}
            styled={"w-[30%]"}
            placeholder={"PLZ"}
            isValid={"plz" in valueErrors ? true : false}
          ></Input>
          <Input
            isChange={onChangeHandler}
            isDisabled={isDisabled}
            name={"ort"}
            type={"text"}
            value={userValue.ort}
            styled={"w-[65%]"}
            placeholder={"Ort"}
            isValid={"ort" in valueErrors ? true : false}
          ></Input>
          {percent < 100 ? (
            <Button
              isLoaded={isLoaded}
              clicked={onClickHandler}
              styled={
                "w-full text-white " +
                `${
                  activeUser
                    ? "bg-gradient-to-l from-[#1DD1A1] to-[#10AC84] "
                    : "bg-gradient-to-l from-[#B9B9B9] to-[#9F9F9F] "
                }`
              }
              text={"User generieren"}
            ></Button>
          ) : (
            <>
              <Button
                clicked={isDisabled ? onEditClickHandler : onCancelClickHandler}
                styled={
                  "w-[47.5%] text-[#10AC84] text-[600] border-2 border-solid border-[#10AC84]"
                }
                text={isDisabled ? "Bearbeiten" : "Abrechen"}
              ></Button>
              <Button
                clicked={
                  !isDisabled ? onSaveClickHandler : createUserClickHandler
                }
                styled={
                  "w-[47.5%] text-white bg-gradient-to-l from-[#1DD1A1] to-[#10AC84] "
                }
                text={isDisabled ? "User anlegen" : "Speichern"}
              ></Button>
            </>
          )}
        </div>
      </form>
    </>
  );
}

export default Form;
