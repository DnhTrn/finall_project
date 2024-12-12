import {Image, StyleSheet, Text, View} from "react-native";
import React from "react";
import useSettings from "@/contexts/settings/settings";

const User=()=>{
    // @ts-ignore
    const {theme}=useSettings();
    return (<View style={style.container}>
        <View style={[{backgroundColor:theme.skeleton.main},style.avata]} />
        <View style={[style.content]}>
            <View style={[{backgroundColor:theme.skeleton.main},style.line]} />
            <View style={[{backgroundColor:theme.skeleton.main},style.line]} />
        </View>
    </View>)
}
//
export default React.memo(User);
const style=StyleSheet.create({
    container:{
        width:'75%',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        marginBottom:10
    },
    avata:{
        width:60,
        height:60,
        borderRadius:25,
    },
    content:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'flex-start',
        marginLeft:10
    },
    line:{
        flex:1,
        width:'100%',
        height:'40%',
        marginBottom:5,
        borderRadius:5,
    }
})