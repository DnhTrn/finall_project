import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import languages from "@/constants/languages/languages";
//
const useLanguages:any=()=>{
    //
    const [list,setList] =useState(['vi', 'en']);
    //
    const [code,setCode]=useState('en');
    const [language,setLanguage]=useState(languages['en']);
    //
    useEffect(()=>{
        const loadLanguage:any=async ()=>{
            try{
                let local:string|null=await AsyncStorage.getItem('language-mode');
                if(local===null){
                    return;
                }
                local=JSON.parse(local);
                // @ts-ignore
                setCode(local);
            }catch(e){
                console.log(e);
            }
        }
        loadLanguage();
    },[]);
    //
    useEffect(()=>{
        const update:any=async ()=>{
            try{
                // @ts-ignore
                setLanguage(languages[code]);
                await AsyncStorage.setItem('language-mode', JSON.stringify(code));
                const temp:any=list;
                temp.splice(temp.indexOf(code),1);
                temp.unshift(code);
                setList(temp);
            }catch(e){
                console.log(e);
            }
        }
        update();
    },[code])
    //
    const changeLanguage:any=(code:any)=>{
        setCode(code);
    }
    //
    return {language,code,list, changeLanguage }
}
export default useLanguages;