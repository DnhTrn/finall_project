import { createContext, useContext } from "react";
import useLanguages from "../../models/hooks/languages/languages";
import useNav from "../../models/hooks/nav/nav";
import useThemes from "../../models/hooks/themes/theme";
import useNotification from "../../models/hooks/notificaiton/notification";
// 
const SettingContext=createContext();
// 
export const SettingServices=({children})=>{
    // 
    const {language,code,list:langList,changeLanguage}=useLanguages();
    // 
    const {theme,mode:themeMode,list:themeList,changeTheme}=useThemes();
    // 
    const {view,current,mode:viewMode,page,changeView,setDefaultView}=useNav();
    // 
    const {mode,list,time,systemList,setSystemList,setMode,setCheck,setTime,addNotification,addSystemNotification}=useNotification();
    // 
    return (
        <SettingContext.Provider value={{language,code,langList,changeLanguage,
        theme,themeMode,themeList,changeTheme,
        view,current,page,viewMode,changeView,setDefaultView,
        mode,list,time,systemList,setSystemList,setMode,setCheck,setTime,addNotification,addSystemNotification}}>
            {children}
        </SettingContext.Provider>
    )
};
// 
const useSettings=()=>useContext(SettingContext);
// 
export default useSettings;