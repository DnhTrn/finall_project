import {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {NavigationIndependentTree, useNavigation} from "@react-navigation/core";
import {NavigationState} from "react-native-tab-view";
import {NavigationContainer} from "@react-navigation/native";
import useAuth from "@/app/viewModels/authVM/authVM";
import {auth} from "@/constants/firebase/firebase";

// @ts-ignore
const NavigationContext:Context=createContext();
export const NavigationService:any = ({children}:any)=>{
    const nav:any=useNavigation();
    // @ts-ignore
    const user:User=auth.currentUser;
    const [show,setShow]=useState(true);
    const [hidden,setHidden]=useState(false);
    const [isChoose,setIsChoose]=useState('home');
    //
    const notLogin:string[] =['login'];
    //
    const navigationList:string[]=['home','clubs','notification','events','calendar','menu'];
    //
    const hiddenList:string[]=['club-create','club-policy','club-management-member','event-list','change-password',
        'event-register','event-manager-detail','event-manager-edit','event-manager-joined',
        'event-overview','login','club-management-managers','club-request-detail','event-create',
        'club-management-request','club-management-member-list','file-detail','club-request-edit'
        ,'club-management-club','club-management-detail-edit','event-detail','event-content','event-members'];
    // Hàm đệ quy để lấy tên màn hình cuối cùng
    // @ts-ignore
    const getActiveRouteName = (state: NavigationState | undefined): string | undefined => {
        if (!state) return undefined;

        const route = state.routes[state.index];
        // console.log(route.name);
        if(navigationList.includes(route.name)){
            setIsChoose(route.name);
        }
        // Nếu route có các màn hình con, tiếp tục đi sâu hơn
        if (route.state) {
            // @ts-ignore
            return getActiveRouteName(route.state as NavigationState);
        }
        return route.name;
    };
    // @ts-ignore
    const checkNavigation=useCallback((state:NavigationState|undefined) => {
        if(state){
            const route = state.routes[state.index];
            // console.log(route.name);
            if(!notLogin.includes(route.name)){
                if(!user){
                    // @ts-ignore
                    nav.replace('login');
                }
            }
            const routeName = getActiveRouteName(state);
            // console.log(routeName);
            // Kiểm tra xem route có nằm trong danh sách cần ẩn thanh điều hướng không
            // @ts-ignore
            if (hiddenList.includes(routeName)) {
                setHidden(true);
            } else {
                setHidden(false);
            }
        }
    })
    //
    return <NavigationContext.Provider value={{show,setShow,hidden,setHidden,isChoose,setIsChoose}}>
        <NavigationIndependentTree>
            <NavigationContainer onStateChange={checkNavigation}>
                {children}
            </NavigationContainer>
        </NavigationIndependentTree>

    </NavigationContext.Provider>
    //
}
const useCusNav:any=()=>useContext(NavigationContext);
export default useCusNav;