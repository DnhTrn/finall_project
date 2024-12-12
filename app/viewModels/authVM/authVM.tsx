import authModel from "@/app/models/authModel/authModel";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthVM:any=()=>{
    const {login:modelLogin,logout:modelLogout}=authModel();
    /**
     * login function
     * email: email login
     * password: password login
     * */
    const login:any= async (email:string,password:string)=>{
        try{
            const isLogin:any= await modelLogin(email,password);
            if(isLogin){
                console.log("login",isLogin);
                await AsyncStorage.setItem('userEmail', email);
                await AsyncStorage.setItem('userPassword', password);
            }
            return isLogin;
        }catch (e) {
            console.log(e);
            return false;
        }
    }
    /**
     * logout function
     * */
    const logout:any=async ()=>{
        try{
            await modelLogout();
            return true;
        }catch (e) {
            return false;
        }
    }
    //
    return {login,logout};
}
//
export default AuthVM;