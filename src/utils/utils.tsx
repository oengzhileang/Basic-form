export const validateForm = (value :{
    email:string;
    password: string;
    cfpassword : string
}) =>{
    const errors:{
        email:string;
        password: string;
        cfpassword : string
    } = {email: " " , password: " ", cfpassword: " "}
    if(!value.email){
        errors.email = "Email is required"
    }else if(!/\S+@\S+\.\S+/.test(value.email)) {
        errors.email = "Email address is valid"
    }
    if(!value.password){
        errors.password = "Password is required"
    }else if(value.password.length<6){
        errors.password = "Password must be atleast 6 character"
    }
    
    if(!value.cfpassword){
        errors.cfpassword = "Comfirm password is required"
    }
    else if(value.cfpassword !== value.password){
        errors.cfpassword = "Password does not match"
    }
    return errors;
}