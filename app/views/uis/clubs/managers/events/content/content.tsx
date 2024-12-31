import {StyleSheet, View} from "react-native";
import React, {useState} from "react";
import EventManager from "@/app/viewModels/viewVM/clubs/eventManager";
import useSettings from "@/contexts/settings/settings";

const Content=()=>{
    const {theme}=useSettings();
    return (
        <View style={[{backgroundColor:theme.background.main},style.container]}>
            <EventManager />
        </View>
    )
}
//
const style=StyleSheet.create({
    container:{
        flex:1,
        minHeight:'100%',
        width:'100%',
        paddingHorizontal:15,
    }
})
//
export default React.memo(Content)