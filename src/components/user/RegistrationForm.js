import React from "react";
const errorMessage = {
    color: "red",
}
const RegistrationForm = ({inputs, handleInputChange, usernameError, passwordError, emailError}) => {

    return (

        <div className="container col-sm-8">
            <div className="jumbotron mt-5">
                <h1><strong>Registration</strong></h1>
                <p>To register, please take the time to fill out the information below</p>
            </div>
            <div className="form-row">
                <div className="col-sm-4">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={inputs.email} onChange={e => handleInputChange(e)}
                           className="form-control" id="email" placeholder="Email" required/>
                           {emailError && <p style={errorMessage}>{emailError}</p>}
                </div>  
            </div>
            <div className="form-row">
                <div className="col-sm-4">
                    <label htmlFor="user_name">Username</label>
                    <input type="text" value={inputs.user_name} name="user_name" onChange={e => handleInputChange(e)}
                           className="form-control" id="user_name" placeholder="user_name" required/>
                           {usernameError && <p style={errorMessage}>{usernameError}</p> }
                </div>
            </div>
            <div className="form-row">
                <div className="col-sm-4">
                    <label htmlFor="password">Password</label>
                    <input type="password" value={inputs.password} name="password" onChange={e => handleInputChange(e)}
                           className="form-control" id="password" placeholder="" required/>
                           {passwordError && <p style={errorMessage}>{passwordError}</p>}
                </div>
            </div>
            <div className="form-row">
                <div className="col-sm-4">
                    <label htmlFor="passwordReenter">Password</label>
                    <input type="password" value={inputs.passwordReenter} name="passwordReenter"
                           onChange={e => handleInputChange(e)} className="form-control" id="passwordReenter"
                           placeholder="" required/>
                </div>
            </div>
        </div>
    )
}

export default RegistrationForm;