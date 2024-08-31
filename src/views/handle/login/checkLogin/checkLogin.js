
import { checkForm } from './../checkForm/checkForn';
export const checkLogin=(email,password,setForm,setShow,setLogin)=>{
    // getting date from API 
    setShow(true); 
    if(checkForm(email,password)!=='success'){
        setForm(checkForm(email,password));
        return;
    }
    if(email!=="example@gmail.com"){
        setForm("incorrect-email");
        return;
    }
    if(password!=="00000000"){
        setForm("incorrect-password");
        return;
    }
    setShow(false); 
    setForm("success");
    setLogin(true);
    return;
};