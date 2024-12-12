import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/core";
import formatDate from "@/constants/handles/formatDate";
import useSettings from "@/contexts/settings/settings";

const Requested=({club,choose,set}:any)=>{
    const navigation = useNavigation();
    const {theme,lang}=useSettings();
    let status=lang.status.register[club.status];
    return (
        <TouchableOpacity onPress={()=>{
            // @ts-ignore
            navigation.navigate('club-request-detail',{club_id:club.id});
        }}>
            <View style={style.item} >
                <Image style={style.logo} resizeMode="cover" source={{uri:club.wallpaper}} />
                <View style={style.content} >
                    <Text numberOfLines={2} style={style.name} >{lang.register_detail.name} {club.name}</Text>
                    <Text style={[style.status]} >{lang.status.title} {status}</Text>
                    <Text style={style.date} >{lang.register_detail.create} {formatDate(club.created_at)}</Text>
                </View>
            </View>
        </TouchableOpacity>

    )
}
const style=StyleSheet.create({
    item:{
        flex:1,
        flexDirection:'row',
        marginVertical:10,
        marginHorizontal:15,
        justifyContent:'space-between',
        alignItems:'flex-start',
        backgroundColor:'white',
        padding:15,
        borderRadius:10
    },
    logo:{
        width:75,
        height:75,
        borderRadius:25
    },
    //
    content:{
        flex:1,
        paddingHorizontal:20,
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'flex-start',
    },
    name:{
        fontSize:18,
        fontWeight:600,
    },
    status:{
        marginVertical:5,
        fontSize:14,
        color:'gray',
    },
    date:{
        fontSize:12,
        color:'gray',
    }
})
//
export default React.memo(Requested);