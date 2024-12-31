import {ScrollView, StyleSheet, Text, View} from "react-native";
import React from "react";
import useSettings from "@/contexts/settings/settings";
import Content from "@/app/views/uis/clubs/managers/events/content/content";

const Events=()=>{
    const {theme}=useSettings();
    return (
        <View style={[{backgroundColor:theme.background.main},style.container]}>
            <Content/>
        </View>
    )
};
export default React.memo(Events);
//
const style=StyleSheet.create({
    container:{
        flex:1,
        width:'100%'
    }
})