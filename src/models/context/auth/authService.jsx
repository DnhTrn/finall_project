import {createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SettingServices } from "../../settings/settings";

// 
const AuthContext=createContext();
// 
export const AuthService = ({children})=>{
    const navigate=useNavigate();
    // 
    const login=()=>{
        sessionStorage.setItem('authToken','true');
        navigate('/dashboard');
    }
    // 
    const logout = () => {
        sessionStorage.removeItem('authToken');
        navigate('/login'); // Sử dụng navigate để điều hướng
    };
    // 
    return (
        <SettingServices>
            <AuthContext.Provider value={{login,logout}}>
                {children}
            </AuthContext.Provider>
        </SettingServices>
    );
};
// 
const useAuth=()=>useContext(AuthContext);
// 
export default useAuth;