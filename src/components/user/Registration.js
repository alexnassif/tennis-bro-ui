import React, {useState, useEffect} from "react";
import {checkPhoneNumberIsValid, isDuplicateEmail, isDuplicateUsername, validatePassword} from "./validateInfo";
import { useCookies } from "react-cookie";
import {Link} from "react-router-dom";
import RegistrationForm from "./RegistrationForm";
import UserService from "../services/UserService";

const SubmitForm = (submit_callback) => {
    const [token] = useCookies(['tennisbro-token']);
    //if logged in it will redirect to another the success page
    useEffect( () => {
        console.log(token)
        if(token['tennisbro-token']) {
            window.location.href = '/';
        }
    }, [token])

    const profile = {
        "user_name": "",
        "email": "",
        "password": "",
    }
    const [inputs, setInputs] = useState(profile);
    const [emailError, setEmailError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }
        //validation(submit_callback);
        submit_callback();
    };
    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
        console.log(inputs);
    };

    function validation(callback) {
        const passwordIsValid = validatePassword(inputs.password, inputs.passwordReenter, setPasswordError);
        if(!passwordIsValid){
            return;}
        isDuplicateEmail(inputs.email)
            .then(function (response) {
                if (!response.data.valid) {
                    isDuplicateUsername(inputs.username)
                        .then(function (response) {
                            if (!response.data.valid) {

                                callback()
                            } else {
                                setUsernameError("Username is already registered")
                            }


                        })
                } else {
                    setEmailError("Email is already registered")
                }

            })
    }

    return {
        handleInputChange, 
        handleSubmit, 
        inputs,
        emailError,
        usernameError,
        passwordError};
}
const Registration = () => {
    const [success, setSuccess] = useState(false);

    const {inputs, handleInputChange, handleSubmit, emailError,
        usernameError,
        passwordError,
        } = SubmitForm(onSubmitProfile);

    function onSubmitProfile() {

        UserService.create(formattedProfile())
            .then(function (response) {
                    setSuccess(true);
                }
            ).catch(function (error) {
            alert(error);

        });


    }

    function formattedProfile() {

        return {
            "user_name": inputs.user_name,
            "password": inputs.password,
            "email": inputs.email
        }
    }

    return (
     <>
        {!success &&
        <form onSubmit={e => handleSubmit(e)}>
            <RegistrationForm
                handleInputChange={handleInputChange}
                inputs={inputs}
                passwordError={passwordError}
                usernameError={usernameError}
                emailError={emailError}/>
            <div className="container col-sm-8">
                <button type="submit" className="btn btn-dark btn-block mt-3">Register</button>
            </div>
        </form>
        }
         { success && <div className="jumbotron">
                    <h1>Success!!!</h1>

                    <p> {inputs.username} is registered</p>
             <Link to="login" className="nav-link custom-color h4" ><strong>Login</strong></Link>

         </div>

         }
        </>

    )
}

export default Registration;