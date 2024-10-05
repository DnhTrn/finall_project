
import { checkForm } from './checkForn';
export const checkLogin=(email,password,setForm,setShow,login)=>{
    // getting date from API 
    setShow(true); 
    if(checkForm(email,password)!=='success'){
        setForm(checkForm(email,password));
        return;
    }
    login(email,password);
    setShow(false); 
    setForm("success");
    return;
};