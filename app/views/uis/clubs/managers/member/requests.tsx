import {ScrollView, StyleSheet, Text, View} from "react-native";
import React from "react";
import useSettings from "@/contexts/settings/settings";
import Request from "@/app/components/club/items/users/request";
import useData from "@/contexts/datas/data";

const UserRequest=()=>{
    const {data,setData}=useData();
    // @ts-ignore
    const {theme}=useSettings();
    return (
        <View style={[{backgroundColor:theme.background.main},style.container]}>
            <Text style={style.title}>Request join</Text>
            <Text style={[{color:theme.text.second},style.note]}>The user will be a member of the club when approved.</Text>
            <Text style={[{color:theme.text.second},style.note]}>When the request is approved, the member will receive an email notification.</Text>
            <ScrollView style={{marginTop:10}}>
                {
                    data?.apply.map((item:any,key:any)=><Request index={key} key={key} request={item}/>)
                }
            </ScrollView>
        </View>
    )
}
//
const style=StyleSheet.create({
    container:{
        flex: 1,
        padding:15
    },
    title:{
        fontSize:18,
        fontWeight:'bold',
    },
    note:{
        fontSize:14,
    }
})
//
export default React.memo(UserRequest);