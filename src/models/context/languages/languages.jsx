import { useEffect, useState } from 'react';
import { Languages } from './../../../assets/languages/languages';
// 
const useLanguages=()=>{
    // 
    const [list,setList] =useState(['vn', 'en']);
    // 
    const local=localStorage.getItem('language-mode');
    // 
    const [code,setCode]=useState(local?local:'en');
    const [language,setLanguage]=useState(Languages[code]);
    // 
    useEffect(()=>{
        setLanguage(Languages[code]);
        localStorage.setItem('language-mode', code);
        const temp=list;
        temp.splice(temp.indexOf(code),1);
        temp.unshift(code);
        setList(temp);
    },[code])
    // 
    const changeLanguage=(code)=>{
        setCode(code);
    }
    // 
    return {language,code,list, changeLanguage }
}
export default useLanguages;