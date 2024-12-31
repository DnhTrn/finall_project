import useSettings from "@/contexts/settings/settings";
import {StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import useData from "@/contexts/datas/data";
import EventVM from "@/app/viewModels/eventVM/eventVM";
import index from "@/app";

const Total=()=>{
    const {theme}=useSettings();
    const {data}=useData();
    const [value,setValue]=useState(null);
    const {getTotal}=EventVM();
    useEffect(()=>{
        const fetch=async ()=>{
            try{
                const {status,value:response}=await getTotal(data?.club?.id);
                if(!status)return;
                setValue(response);
            }catch (e) {
                console.log('Ui: '+e);
            }
        }
        fetch()
    },[])
    // @ts-ignore
    return (
        <View style={style.container}>
            <View style={style.head}>
                <View style={style.head_content}>
                    <View style={style.wrap}>
                        <Text>Total event:</Text>
                        {/*@ts-ignore*/}
                        <Text style={style.num}>{value?.total??0}</Text>
                    </View>
                    <Text style={style.note}>Total Events includes both internal events and events participating in main events.</Text>
                </View>
                <View style={style.head_content}>
                    <View style={style.wrap}>
                        <Text>Internal event:</Text>
                        {/*@ts-ignore*/}
                        <Text style={style.num}>{value?.interval??0}</Text>
                    </View>
                    <Text style={style.note}>Internal events are events open only to club members.</Text>
                </View>
                <View style={style.head_content}>
                    <View style={style.wrap}>
                        <Text>Sub event:</Text>
                        {/*@ts-ignore*/}
                        <Text style={style.num}>{value?.sub??0}</Text>
                    </View>
                    <Text style={style.note}>Sub-events are events that register to participate in main events and have been approved to participate.</Text>
                </View>
                <View style={style.head_content}>
                    <View style={style.wrap}>
                        <Text>Club joined rate:</Text>
                        {/*@ts-ignore*/}
                        <Text style={style.num}>{value?.joinedRate??0}%</Text>
                    </View>
                    <Text style={style.note}>Participation rate in events of club members.</Text>
                </View>
            </View>
        </View>
    )
}
//
export default React.memo(Total);
//
const style=StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        paddingBottom: 10,
        borderBottomWidth:1,
        borderStyle:'solid',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        paddingHorizontal:10,
        paddingTop:10
    },
    num:{
        fontSize:14,
        fontWeight:'bold',
    },
    head:{
        width:'100%',
        flexWrap:'wrap',
        justifyContent:'space-between',
        alignItems:'flex-start',
        flexDirection:'row',
    },
    head_content:{
        width:'50%',
        justifyContent:'flex-start',
        alignItems:'flex-start',
    },
    wrap:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    note:{
        fontSize:12,
        color:'gray',
    }
})