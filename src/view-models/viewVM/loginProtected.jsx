import { Navigate, useLocation } from "react-router-dom";
import Login from "../../views/UIS/login/login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../models/firebase/firebase";
import { useEffect, useState } from "react";

const LoginProtected=()=>{
    const location=useLocation();
    const [isLogin,setIsLogin]=useState(false);
    const [isLoad,setIsLoad]=useState(true);
    useEffect(()=>{
        const unsubscribe= onAuthStateChanged(auth,(user)=>{
            if(user){
                setIsLogin(true);
            }
            setIsLoad(false);
         })
         return ()=> unsubscribe();
    },[]);
    if(isLoad){
        return <>Loading ....</>
    }
    if(isLogin){
        return <Navigate to={location.state?.from || '/dashboard'} replace/>;
    }
    return <Login/>
};
export default LoginProtected;