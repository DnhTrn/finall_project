export const checkForm=(email,password)=>{
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email==='' || password===''){
        return "null";
    }
    if(!re.test(email)){
        return  "incorrect-email-format";
    }
        
    if(password.length<8){
        return "incorrect-password-format";
    }
    return "success";
};