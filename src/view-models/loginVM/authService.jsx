import {createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useSettings from "../settingsVM/settingsVM";
import authModel from "../../models/authModel/authModel";

// 
const AuthContext=createContext();
// 
export const AuthService = ({children})=>{
    const navigate=useNavigate();
    const model = authModel;
    const {addSystemNotification}=useSettings();
    // 
    const login= async (email,password)=>{
        const login= await model.login(email,password);
        console.log(login);
        if(login){
            addSystemNotification('confirm','success','login');
            navigate('/dashboard');
            return;
        }
        addSystemNotification('confirm','false','login');
    }
    // 
    const logout = async () => {
        const logout= await model.logout();
        if(logout){
            addSystemNotification('confirm','success','logout');
            navigate('/login'); // Sử dụng navigate để điều hướng
            return;
        }
        addSystemNotification('confirm','false','login');
    };
    // 

    // 
    return (
        <AuthContext.Provider value={{login,logout}}>
            {children}
        </AuthContext.Provider>
    );
};
// 
const useAuth=()=>useContext(AuthContext);
// 
export default useAuth;