import { createContext, useContext } from "react";
import useLanguages from "../context/languages/languages";
import useNav from "../context/nav/nav";
import useThemes from "../context/themes/theme";
// 
const SettingContext=createContext();
// 
export const SettingServices=({children})=>{
    // 
    const {language,code,list:langList,changeLanguage}=useLanguages();
    // 
    const {theme,mode:themeMode,list:themeList,changeTheme}=useThemes();
    // 
    const {view,mode:viewMode,page,changeView,setDefaultView}=useNav();
    // 
    return (
        <SettingContext.Provider value={{language,code,langList,changeLanguage,theme,themeMode,themeList,changeTheme,view,page,viewMode,changeView,setDefaultView}}>
            {children}
        </SettingContext.Provider>
    )
};
// 
const useSettings=()=>useContext(SettingContext);
// 
export default useSettings;