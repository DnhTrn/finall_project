import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {Feather} from "@expo/vector-icons";
import React from "react";
import {useRoute} from "@react-navigation/core";
import useSettings from "@/contexts/settings/settings";

const UserInfor=()=>{
    // @ts-ignore
    const {theme}=useSettings();
    const routes:any=useRoute();
    const {user}=routes.params;
    return (
        <ScrollView style={[{backgroundColor:theme.background.main},style.container]}>
            <View style={[{borderColor:theme.border.main},style.head]}>
                <Image style={style.avata} source={require('../../../../../assets/images/adaptive-icon.png')}/>
                <View style={style.content}>
                    <Text style={style.name}>{user?.name??"User name"}</Text>
                    <Text>{user?.student??"Not set"}</Text>
                    <Text>{user?.major??"Not set"}</Text>
                </View>

            </View>
            {/*<Text style={style.join}>Join at: {user?.join_at}</Text>*/}
            <View style={[{borderColor:theme.border.main},style.contact]}>
                <Text style={style.title}>Contact</Text>
                <View style={style.item}>
                    <Feather name={'mail'} size={18} />
                    <Text style={style.item_text}>{user?.email??"Not set"}</Text>
                </View>
                <View style={style.item}>
                    <Feather name={'phone'} size={18} />
                    <Text style={style.item_text}>{user?.phone??"Not set"}</Text>
                </View>
            </View>
        </ScrollView>
    )
}
//
const style=StyleSheet.create({
    container:{
        flex: 1,
    },
    head:{
        width:'100%',
        paddingHorizontal:15,
        paddingTop:15,
        height:100,
        borderBottomWidth:1,
        borderStyle:"solid",
        flexDirection:'row',
    },
    avata:{
        width:70,
        height:70,
        borderRadius:30,
    },
    content:{
        width:'80%',
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        marginLeft:10
    },
    name:{
        fontSize:24,
        fontWeight:'bold',
    },
    join:{
        fontSize:16,
        paddingVertical:10,
        paddingHorizontal:15
    },
    contact:{
        borderStyle:'solid',
        borderTopWidth:1,
        paddingHorizontal:15,
        paddingTop:10
    },
    title:{
        fontSize:16,
        fontWeight:'bold',
        marginBottom:10
    },
    item:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        marginBottom:10
    },
    item_text:{
        marginLeft:10
    }
})
//
export  default React.memo(UserInfor)