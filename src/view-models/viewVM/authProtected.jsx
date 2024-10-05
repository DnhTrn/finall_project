import { Navigate, useNavigate } from "react-router-dom";
import App from "../../views/layout/App";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../models/firebase/firebase";
import { useEffect, useState } from "react";

const AuthProtected=()=>{
    const [isLogin,setIsLogin]=useState(false);
    const [isCheck,setIsCheck]=useState(true);
    const navigate = useNavigate();
    useEffect(()=>{
        const unsubscribe= onAuthStateChanged(auth,(user)=>{
            if(user){
                setIsLogin(true);
            }
            setIsCheck(false);
         })
         return ()=> unsubscribe();
    },[navigate])
    if(isCheck){
        return <>Loadding....</>
    }
    if(!isLogin){
        return <Navigate to="/login"/>
    }
    return <App/>
};
// 
export default AuthProtected;