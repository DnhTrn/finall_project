import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

class authModel{
    async login  (username, password){
        try{
            await signInWithEmailAndPassword(auth, username, password);
            return true;
        }
        catch(e){
            return false;
        }
    }
    async logout(){
        try{
            await signOut(auth);
            return true;
        }catch(e){
            return false;
        }
    }
}

export default new authModel();