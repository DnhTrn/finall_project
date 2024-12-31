import {StyleSheet, View} from "react-native";
import React from "react";
import useSettings from "@/contexts/settings/settings";

const FullClub=()=>{
    const {theme}=useSettings()
    return (
        <View style={style.container}>
            <View style={style.head}>
                <View style={[{backgroundColor:theme.skeleton.main},style.ava]}/>
                <View style={style.by}>
                    <View style={[{backgroundColor:theme.skeleton.main},style.line]}/>
                    <View style={[{backgroundColor:theme.skeleton.main},style.line]}/>
                    <View style={[{backgroundColor:theme.skeleton.main},style.line]}/>
                </View>
            </View>
            <View style={[{backgroundColor:theme.skeleton.main},style.line]}/>
            <View style={[{backgroundColor:theme.skeleton.main},style.line]}/>
            <View style={[{backgroundColor:theme.skeleton.main},style.image]}/>
            <View style={[{backgroundColor:theme.skeleton.main},style.btn]}/>
        </View>
    )
}
//
export default React.memo(FullClub);
//
const style = StyleSheet.create({
    container: {
        flex: 1,
        width:'100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    head:{
        width:'100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems:'center',
        paddingBottom:10,
        borderBottomWidth:0.5,
        marginBottom:10
    },
    ava:{
        width:50,
        height:50,
        borderRadius:10,
    },
    by:{
        marginLeft:10,
        width:'70%',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    line:{
        marginBottom:5,
        width:'100%',
        height:10,
        borderRadius:5,
    },
    image:{
        width:'100%',
        height:200,
        borderRadius:15,
        marginBottom:10
    },
    btn:{
        width:'100%',
        height:35,
        borderRadius:10,
    }
});