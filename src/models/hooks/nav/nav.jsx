import { useEffect, useState } from "react";

// 
export const useNav=()=>{
    // 
    const local=localStorage.getItem('nav-mode');
    // 
    const [mode,setMode]=useState(local?JSON.parse(local):false);
    // 
    const [current,setCurrent]=useState(local?JSON.parse(local):false);
    const [view,setView]=useState('80px');
    const [page,setPage]=useState('25px');
    // 
    useEffect(()=>{
        const vwValue = window.innerWidth * 0.18; // Tính giá trị 17vw theo pixel
        const newView = vwValue > 320 ? '320px' : `${vwValue}px`;
        const newPage = vwValue > 320? 320*0.8+'px' : `${vwValue*0.8}px`;
        localStorage.setItem('nav-mode',mode);
        setPage(mode?newPage:'25px');
        setView(mode?newView:'80px');
    },[mode])
    // 
    const changeView=()=>{
        setMode(!mode);
    };
    // 
    const setDefaultView=(mode)=>{
        setCurrent(mode);
        localStorage.setItem('nav-mode',mode);
    };
    // 
    return {mode,view,current,page,changeView,setDefaultView};
};
// 
export default useNav;