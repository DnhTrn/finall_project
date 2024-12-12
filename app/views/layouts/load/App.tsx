import {Image, StyleSheet,Text, View} from "react-native";
import React from "react";
import useSettings from "@/contexts/settings/settings";
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
    return (
        <View style={[{backgroundColor:theme.background.main},style.container]}>
            <Image style={style.load} source={require('../../../../assets/images/light_load.gif')} resizeMode={"cover"}/>
        </View>
    )
}

//
export default React.memo(AppLoad);
//