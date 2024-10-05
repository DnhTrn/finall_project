import { useEffect, useState } from "react";
import themes from '../../../assets/themes/themes';

//  
const useThemes=()=>{
    const local=localStorage.getItem('theme-mode');
    // 
    const [list,setList]=useState(['light','dark']);
    // 
    const [mode,setMode]=useState(local?JSON.parse(local):true);
    const [theme,setTheme]=useState(themes[mode?'light':'dark']);
    // 
    useEffect(()=>{
        setTheme(themes[mode?'light':'dark']);
        localStorage.setItem('theme-mode', mode);
        const temp=list;
        const tempMode=mode?'light':'dark';
        temp.splice(temp.indexOf(tempMode),1);
        temp.unshift(tempMode);
        setList(temp);
    },[mode])
    // 
    const changeTheme=()=>{
        setMode(!mode);
    };
    // 
    return {mode,theme,list,changeTheme}
};
// 
 export default useThemes;