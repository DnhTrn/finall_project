//
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "@/app/views/uis/login";
import Main from "@/app/viewModels/viewVM/main/main";
import {useEffect} from "react";
import AuthVM from "@/app/viewModels/authVM/authVM";
import AppLoad from "@/app/views/layouts/load/App";
import {useNavigation} from "@react-navigation/core";
import changePassword from "@/app/views/uis/changePassword";
//
const Root:any=createNativeStackNavigator();
const Route:any=()=>{
    return(
        <Root.Navigator initialRouteName={'load'} screenOptions={{headerShown:false}}>
            <Root.Screen name='load' component={AppLoad} />
            <Root.Screen name='login' component={Login} />
            <Root.Screen name='main' component={Main} />
            <Root.Screen name='change-password' component={changePassword} />
        </Root.Navigator>
    )
};
//
export default Route;