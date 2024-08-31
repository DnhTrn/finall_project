import { createContext, useContext, useRef, useState } from "react";

// 
const ConfirmContext=createContext();
export const ConfirmService=({children})=>{
    // 
    const [title,setTitle]=useState(null);
    // 
    const [state,setState]=useState(false);
    // 
    const [note,setNote]=useState(null);
    // 
    const ref=useRef(null);  
    // 

    const getConfirm=(title,msg,callback)=>{
        setState(true);
        setTitle(title);
        setNote(msg);
        ref.current=callback;
        return;
    };
    // 
    const close=()=>{
        setState(false);
        setNote(null);
        setTitle(null);
        ref.current=null;
        return;
    };
    // 
    const confirm=()=>{
        if(!ref.current){
            close();
            return;
        }
        setTimeout(()=>{
            ref.current();
            setState(false);
            close();
        },500);
        setState(false);
        return;
    };
    // 

    return (
        <ConfirmContext.Provider value={{state,title,note,getConfirm,close,confirm}}>
            {children}
        </ConfirmContext.Provider>
    );
};
// 
const useConfirm=()=>useContext(ConfirmContext);
export default useConfirm;