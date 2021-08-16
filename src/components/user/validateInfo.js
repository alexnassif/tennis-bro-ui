import UserService from "../services/UserService";

export function validateIndustry(inputs) {
    let errors = {}

    if(!inputs.profession){
        errors.profession = "Select a profession"
    }
    if(!inputs.yearsActive){
        errors.yearsActive = "Years Active required"
    }
    if(!inputs.phoneNumber){
        errors.phoneNumber = "Phone number required"
    }
    if(!inputs.zipCode){
        errors.zipCode = "ZipCode required"
    }

    return errors; 
}

export function validatePassword(password, passwordReenter, setPasswordError) {
    if (password !== passwordReenter){
        setPasswordError("Passwords do not match");
        return false;
    }

    setPasswordError("");
    return true;
}

export function isDuplicateEmail(email){
    return UserService.emailExist(email);
}

export function isDuplicateUsername(username){
    return UserService.usernameExist(username);
}

export function checkPhoneNumberIsValid(phoneNumber, setPhoneError){

    let validPhoneNumberPattern = /^\d{10}$/;
    const flag = validPhoneNumberPattern.test(phoneNumber);

    if(flag){
        setPhoneError("");
        return true;
    }

    setPhoneError("not a valid phone number")
    return flag;

}