import React, {useEffect, useState} from "react";
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import useSettings from "@/contexts/settings/settings";
import {useNavigation, useRoute} from "@react-navigation/core";
import FullEvent from "@/app/components/skeletons/fullEvent";
import EventVM from "@/app/viewModels/eventVM/eventVM";
import State from "@/app/views/uis/clubs/managers/events/content/state";
import checkProcess from "@/constants/handles/checkProcess";
import statusState from "@/constants/handles/status";
import Swiper from "react-native-swiper";
import File from "@/app/components/orthers/file/file";
import confirmAlert from "@/app/components/orthers/alert/confirm";
import showAlert from "@/app/components/orthers/alert/alert";
import Progress from "@/app/views/uis/clubs/managers/events/chart/progress";
import User from "@/app/components/skeletons/user";
import Joined from "@/app/components/club/items/users/joined";
const EventManagerDetail=()=>{
    const navigator=useNavigation();
    const {theme,setLoad,lang}=useSettings();
    const [reload,setReload]=useState(true);
    const route=useRoute();
    const [check,setCheck]=useState(false);
    const [tempStatus,setTempStatus]=useState(0);
    const [temppProgress,setTemppProgress]=useState(0);
    const [data,setData]=useState();
    const navigation=useNavigation();
    // @ts-ignore
    const {id}=route.params;
    const [event,setEvents]=useState(null);
    const {detail,quickChange,deleteEvent,getMembers}=EventVM();
    const [members,setMembers]=useState(null);
    // lay thong tin su kien
    useEffect(() => {
        const fetch=async ()=>{
            try{
                const {status,event:res}=await detail(id);
                if(status) {
                    setEvents(res);
                    setTempStatus(res.status??0);
                    setTemppProgress(res.progress??0)
                };
            }catch (e) {
                console.log('UI: '+e);
            }
        }
        if(reload){
            fetch();
            setReload(false);
        }
    }, [reload]);
    // 
    useEffect(() => {
        const fetch=async ()=>{
            try{
                const {status,members:res}=await getMembers(id,false);
                if (!status){
                    // @ts-ignore
                    setMembers([]);
                    return;
                }
                setMembers(res);
            }catch (e) {
                console.log('UI: '+e);
            }
        }
        fetch();
    }, [event]);
    // cap nhat trang thai va tien trinh su kien
    useEffect(() => {
        let status=tempStatus?1:0;
        status=temppProgress>=95?0:status;
        // @ts-ignore
        setData({id:id,status:status,progress:temppProgress});
    }, [tempStatus,temppProgress]);
    //
    const handle=async ()=>{
        try{
            setLoad(true);
            const {status}=await quickChange(data);
            setLoad(false);
            if(status){
                setCheck(false);
                setReload(true);
            }
        }catch (e) {
            console.log('UI: '+e);
        }
    }
    const save=async ()=>{
        // @ts-ignore
        if(data?.progress>=95){
            const messages={
                status:lang.notification.status,
                message:'Note that when the Event reaches completion, it will automatically close and cannot be changed afterward.',
                cancel:'Cancel',
                success:'Save'
            }
            confirmAlert(messages,handle)
            return;
        }
        handle()
    }
    //
    const del=async ()=>{
        try{
            setLoad(true);
            const {status,message}=await deleteEvent(id);
            setLoad(false);
            if(!status){
                const mes={status:lang.notification.status,message:lang.notification.message.error[message]};
                showAlert(mes);
                return;
            }
        }catch (e) {
            console.log('VM: '+e);
            return {status:false}
        }
    }
    const handleDel=()=>{
        const messages={
            status:lang.notification.status,
            message:'Are you sure you want to delete this event.',
            cancel:'Cancel',
            success:'Delete'
        }
        confirmAlert(messages,del)
    }
    return (
        <View style={{flex:1,backgroundColor:theme.background.main,paddingHorizontal:15,paddingTop:10}}>
            {!event&&<FullEvent />}
            {event&&<ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
                <View style={style.by}>
                    {/*@ts-ignore*/}
                    <Text style={style.name_event}>Event name: {event?.name}</Text>
                    {/*@ts-ignore*/}
                    {event?.pre_name&&<TouchableOpacity onPress={()=>navigation.navigate('event-detail',{id:event?.pre_id})} style={{width:'100%'}}>
                        {/*@ts-ignore*/}
                        <Text style={style.pre_name}>Main event name: {event?.name}</Text>
                    </TouchableOpacity>}
                    {/*@ts-ignore*/}
                    <Text numberOfLines={2} style={style.date}>Created at: {event?.created_at}</Text>
                    {/*@ts-ignore*/}
                    <Text style={style.main_content}>Short description: {event?.sort_description}</Text>
                    {!check&&<View style={style.info}>
                        {/*@ts-ignore*/}
                        {event?.progress>0&&<View style={style.state}>
                            <Text style={style.state_text}>Status:</Text>
                            {/*@ts-ignore*/}
                            <Text numberOfLines={2} style={[{backgroundColor: theme.status[event?.status ?? 0]}, style.state_value]}>{statusState[event?.status]}</Text>
                        </View>}
                        <View style={style.state}>
                            <Text style={style.state_text} >Process:</Text>
                            {/*@ts-ignore*/}
                            <Text numberOfLines={2} style={[{backgroundColor: theme.progress[checkProcess(event?.progress).state]}, style.state_value]}>{checkProcess(event?.progress).status}</Text>
                        </View>
                        {/*@ts-ignore*/}
                    </View>}
                    {check&&<State event={event} status={tempStatus} setStatus={setTempStatus} process={temppProgress} setProcess={setTemppProgress}/>}
                    {/*@ts-ignore*/}
                    {event?.progress>=95&&<Text style={[{backgroundColor:theme.icon.th3},style.btn]}>Done</Text>}
                    {/*@ts-ignore*/}
                    {event?.progress>0&&event?.progress<95&&!check&&<TouchableOpacity onPress={()=>setCheck(true)} style={[{backgroundColor:theme.icon.main},style.btn]}>
                        <Text style={style.btn_text}>Change status</Text>
                    </TouchableOpacity>}
                    {/*@ts-ignore*/}
                    {event?.progress>0&&event?.progress<95&&check&&<View style={style.btn_wrap}>
                        <TouchableOpacity style={[{backgroundColor:theme.icon.th3},style.btn_2]} onPress={()=>setCheck(false)}>
                            <Text style={style.btn_text}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={save} style={[{backgroundColor:theme.icon.main},style.btn_2]}>
                            <Text style={style.btn_text}>Save</Text>
                        </TouchableOpacity>
                    </View>}
                </View>
                <View style={style.content}>
                    {/*@ts-ignore*/}
                    {event?.progress >= 95 &&<Progress event={event}/>}
                    <Text style={style.main_content}>Full description:</Text>
                    {/*@ts-ignore*/}
                    <Text style={style.main_content}>{event?.full_description}</Text>
                    <View style={style.start}>
                        {/*@ts-ignore*/}
                        <Text numberOfLines={2} style={style.date}>Start at: {event?.start_at}</Text>
                        {/*@ts-ignore*/}
                        <Text  numberOfLines={2} style={[{marginLeft:5},style.date]}>End at: {event?.end_at}</Text>
                    </View>
                    {/*@ts-ignore*/}
                    {event?.imgs&&event?.imgs.length>0&&<Swiper style={style.slide} autoplay={true}
                                                              autoplayTimeout={5}
                                                              loop={true}
                                                              showsPagination={true}
                                                              showsButtons={false}>
                        {/*@ts-ignore*/}
                        {event?.imgs.map((item:any,i:any)=><Image key={i} style={style.img} source={{uri:item}} />)}
                    </Swiper>}
                    {/*@ts-ignore*/}
                    {event?.files&&event?.files.length>0&&event?.files.map((item:any,key:any)=><File url={item} key={key}/>)}
                    <Text style={style.main_content}>Members joined:</Text>
                    {!members&&<User/>}
                    {/*@ts-ignore*/}
                    {members&&members?.length==0&&<Text style={style.mem_text}>The event has no participants yet.</Text>}
                    {/*@ts-ignore*/}
                    {members&&members?.length!=0&&members.map((user,key)=>{
                        if (key<5){
                            {/*@ts-ignore*/}
                            return <Joined check={event?.progress>=95?1:0} user={user} key={key}/>
                        }
                    })}
                    {/*@ts-ignore*/}
                    {members&&members?.length>5&&<TouchableOpacity onPress={()=>navigator.navigate('event-manager-joined',{data:members,check:event.progress>=95?1:0})}>
                        <Text>View more</Text>
                    </TouchableOpacity>}
                </View>
            </ScrollView>}
            {event&&<View style={style.button}>
                {/*@ts-ignore*/}
                {event?.progress >= 95 &&
                    <Text style={[{backgroundColor: theme.icon.th3}, style.button_btn]}>Done</Text>}
                {/*@ts-ignore*/}
                {event?.progress <1&&<TouchableOpacity onPress={handleDel} style={[{backgroundColor: theme.icon.th3}, style.button_btn2]}>
                    <Text style={style.btn_text}>Delete</Text>
                </TouchableOpacity>}
                {/*@ts-ignore*/}
                {(event?.progress == 0||(event?.progress < 95&&!event?.pre_id))&&<TouchableOpacity onPress={()=>navigation.navigate('event-manager-edit',{id:event?.id})} style={[{backgroundColor: theme.icon.main}, style.button_btn2]}>
                        <Text style={style.btn_text}>Edit</Text>
                    </TouchableOpacity>}
                {/*@ts-ignore*/}
                {event?.progress >= 35 &&event?.progress < 95 &&
                    <TouchableOpacity style={[{backgroundColor: theme.icon.main}, style.button_btn2]}>
                        <Text style={style.btn_text}>Get Attendance code</Text>
                    </TouchableOpacity>}
            </View>}
        </View>
    )
}
//
export default React.memo(EventManagerDetail);
const style=StyleSheet.create({
    button:{
      width:'100%',
        justifyContent:'space-between',
        alignItems:'flex-start',
        flexDirection:'row'
    },
    button_btn:{
        marginTop:5,
        width:'100%',
        color:'white',
        paddingVertical:10,
        fontSize:14,
        paddingHorizontal:15,
        textAlign:'center',
        borderRadius:5
    },
    pre_name:{
      fontSize:14
    },
    button_btn2:{
        marginTop:5,
        width:'48%',
        color:'white',
        paddingVertical:10,
        fontSize:14,
        paddingHorizontal:15,
        textAlign:'center',
        borderRadius:5
    },
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
        justifyContent:'flex-start',
        alignItems:'flex-start',
        borderBottomWidth:.5,
        borderStyle:'solid',
        borderColor:'gray',
        paddingBottom:5
    },
    info:{
        marginTop:5,
        width:'100%',
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:"row",
    },
    status:{
        width:'50%',
        justifyContent:'flex-start',
        alignItems:'flex-start',
    },
    state_text:{
      fontSize:16
    },
    state:{
        marginBottom:5,
        marginRight:5,
      justifyContent:'flex-start',
      alignItems:'center',
      flexDirection:'row',
    },
    state_value:{
        color:'white',
      paddingVertical:5,
        fontSize:12,
      paddingHorizontal:15,
        marginLeft:5,
      textAlign:'center',
      borderRadius:7
    },
    btn:{
        marginTop:5,
        width:'100%',
        color:'white',
        paddingVertical:5,
        fontSize:14,
        paddingHorizontal:15,
        textAlign:'center',
        borderRadius:5
    },
    btn_wrap:{
        width:'100%',
        textAlign:'center',
        justifyContent:'space-between',
        flexDirection:'row',
    },
    btn_2:{
        marginTop:5,
        width:'48%',
        color:'white',
        paddingVertical:5,
        fontSize:14,
        paddingHorizontal:15,
        textAlign:'center',
        borderRadius:5
    },
    btn_text:{
        color:'white',
        fontSize:14,
        textAlign:'center'
    },
    name:{
        fontSize:12,
    },
    name_event:{
        fontSize:16,
        width:'100%',
    },
    date:{
        fontSize:12,
    },
    content:{
        width:'100%',
        paddingBottom:25,
        backgroundColor:'white',
        flex:1,
    },
    main_content:{
        fontSize:14,
        marginBottom:5
    },
    slide:{
        height:225,
    },
    img:{
        marginTop:5,
        width:'100%',
        height:200,
        borderRadius:10
    },
    start:{
        width:'100%',
        marginVertical:5,
        alignItems:'center',
        justifyContent:'flex-start',
        flexDirection:'row'
    },
    text_btn:{
        textAlign:'center',
        fontSize:16,
    },
    sub_event:{
        width:'100%',
        borderTopWidth:0.5,
        borderStyle:'solid',
        paddingTop:10
    },
    sub_title:{
        fontSize:14,
    },
    mem_text:{
        width:'100%',
        textAlign:'center'
    }
})