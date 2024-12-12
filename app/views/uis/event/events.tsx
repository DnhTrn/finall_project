import {ScrollView, Text} from "react-native";
import React, {useEffect, useState} from "react";
import EventVM from "@/app/viewModels/eventVM/eventVM";
import Event from "@/app/components/skeletons/event";
import Sub from "@/app/components/events/subEvent";
import Sort from "@/app/components/events/sort";

const Events=()=>{
    const {getClubsEvents}=EventVM();
    const [data,setData]=useState(null);
    useEffect(()=>{
        const fetch=async ()=>{
            try {
                const {status,events}=await getClubsEvents();
                console.log(events);
                if (status){
                    setData(events)
                }
            }catch (e) {
                console.log('UI: '+e)
            }
        }
        fetch()
    },[])
    // @ts-ignore
    return (
        <ScrollView style={{flex:1,paddingTop:10}}>
            {!data&&<Event />}
            {/*@ts-ignore*/}
            {data&&data.map((item,key)=><Sort item={item} key={key}/>)}
        </ScrollView>
    )
}
//
export default React.memo(Events);