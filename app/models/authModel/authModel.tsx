// import {auth, firestore} from "@/app/models/firebase/firebase";
import {deleteUser, signInWithEmailAndPassword, signOut, updatePassword} from 'firebase/auth';
import {collection, updateDoc} from "@firebase/firestore";
import {auth, firestore} from "@/constants/firebase/firebase";
import {doc, getDoc} from "firebase/firestore";
// @ts-nocheck
const AuthModel:any=()=>{
    const table='users';
    const coll:any=collection(firestore,table);
    const login:any=async (email:string,password:string)=>{
        try{
            const authCheck = await signInWithEmailAndPassword(auth,email,password);
            const req=doc(coll,auth.currentUser?.uid)
            const user=await getDoc(req);
            if(!user.exists()){
                console.log('Tai khoan da bi xoa');
                // @ts-ignore
                await deleteUser(auth?.currentUser);
                await logout();
                //
                console.log('Tai khoan da xoa thanh cong');
                return {status:false}
            }
            // @ts-ignore
            if(user.data().firstLogin){
                return {status:true,first:true}
            }
            return {status:true,first:false}
        }
        catch(e){
            console.log('Model:'+e);
            return {status:false}
        }
    }
    //
    const logout:any=async ()=>{
        try{
            await signOut(auth);
            return true;
        }catch(e){
            return false;
        }
    }
    // 
    const changePassword=async (password:string)=>{
        try{
            const user=auth?.currentUser;
            if(!user)return {status:false,error:'wrong'};
            await updatePassword(user,password);
            const req:any=doc(coll,auth.currentUser?.uid);
            await updateDoc(req,{firstLogin:false});
            return {status:true}
        }catch (e) {
            console.log('Model: '+e);
            return {status:false,error:'wrong'};
        }
    }
    //
    const getInfo=async ()=>{
        try{
            const req:any=doc(coll,auth.currentUser?.uid);
            const res:any=await getDoc(req);
            return {status:true,data:res.data()};
        }catch (e) {
            console.log('M: '+e);
            return {status:false}
        }
    }
    //
    const updateInfo=async (data:any)=>{
        try{
            const res=doc(coll,auth.currentUser?.uid);
            await updateDoc(res,data);
            return {status:true};
        }catch (e) {
            console.log('Model: '+e);
            return {status:false}
        }
    }
    return {login,logout,changePassword,getInfo,updateInfo};
}
//
export default AuthModel;