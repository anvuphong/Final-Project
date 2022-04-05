export const ValidateDob = (dob) => {
    if(dob === null){
        return "This field is required";
    }
    let today = new Date();
    let birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    if(age < 18){
        return "User is under 18. Please select a different date";
    }
    return "";
}

export const ValidateJoinedDateWithDob = (joinedDate, dob) => {
    if(joinedDate === null){
        return "This field is required";
    }
    let joinedDateConvert = new Date(joinedDate);
    let dobConvert = new Date(dob);
    if(joinedDateConvert < dobConvert){
        return "Joined date is not later than Date of Birth. Please select a different date";
    }
    return "";
}

export const ValidateJoinedDateOnWeekend = (joinedDate) => {
    let joinedDateConvert = new Date(joinedDate);
    if((joinedDateConvert.getDay()  === 6) || (joinedDateConvert.getDay()  === 0)){
        return "Joined date is Saturday or Sunday. Please select a different date";
    }
    return "";
}

