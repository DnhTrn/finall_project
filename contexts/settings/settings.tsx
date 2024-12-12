import { createContext, useContext } from "react";
import useThemes from "@/hooks/themes/themes";
import useLanguages from "@/hooks/languages/languages";
import useLoading from "@/hooks/loading/loading";
// @ts-ignore
const SettingContext:Context= createContext();
//
export const SettingService:any=({children}:any)=>{
    const {mode,theme,list:themeList,changeTheme}=useThemes();
    const {language:lang,code,list:langList, changeLanguage}=useLanguages();
    //
    const {load,setLoad}=useLoading();
    return(
        <SettingContext.Provider value={{
            mode,theme,themeList,changeTheme,
            lang,code,langList, changeLanguage,
            load,setLoad
        }}>
            {children}
        </SettingContext.Provider>
    )
}
//
const useSettings:any=()=>useContext(SettingContext);
export default useSettings;