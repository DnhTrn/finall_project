import {Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View} from "react-native";
import Swiper from "react-native-swiper";
import File from "@/app/components/orthers/file/file";
import React from "react";
import Subevent from "@/app/views/uis/event/detail/subevent";
import useSettings from "@/contexts/settings/settings";
import useData from "@/contexts/datas/data";
import EventAction from "@/app/views/uis/event/detail/action";
import {useRoute} from "@react-navigation/core";

const EventContent=()=>{
    const {theme}=useSettings();
    const route=useRoute();
    //@ts-ignore
    const {data}=route.params;
    return (
        <KeyboardAvoidingView style={{flex: 1}}
                              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                              keyboardVerticalOffset={Platform.OS === 'ios' ? 200 : 0}>
            <ScrollView style={style.content}>
                <Text style={style.main_content}>{data?.full_description}</Text>
                <View style={style.start}>
                    <Text numberOfLines={2} style={style.date}>Start at: {data?.start_at}</Text>
                    <Text  numberOfLines={2} style={[{marginLeft:5},style.date]}>End at: {data?.end_at}</Text>
                </View>
                {data?.imgs&&data?.imgs.length>0&&<Swiper style={style.slide} autoplay={true}
                   autoplayTimeout={5}
                   loop={true}
                   showsPagination={true}
                   showsButtons={false}>
                    {data?.imgs.map((item:any,i:any)=><Image key={i} style={style.img} source={{uri:item}} />)}
                </Swiper>}
                {data?.files&&data?.files.length>0&&
                    data?.files.map((item:any,key:any)=><File url={item} key={key}/>)
                }
                {data?.isMain&&<View style={[{borderColor:theme.border.main},style.sub_event]}>
                    <Text style={style.sub_title}>Sub event</Text>
                    <Subevent id={data?.id} />
                </View>}
                {data&&!data?.isMain&&<View style={[{borderColor:theme.border.main},style.sub_event]}>
                    <EventAction data={data} />
                </View>}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
const style=StyleSheet.create({
    date:{
        fontSize:12,
    },
    content:{
        backgroundColor:'white',
        width:'100%',
    },
    main_content:{
        fontSize:14,
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
    btn:{
        width:'100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor:'white',
        marginBottom:10,
        borderRadius:10,
        paddingHorizontal:15,
        paddingVertical:10,
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
    }
})
//
export default React.memo(  EventContent);