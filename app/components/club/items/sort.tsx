import React from "react";
import {Image, Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/core";
import useSettings from "@/contexts/settings/settings";

const Sort=({club,choose,set}:any)=>{
    const navigation=useNavigation();
    // @ts-ignore
    const {theme}=useSettings();
    return (
        <TouchableOpacity onPress={()=>{
            choose();
            set(true);
        }}>
            <View style={style.item} >
                <Image style={style.logo} resizeMode="cover" source={{uri:club.wallpaper}} />
                <View style={style.content} >
                    <Text numberOfLines={2} style={style.name} >{club.name}</Text>
                    <Text numberOfLines={3} style={style.description} >{club.sort_description}</Text>
                    <View style={style.count} >
                        <Text style={[style.count_content,style.member]} >Members:{club.members}</Text>
                        <Text style={style.count_content} >Events:{club.events}</Text>
                    </View>
                    {
                        !club.check&&
                        <Pressable style={({pressed}) => [
                            style.btn,
                            {backgroundColor:theme.icon.main},
                            {opacity: pressed ? 0.5 : 1}
                        ]} onPress={() => {
                            // @ts-ignore
                            navigation.navigate('club-policy',{club:club})}}>
                            <Text style={style.btn_text}>Join</Text>
                        </Pressable>
                    }
                    {club.check&&<Pressable style={({pressed}) => [
                        style.btn,
                        {backgroundColor:theme.icon.th3},
                        {opacity: pressed ? 0.5 : 1}
                    ]} onPress={() => {
                        // @ts-ignore
                        navigation.navigate('club-detail',{club_id:club.id})}}>
                        <Text style={style.btn_text}>View</Text>
                    </Pressable>
                    }
                </View>
            </View>
        </TouchableOpacity>

    )
}
//
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
        fontWeight:800,
    },
    description:{
        marginVertical:5,
        fontSize:14,
        color:'gray',
    },
    count:{
        flexDirection:'row',
        width:'100%'
    },
    count_content:{
        fontSize:12,
        color:'gray',
    },
    member:{
        marginRight:10
    },
    btn:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        textAlign:"center",
        width:'100%',
        borderRadius:10,
        paddingHorizontal:5,
        paddingVertical:10,
        marginTop:10
    },
    btn_text:{
        fontSize:16,
        fontWeight:800,
        color:'white'
    }
})
//
export default React.memo(Sort);