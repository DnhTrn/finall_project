import {ScrollView, StyleSheet, View} from "react-native";
import React, {useState} from "react";
import Line from "@/app/views/uis/clubs/managers/events/chart/line";
import Total from "@/app/views/uis/clubs/managers/events/total";
import useSettings from "@/contexts/settings/settings";
import Bar from "@/app/views/uis/clubs/managers/events/chart/bar";

const Overview=()=>{
    const {theme}=useSettings();
    return (
        <ScrollView style={[{backgroundColor:theme.background.main},style.container]} showsVerticalScrollIndicator={false}>
            <Total/>
            <View style={{width:'100%'}}>
                <Line />
            </View>
            <View style={{width:'100%'}}>
                <Bar/>
            </View>
        </ScrollView>
    )
}
//
export default React.memo(Overview);
//
const style=StyleSheet.create({
    container:{
        width:"100%",
        flex:1,
    }
})