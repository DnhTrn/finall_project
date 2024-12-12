import {StyleSheet, View} from "react-native";
import React from "react";
import useSettings from "@/contexts/settings/settings";

const SortClub=()=>{
    // @ts-ignore
    const {theme}=useSettings();
    return (
        <>
            <View style={[{backgroundColor:theme.skeleton.second},style.container]}>
                <View style={[{backgroundColor:theme.skeleton.main},style.image]}/>
                <View style={[style.content]}>
                    <View style={[{backgroundColor:theme.skeleton.main},style.row]}/>
                    <View style={[{backgroundColor:theme.skeleton.main},style.row]}/>
                    <View style={[{backgroundColor:theme.skeleton.main},style.row]}/>
                    <View style={[{backgroundColor:theme.skeleton.main},style.row]}/>
                </View>
            </View>
        </>
    )
}
//
const style=StyleSheet.create({
    container:{
        width:'100%',
        flexDirection:'row',
        marginTop:10,
        flex:1,
        paddingHorizontal:15,
        paddingVertical:15,
        height:100,
        borderRadius:15
    },
    image:{
        width:70,
        height:70,
        borderRadius:15,
    },
    content:{
        flex:1,
        marginLeft:10,
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'flex-start'
    },
    row:{
        width:'100%',
        height:10,
        marginBottom:5,
        borderRadius:10,
    },
})
//
export default React.memo(SortClub);