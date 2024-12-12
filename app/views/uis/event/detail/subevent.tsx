import {StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import Event from "@/app/components/skeletons/event";
import eventVM from "@/app/viewModels/eventVM/eventVM";
import Sub from "@/app/components/events/subEvent";

const Subevent=({id}:any)=>{
    const [data,setData]=useState(null);
    const {getSubs}=eventVM();
    useEffect(()=>{
        const fetch=async ()=>{
            try{
                const {status,events}=await getSubs(id);
                if (status){
                    setData(events)
                }
            }catch (e) {
                console.log("UI: "+e);
            }
        }
        fetch();
    },[])
    return (
        <View style={style.container}>
            {!data&&<Event />}
            {/*@ts-ignore*/}
            {data&&data?.length==0&&<Text style={style.empty}>This event currently has no clubs registered to participate</Text>}
            {/*@ts-ignore*/}
            {data&&data?.length!=0&&data.map((item:any,key:any)=><Sub key={key} item={item}/>)}
        </View>
    )
}
//
export default React.memo(Subevent);
//
const style=StyleSheet.create({
    container:{
        width:'100%',
        justifyContent:'flex-start',
        alignItems:'flex-start',
    },
    empty:{
        width:'100%',
        textAlign:'center',
        fontSize:14,
        marginVertical:10
    }
})