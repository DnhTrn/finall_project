import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Entypo, Octicons} from "@expo/vector-icons";
import React from "react";
import {useNavigation} from "@react-navigation/core";
import useSettings from "@/contexts/settings/settings";
import useData from "@/contexts/datas/data";

const Head=({set}:any)=>{
    //@ts-ignore
    const {theme}=useSettings();
    const {data}=useData();
    const navigation = useNavigation();
    return (
        <View style={[{backgroundColor:theme.background.main},style.container]}>
            <Image style={style.club_image} source={{uri:data?.club?.wallpaper}} resizeMode={'cover'}/>
            <Text style={style.name}>{data?.club?.name}</Text>
            <View style={style.short_info}>
                <Text style={style.short_info_text}>Members: <Text style={style.short_info_text_strong}>{data?.club.members}</Text> members</Text>
                <Text style={style.short_info_text}>Events: <Text style={style.short_info_text_strong}>{data?.club.events}</Text> events</Text>
            </View>

            <View style={style.action}>
                {
                    // @ts-ignore
                    !data?.isMember&&!data?.isRequest&&<TouchableOpacity  onPress={()=>navigation.navigate('club-policy',{club:data?.club})}
                                                                          style={[{backgroundColor:theme.icon.main},style.action_join]}>
                        <Text  style={[{color:theme.text.th3},style.join_text]}>Join</Text>
                    </TouchableOpacity>
                }
                {
                    !data?.isMember&&data?.isRequest&&<TouchableOpacity onPress={()=>{set(true)}}
                    style={[{backgroundColor:theme.icon.th3},style.action_btn]}>
                        <Octicons style={{color:theme.text.th3}} name={'people'} size={16}/>
                        <Text  style={[{color:theme.text.th3},style.btn_text]}>Asked</Text>
                        <Entypo style={{color:theme.text.th3}} name={'chevron-down'} size={16}/>
                    </TouchableOpacity>
                }
                {
                    data?.isMember&&<TouchableOpacity onPress={()=>set(true)} style={[style.action_btn,style.join]}>
                        <Octicons name={'people'} size={16}/>
                        <Text  style={style.btn_text}>Had joined</Text>
                        <Entypo name={'chevron-down'} size={16}/>
                    </TouchableOpacity>
                }
                {
                    // @ts-ignore*
                    data?.isManager&&<TouchableOpacity onPress={()=>navigation.navigate('club-management')} style={[style.action_btn,style.add]}>
                        <Entypo name={'ruler'} size={16} style={style.btn_add_text} />
                        <Text style={[style.btn_text,style.btn_add_text]}>Management</Text>
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}
//
const style=StyleSheet.create({
    container:{
        flex: 1,
        width:'100%',
    },
    club_image:{
        width:'100%',
        height:225,
    },
    name:{
        fontSize:28,
        paddingHorizontal:15,
        fontWeight:'800',
        marginVertical:5
    },
    short_info:{
        width:'100%',
        paddingHorizontal:15,
        flexDirection:'row',
    },
    short_info_text:{
        fontSize:14,
        color:'gray',
        marginRight:15
    },
    short_info_text_strong:{
        fontWeight:'bold',
        color:'black'
    },
    action:{
        flexDirection:'row',
        width:'100%',
        marginVertical:10,
        paddingHorizontal:15,
        paddingBottom:10,
        borderColor:'#eeeeee',
        borderBottomWidth:5,
        borderStyle:'solid',
        justifyContent:'space-between',
    },
    action_btn:{
        width:'48%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:10,
        borderRadius:10,
    },
    action_join:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:10,
        borderRadius:10,
    },
    join_text:{
        textAlign:'center',
    },
    btn_text:{
        marginHorizontal:10
    },
    btn_add_text:{
        color:'white'
    },
    join:{
        backgroundColor:'#dddddd'
    },
    add:{
        backgroundColor:'#4082FF'
    },
    list:{
        width:'100%',
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        borderColor:'#eeeeee',
        borderStyle:'solid',
        borderTopWidth:5
    },
})
//
export default React.memo(Head);
//