import {ScrollView, StyleSheet, Text, View} from "react-native";
import React from "react";;
import Main from "@/app/views/uis/home/main";

const Home=()=>{
    return (
        <ScrollView style={styles.container}>
            <Main/>
        </ScrollView>
    )
}
//
export default React.memo(Home);
//
const styles=StyleSheet.create({
    container:{
        flex:1,
        paddingTop:10,
        paddingHorizontal:15
    }
})