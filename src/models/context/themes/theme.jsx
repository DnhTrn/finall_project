import { useEffect, useState } from "react";
import themes from './../../../assets/themes/themes';

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
        console.log(mode);
        setTheme(themes[mode?'light':'dark']);
        localStorage.setItem('theme-mode', mode);
        const temp=list;
        temp.splice(temp.indexOf(mode),1);
        temp.unshift(mode);
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