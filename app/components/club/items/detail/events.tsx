import {Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import useData from "@/contexts/datas/data";
import Event from "@/app/components/skeletons/event";
import eventVM from "@/app/viewModels/eventVM/eventVM";
import Sort from "@/app/components/events/sort";

const Events=()=>{
    const {data}=useData();
    const [event,setEvent]=useState(null);
    const {getClubEvents}=eventVM();
    useEffect(() => {
        const fetch=async ()=>{
            try{
                const {status,events}=await getClubEvents(data?.club?.id);
                console.log(events);
                if (status){
                    setEvent(events)
                }
            }catch (e) {
                console.log("UI: "+e);
            }
        }
        fetch()
    }, []);
    // @ts-ignore
    return (
        <View style={{paddingHorizontal:5,paddingTop:10,flex:1}}>
            {!event&&<Event />}
            {/*@ts-ignore*/}
            {event&&event?.length==0&&<Text style={{fontSize:14,textAlign:'center',width:'100%'}}>This club currently has no events.</Text>}
            {/*@ts-ignore*/}
            {event&&event?.length!=0&&event.map((item:any,key:any)=><Sort key={key} item={item}/>)}
        </View>
    )
}
//
export default React.memo(Events);