import React, {useState, useEffect} from "react";
import user from "../image/user-regular.svg";
import Input  from "./Input";
import Error from "./Error"
import Button from "./Button"
import axios from "axios";


function Form()
{
const [userValue, setUserValue] = useState({
    vorname: '',
    nachname: '',
    eMailAdresse: '',
    strasse: '',
    hsNr: '',
    plz: '',
    ort: '',
    img: '',
});
const [isLoaded, setIsLoaded] = useState(false);
const [activeUser, setActiveUser]= useState(false);
const [isDisabled, setDisabled] = useState(true);
const [valueErrors, setValueErrors] = useState({})

const onClickHandler =()=> {

    axios.get('https://randomuser.me/api/')
    .then((response) => {

        setActiveUser(true)
        setUserValue({
            vorname: response.data.results[0].name.first,
            nachname: response.data.results[0].name.last,
            eMailAdresse: response.data.results[0].email,
            strasse: response.data.results[0].location.street.name,
            hsNr: response.data.results[0].location.street.number,
            plz: response.data.results[0].location.postcode,
            ort: response.data.results[0].location.city,
            img: response.data.results[0].picture.large,
        })
    });
    console.log(userValue);
    setTimeout(()=> setIsLoaded(true), 3000) ;

}

const onEditClickHandler = () => {
    setDisabled(false);
    localStorage.setItem('User', JSON.stringify(userValue))
}

const onCancelClickHandler = () => {
    setDisabled(true);
    let user = localStorage.getItem('User')
    user = JSON.parse(user)
    localStorage.clear()
    setUserValue(user)
}

const onChangeHandler = (evt) => {
    setUserValue((currentState) => {
        return{
            ...currentState,
            [evt.target.name]: evt.target.value,
        }
    })
}



const onSaveClickHandler = ()=> {

// debugger

    // setValueErrors(validate(userValue));
    const errors = validate(userValue);

    console.log(valueErrors);
    if(Object.keys(errors).length === 0 ) {
        console.log(userValue);
        setDisabled(true);
        localStorage.clear();
        localStorage.setItem('User', JSON.stringify(userValue))
    } else {
        setValueErrors(errors)
    }
}

useEffect(() => {
    console.log(valueErrors);
    if(Object.keys(valueErrors).length === 0 ) {
        console.log(userValue);
    }

}, [valueErrors])

const validate = (values) => {
    const errors = {};
    const regex= (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    if(!values.vorname) {
        errors.vorname = false
    }
    if(!values.nachname) {
        errors.nachname = false
    }
    if(!values.eMailAdresse || !regex.test(values.eMailAdresse)) {
        errors.eMailAdresse = false
    }
    if(!values.strasse) {
        errors.strasse = false
    }
    if(!values.hsNr) {
        errors.hsNr = false
    }
    if(!values.plz ||values.plz.length < 5) {
        errors.plz = false
    }
    if(!values.ort) {
        errors.ort = false
    }
    console.log(1, errors);
    return errors;
}

const createUserClickHandler = () =>{
     setUserValue({
        vorname: '',
        nachname: '',
        eMailAdresse: '',
        strasse: '',
        hsNr: '',
        plz: '',
        ort: '',
        img: '',
     });
     setIsLoaded(false);
     setActiveUser(false)
     setDisabled(true)
}

    return(
        <>
        {Object.keys(valueErrors).length > 0 && (<Error></Error> )}
        <form className ="font-publicSans flex flex-col mt-[50px] w-1/3 m-auto left-2/4 top-2/4 bg-white rounded-3xl shadow-lg shadow-gray-50 mb-32" >
            <div className={`${activeUser ? 'border-none ' : 'border-8 border-solid border-[#2222221A] '}` + "flex justify-center ml-auto mr-auto w-[260px] h-[260px] rounded-full mt-12 bg-[#F1F2F6] "}>
               <img className={`${activeUser ? 'w-full ' : ''}` +"block mx-auto my-auto rounded-full bg-gray-100 "} alt="user image" src={!activeUser ? user : userValue.img}></img>
            </div>
            <div className="flex justify-between flex-wrap w-[85%] mx-auto mb-12">
                <Input isChange={onChangeHandler} isDisabled={isDisabled} name={'vorname'} type={'text'} value={userValue.vorname} style={'w-[47.5%]'} placeholder={'Vorname'} isValid={"vorname" in valueErrors ? true : false}></Input>
                <Input isChange={onChangeHandler} isDisabled={isDisabled} name={'nachname'} type={'text'} value={userValue.nachname} style={'w-[47.5%]'} placeholder={'Nachname'} isValid={"nachname" in valueErrors ? true : false}></Input>
                <Input isChange={onChangeHandler} isDisabled={isDisabled} name={'eMailAdresse'} type={'email'} value={userValue.eMailAdresse} style={'w-[100%]'} placeholder={'E-Mail-Adresse'} isValid={"eMailAdresse" in valueErrors ? true : false}></Input>
                <Input isChange={onChangeHandler} isDisabled={isDisabled} name={'strasse'} type={'text'} value={userValue.strasse} style={'w-[70%]'} placeholder={'Straße'} isValid={"strasse" in valueErrors ? true : false}></Input>
                <Input isChange={onChangeHandler} isDisabled={isDisabled} name={'hsNr.'} type={'number'} value={userValue.hsNr} style={'w-[25%]'} placeholder={'Hsnr.'} isValid={"hsNr" in valueErrors ? true : false}></Input>
                <Input isChange={onChangeHandler} isDisabled={isDisabled} name={'plz'} type={''} value={userValue.plz} style={'w-[30%]'} placeholder={'PLZ'} isValid={"plz" in valueErrors ? true : false}></Input>
                <Input isChange={onChangeHandler} isDisabled={isDisabled} name={'ort'} type={'text'} value={userValue.ort} style={'w-[65%]'} placeholder={'Ort'} isValid={"ort" in valueErrors ? true : false}></Input>
                {!isLoaded ? <Button isLoaded={isLoaded} clicked={onClickHandler} style={ 'w-full text-white ' + `${activeUser ? 'bg-gradient-to-l from-[#1DD1A1] to-[#10AC84] ' : 'bg-gradient-to-l from-[#B9B9B9] to-[#9F9F9F] ' }`}  text={'User generieren'}></Button>
                            : <><Button clicked={isDisabled ? onEditClickHandler : onCancelClickHandler} style={'w-[47.5%] text-[#10AC84] text-[600] border-2 border-solid border-[#10AC84]'} text={isDisabled ?'Bearbeiten' : 'Abrechen'}></Button>
                            <Button clicked={!isDisabled ? onSaveClickHandler : createUserClickHandler} style={'w-[47.5%] text-white bg-gradient-to-l from-[#1DD1A1] to-[#10AC84] '} text={ isDisabled ? 'User anlegen' : 'Speichern'}></Button></>}
            </div>
        </form>
        </>
    )
}

export default Form