import authModel from "@/app/models/authModel/authModel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import checkData from "@/constants/handles/checkData";

const AuthVM:any=()=>{
    const {login:modelLogin,logout:modelLogout,changePassword:modelChange,getInfo:modelInfo,updateInfo}=authModel();
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
            const check = await modelLogout();
            if(!check?.status){
                return {status:false};
            }
            await AsyncStorage.removeItem('userEmail');
            await AsyncStorage.removeItem('userPassword');
            return check;
        }catch (e) {
            console.log("VM: "+e);
            return {status:false};
        }
    }
    //
    const checkCurrent=async ()=>{
        try{
            const storedEmail:string|null = await AsyncStorage.getItem('userEmail');
            const storedPassword:string|null = await AsyncStorage.getItem('userPassword');
            if (storedEmail && storedPassword) {
                // Thực hiện đăng nhập với thông tin từ AsyncStorage
                const check:any= await login(storedEmail, storedPassword);
                return check;
            }
            return {status:false};
        } catch (error) {
            console.log('Lỗi khi kiểm tra thông tin đăng nhập:', error);
            return {status:false};
        }
    }
    // 
    const getInfo=async ()=>{
        try{
            const check=await modelInfo();
            return check;
        }catch (e) {
            console.log("VM: "+ e);
            return {status:false};
        }
    }
    // 
    const changePassword=async (password:string,confirm:string)=>{
        try{
            if(password.length<8){
                return {status:false,error:'length'};
            }
            if(password!==confirm){
                return {status:false,error:'confirm'};
            }
            if(!/[A-Z]/.test(password)){
                return {status:false,error:'upper'};
            }
            if(!/[!@#$%^&*(),.?":{}|<>]/.test(password)){
                return {status:false,error:'special'};
            }
            const check= await modelChange(password);
            if(check?.status){
                await AsyncStorage.setItem('userPassword', password);
            }
            return check;
        }catch (e) {
            console.log('VM:'+ e);
            return {status:false,error:'wrong'};
        }
    }
    //
    const put=async (data:any)=>{
        try{
            if(!checkData(data)){
                return {status:false}
            }
            const check =await updateInfo(data);
            return check;
        }catch (e) {
            console.log("VM: "+e);
            return {status:false};
        }
    }
    return {login,logout,checkCurrent,changePassword,getInfo,put};
}
//
export default AuthVM;