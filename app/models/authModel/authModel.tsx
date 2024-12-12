// import {auth, firestore} from "@/app/models/firebase/firebase";
import { signInWithEmailAndPassword,signOut} from 'firebase/auth';
import {collection} from "@firebase/firestore";
import {auth, firestore} from "@/constants/firebase/firebase";
// @ts-nocheck
const AuthModel:any=()=>{
    const table='users';
    const coll:any=collection(firestore,table);
    const login:any=async (email:string,password:string)=>{
        try{
            const authCheck = await signInWithEmailAndPassword(auth,email,password);
            if(authCheck){
                return true;
            }
            return false;
        }
        catch(e){
            console.log('Model:'+e);
            return false;
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
    return {login,logout};
}
//
export default AuthModel;