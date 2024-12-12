import React, {useEffect, useRef} from "react";
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/core";
import EventScreen from "@/app/viewModels/viewVM/events/eventDetail";
import useData from "@/contexts/datas/data";

//
const style=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        paddingHorizontal:15,
        paddingVertical:10,
    },
    ava:{
        width:40,
        height:40,
        borderRadius:10
    },
    by:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        borderBottomWidth:.5,
        borderStyle:'solid',
        borderColor:'gray',
        paddingBottom:5
    },
    info:{
        width:'80%',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        marginLeft:10,

    },
    name:{
        fontSize:12,
    },
    name_event:{
        fontSize:14,
        width:'100%',
    },
    date:{
        fontSize:12,
    },
    content:{
        width:'100%',
        backgroundColor:'white',
        flex:1,
    },
})
const EventDetail=()=>{
    const navigator=useNavigation();
    const routes=useRoute();
    // @ts-ignore
    const {event}=routes.params;
    const {data,setData}=useData();
    useEffect(()=>{
        setData({...data,currentEvent:event});
    },[event])
    const handelClub = () => {
        // @ts-ignore
        navigator.navigate('clubs', {
            screen: 'club-detail',
            params: { club_id: event?.club_id }, // Đặt params vào một object
        });
    };

    return (
        <View style={style.container}>
            <TouchableOpacity onPress={event?.isMain?()=>{}:handelClub} style={style.by}>
                {event.isMain&&<Image  style={style.ava} source={require('../../../../../assets/images/splash-icon.png')} />}
                {!event.isMain&&!event?.ava&&<Image  style={style.ava} source={require('../../../../../assets/images/splash-icon.png')} />}
                {!event.isMain&&event?.ava&&<Image source={{uri:event?.ava}} style={style.ava} />}
                {/*@ts-ignore*/}
                <View  style={style.info}>
                    <Text numberOfLines={2} style={style.name}>{event?.by}</Text>
                    <Text numberOfLines={2} style={style.name_event}>{event?.name}</Text>
                    <Text numberOfLines={2} style={style.date}>{event?.created_at}</Text>
                </View >
            </TouchableOpacity>
            <View style={style.content}>
                <EventScreen/>
            </View>
        </View>
    )
}
//
export default React.memo(EventDetail)