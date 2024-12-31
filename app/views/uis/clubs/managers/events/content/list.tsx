import {ScrollView, StyleSheet, Text} from "react-native";
import React, {useEffect} from "react";
import useSettings from "@/contexts/settings/settings";
import {backgroundColor} from "react-native-calendars/src/style";
import Event from "@/app/components/skeletons/event";
import EventVM from "@/app/viewModels/eventVM/eventVM";
import useData from "@/contexts/datas/data";
import EventItem from "@/app/components/events/event";

const List=()=>{
    const {theme}=useSettings();
    const {data}=useData();
    const [events,setEvents]=React.useState(null);
    const {getClubEvents}=EventVM();
    useEffect(()=>{
        const fetch=async ()=>{
            try{
                const {status,events:response}=await getClubEvents(data?.club?.id);
                if(status)setEvents(response);
                console.log(response.length);
            }catch (e) {
                console.log('UI: '+e);
            }
        }
        fetch();
    },[])
    // @ts-ignore
    return (
        <ScrollView style={[{backgroundColor:theme.background.main},style.container]}>
            {!events&&<Event />}
            {!events&&<Event />}
            {!events&&<Event />}
            {/*@ts-ignore*/}
            {events&&events?.length==0&&<Text style={style.empty}>There are currently no events.</Text>}
            {/*@ts-ignore*/}
            {events&&events?.length>0&&events.map((item,key)=><EventItem item={item} key={key}/>)}
        </ScrollView>
    )
}
//
export default React.memo(List);
//
const style=StyleSheet.create({
    container:{
        paddingTop:10,
        flex:1,
        width:'100%'
    },
    empty:{
        width:'100%',
        textAlign:'center',
        fontSize:18,
    }
})