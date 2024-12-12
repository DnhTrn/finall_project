import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {useNavigation} from "@react-navigation/core";
import useSettings from "@/contexts/settings/settings";

const ShortUser = ({user,index,check=true,set}:any)=>{
    // @ts-ignore
    const {theme}=useSettings();
    const navigation = useNavigation();
    let status='';
    switch(user.position_id){
        case 0:
            status='Supper admin';
            break;
        case 1:
            status='Amin';
            break;
        case 2:
            status='Master';
            break;
        case 3:
            status='Sub master';
            break;
        case 4:
            status='Lecture';
            break;
        default:
            status='Member';
    }
    return (
        <TouchableOpacity key={index} onPress={(e)=> {
            !check&&set();
            // @ts-ignore
            check && navigation.navigate('user-infor',{user:user})
        }} style={style.container}>
            <Image style={style.avata} source={require('../../../../../assets/images/adaptive-icon.png')} resizeMode={'cover'} />
            <View style={style.content}>
                <Text style={[{color:theme.text.main},style.name]} >{user?.name??'User name!'}</Text>
                <Text style={[{color:theme.text.second},style.duty]}>{status}</Text>
            </View>
        </TouchableOpacity>
    )
}
//
export default  React.memo(ShortUser);
//
const style=StyleSheet.create({
    container:{
        width:'75%',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        marginBottom:10
    },
    avata:{
        width:50,
        height:50,
        borderRadius:25,
    },
    content:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'flex-start',
        marginLeft:10
    },
    name:{
        fontSize:16,
        fontWeight:'bold',
    },
    duty:{
        fontSize:12,
    }
})