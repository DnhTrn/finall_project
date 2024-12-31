import {Image, StyleSheet,Text, View} from "react-native";
import React, {useEffect} from "react";
import useSettings from "@/contexts/settings/settings";
import {useNavigation} from "@react-navigation/core";
import AuthVM from "@/app/viewModels/authVM/authVM";
const style=StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: "column",
        justifyContent:"center",
        alignItems:"center",
    },
    load:{
        height:350,
        width:350
    }
})
const AppLoad=()=>{
    // @ts-ignore
    const {theme}=useSettings();
    console.log('isLoad');
    const navigation:any = useNavigation();
    // @ts-ignore
    const {checkCurrent}=AuthVM();
    const trigger=async ()=>{
        try{
            const check = await checkCurrent(navigation);
            if(!check.status){
                navigation.replace('login');
                return;
            }
            if(check.first){
                navigation.replace('change-password');
                return;
            }
            navigation.replace('main');
        }catch (e) {
            console.log('UI: '+e)
        }
    }
    useEffect(() => {
        trigger();
    },[]);
    return (
        <View style={[{backgroundColor:theme.background.main},style.container]}>
            <Image style={style.load} source={require('../../../../assets/images/light_load.gif')} resizeMode={"cover"}/>
        </View>
    )
}

//
export default React.memo(AppLoad);
//