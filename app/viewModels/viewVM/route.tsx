//
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "@/app/views/uis/login";
import Main from "@/app/viewModels/viewVM/main/main";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect} from "react";
import {useNavigation} from "@react-navigation/core";
import AuthVM from "@/app/viewModels/authVM/authVM";
import AppLoad from "@/app/views/layouts/load/App";
//
const Root:any=createNativeStackNavigator();
const route:any=()=>{
    const navigation:any = useNavigation();
    // @ts-ignore
    const {login :authLogin}=AuthVM();
    useEffect(() => {
        const checkLoginStatus:any = async () => {
            try {
                const storedEmail:string|null = await AsyncStorage.getItem('userEmail');
                const storedPassword:string|null = await AsyncStorage.getItem('userPassword');
                if (storedEmail && storedPassword) {
                    // Thực hiện đăng nhập với thông tin từ AsyncStorage
                    const check:any= await authLogin(storedEmail, storedPassword);
                    if(check){
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'main' }],
                        });
                    }
                    return;
                }
                console.log('dont have login');
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'login' }],
                });
            } catch (error) {
                console.log('Lỗi khi kiểm tra thông tin đăng nhập:', error);
            }
        };
        checkLoginStatus();
    },[]);
    return(
        <Root.Navigator initialRouteName={'load'} screenOptions={{headerShown:false}}>
            <Root.Screen name='load' component={AppLoad} />
            <Root.Screen name='login' component={Login} />
            <Root.Screen name='main' component={Main} />
        </Root.Navigator>
    )
};
//
export default route;