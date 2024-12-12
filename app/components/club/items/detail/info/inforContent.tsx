import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {Ionicons} from "@expo/vector-icons";
import formatDate from "@/constants/handles/formatDate";
import File from "@/app/components/orthers/file/file";
import useSettings from "@/contexts/settings/settings";
import useData from "@/contexts/datas/data";

const InforContent=()=>{
       //  @ts-ignore
        const {data}=useData();
       const {theme}=useSettings();
        return (
        <View style={style.container}>
                <View style={style.content}>
                        <Text style={style.title}>About</Text>
                        <Text style={{color:theme.text.main}}>{data?.club?.full_description}</Text>
                </View>
                <Text style={style.about_title} >Club action</Text>
                <View style={style.about_line}>
                    <Ionicons name="create-outline" size={18} />
                    <Text style={style.about_line_text}>{data?.club?.events} events a crated</Text>
                </View>
                <View style={style.about_line}>
                    <Ionicons name="people-outline" size={18} />
                    <Text style={style.about_line_text}>{data?.club?.members} members in this club</Text>
                </View>
                <View style={style.about_line}>
                    <Ionicons name="calendar-outline" size={18} />
                    <Text style={style.about_line_text}>Created at {formatDate(data?.club?.created_at)}</Text>
                </View>
                <Text style={[{color:theme.text.second},style.note]}>To know tern and regular you can read the tern and regular file</Text>
                {
                    data?.club?.tern&&<View style={style.content}>
                        <Text style={style.title}>Club Tern</Text>
                        <File url={data?.club?.tern}/>
                    </View>
                }
                {
                    data?.club?.regular&&<View style={style.content}>
                        <Text style={style.title}>Regular</Text>
                        <File url={data?.club?.regular}/>
                    </View>
                }

        </View>
    )
}
//
const style =StyleSheet.create({
        container:{
                flex:1,
                padding:15
        },
        note:{
                fontSize:16,
                marginBottom:10,
        },
        content:{
          flexDirection:'column',
          justifyContent:'flex-start',
          alignItems:'flex-start',
          marginBottom:10
        },
        title:{
                fontSize:18,
                fontWeight:'bold'
        },
        about_title:{
            fontSize:18,
            fontWeight:'700'
        },
        about_line:{
            width:'100%',
            flexDirection:'row',
            justifyContent:'flex-start',
            alignItems:'center',
            marginVertical:5
        },
        about_line_text:{
            fontSize:16,
            marginLeft:10
        },
})
//
export default React.memo(InforContent);