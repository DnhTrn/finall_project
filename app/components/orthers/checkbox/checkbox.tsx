import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import useSettings from "@/contexts/settings/settings";

const Checkbox=({title,check,setCheck}:any)=>{
    // @ts-ignore
    const {theme}=useSettings();
    return (
        <TouchableOpacity onPress={setCheck} style={style.container}>
            <View style={[{borderColor:theme.border.second},style.check_container]}>
                <View style={[{backgroundColor:check?theme.icon.main:theme.icon.th4},style.check]}/>
            </View>
            <Text style={style.text}>{title}</Text>
        </TouchableOpacity>
    )
}
export default React.memo(Checkbox);
//
const style=StyleSheet.create({
    container:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    check_container:{
        width:25,
        height:25,
        borderRadius:5,
        borderWidth:1,
        borderStyle:'solid',
        marginRight:10
    },
    check:{
        width:20,
        height:20,
        borderRadius:5,
        margin:1.5
    },
    text:{
        fontSize:14,
        flex:1,
    }
})