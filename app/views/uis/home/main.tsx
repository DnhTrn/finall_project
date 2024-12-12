import {StyleSheet, View} from "react-native";
import React, {useEffect, useState} from "react";
import Event from "@/app/components/skeletons/event";
import EventVM from "@/app/viewModels/eventVM/eventVM";
import Sort from "@/app/components/events/sort";

const Main=()=>{
    const [data,setData]=useState(null);
    const {getMain}=EventVM();
    useEffect(() => {
        const fetch=async ()=>{
            try{
                const {status,events}=await getMain();
                if(status){
                    console.log(status);
                    console.log(events);
                    setData(events)
                }
            }catch (e) {
                console.log(e);
            }
        }
        fetch();
    }, []);
    return (
        <View style={styles.container} >
            {!data&&<Event/>}
            {/*@ts-ignore*/}
            {data&&data.map((club:any,key:number)=><Sort item={club} key={key} />)}
        </View>
    )
}
//
export default React.memo(Main);
//
const styles=StyleSheet.create({
    container:{
        width:'100%',
        justifyContent:'flex-start',
        alignItems:'flex-start',
    }
})