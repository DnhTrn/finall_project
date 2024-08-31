import React, {useState,useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Div from "../../div/div";
import { Icon, listIcons } from "../../../../assets/icons/icons";
import Input from "../../input/input";
import Label from "../../label/label";
import { checkStatus } from "../../../handle/login/checkStatus/checkStatus";
import useSettings from "../../../../models/settings/settings";
import { checkLogin } from "../../../handle/login/checkLogin/checkLogin";
import { CheckMessage } from "../../../handle/login/checkMessage/checkMessage";
import { setValue } from "../../../handle/login/setValue/setValue";
import { focus } from "../../../handle/login/focus/forcus";
import { checkForm } from './../../../handle/login/checkForm/checkForn';
import useAuth from "../../../../models/context/auth/authService";

const Form =()=>{
    // 
    const [isFirstLoad,setFirstLoad]=useState(true);
    // 
    const {language,theme}=useSettings();
    const {login}=useAuth();
    // 
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    // trang thai nhap du lieu
    const [isInput,setIsInput]=useState(false);
    const [emailFocus,setEmailFocus] =useState(false);
    const [passwordFocus,setPasswordFocus] = useState(false);
    // trang thai du lieu
    const [emailStatus,setEmailStatus] = useState('default');
    const [passwordStatus,setPasswordStatus] = useState('default');
    // trang thai cua mat khau
    const [showPassword,setShowPassword]=useState(false);
    // 
    const [message,setMessage]=useState();
    const [showMessage,setShowMessage]=useState(false);
    // 
    const [form,setForm]=useState();
    const [isLogin,setLogin]=useState(false);
    // 
    // 
    // 
    useEffect(()=>{
        let timeout;
        if(isFirstLoad){
            setFirstLoad(false);
            return;
        }
        if(!isInput){
            timeout=setTimeout(()=>{
                setForm(checkForm(email,password));
                checkStatus(form,setEmailStatus,setPasswordStatus);
            },500);
        }
        return ()=>clearTimeout(timeout);
    },[isInput]);
    // cap nhap trang thai khi state cua form thay doi
    useEffect(()=>{
        if(isFirstLoad){
            return;
        }
        setMessage(language.messages.login[form===undefined?'null':form]);
        setShowMessage(CheckMessage(form));
        checkStatus(form,setEmailStatus,setPasswordStatus);
    },[form,language]);
    // 
    useEffect(()=>{
        if(isLogin){
            login();
        }
    },[isLogin])
    // 
    return (
            <Div animate={{color:theme.text.content.th4}} justify="start" align="baseline" column={true} > 
                <Div animate={{margin:emailFocus?'30px 0 0 0':'5px 0 0 0'}} position="relative" justify="center" align='baseline' >
                    <Input background={theme.background.main} color={theme.text.content.input} animate={{border:`3px solid ${theme.border.status[emailStatus]}`}} 
                    width="300px" size="16px" padding="3px 0 2px 15px" radius="25px" outline="none" 
                    onFocus={()=>focus(setIsInput,setEmailFocus,setEmailStatus)} onBlur={(e)=>setValue(e,setEmail,setEmailFocus,setIsInput,setEmailStatus)} />
                    <Label animate={{top:emailFocus?'-30px':'1px'}} position="absolute" left="10px" >{language.content.login.email}</Label>
                </Div>
                <Div animate={{margin:passwordFocus?'30px 0 0 0':'5px 0 0 0',border:`3px solid ${theme.border.status[passwordStatus]}`}} 
                position="relative" justify="start" align='center' background={theme.background.main}
                width="300px" padding="3px 0 2px 15px" radius="25px">
                    <Input size="16px" type={showPassword?'text':'password'} color={theme.text.content.input} 
                    width="265px" outline="none" border="none" background={theme.background.main}
                    onFocus={()=>focus(setIsInput,setPasswordFocus,setPasswordStatus)} onBlur={(e)=>setValue(e,setPassword,setPasswordFocus,setIsInput,setPasswordStatus)} />
                    <Icon onClick={()=>setShowPassword(!showPassword)} icon={listIcons.password[showPassword]}/>
                    <Label animate={{top:passwordFocus?'-30px':'0'}} position="absolute" left="10px" >{language.content.login.password}</Label>
                </Div>
                <AnimatePresence>
                    {!!showMessage&&<motion.span 
                        initial={{opacity:0,y:'-25px',height:0,marginTop:0}}
                        animate={{opacity:1,y:0,height:'auto',marginTop:'10px'}}
                        exit={{opacity:0,y:'-25px',height:0,marginTop:0,transition:{
                            y:{delay:0.3},height:{delay:0.1,duration:0.5},duration:0.3
                        }}}
                        transition={{opacity:{delay:0.4,duration:0.3},y:{delay:0.3},duration:0.5}}
                    >{message}</motion.span>}
                </AnimatePresence>
                
                <motion.a initial={{cursor:'pointer',marginTop:'10px',color:theme.text.content.th4}} animate={{color:theme.text.content.th4}}
                 whileHover={{color:theme.text.hover.th3}} >{language.content.login.forgotPassword}</motion.a>
                <Div padding="10px 20px" margin="10px 0" radius="15px" cursor="pointer"
                initial={{background:theme.background.button.main}} color={theme.text.content.second} 
                whileHover={{background:theme.background.button.second}} 
                onClick={()=>checkLogin(email,password,setForm,setShowMessage,setLogin)} >{language.content.login.button}</Div>
            </Div>
    );
};
export default React.memo(Form);