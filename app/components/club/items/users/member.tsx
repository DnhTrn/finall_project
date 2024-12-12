import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/core";
import React from "react";
import useSettings from "@/contexts/settings/settings";
import useData from "@/contexts/datas/data";

const Member=({user}:any)=>{
// @ts-ignore
    const {theme}=useSettings();
    const {data}=useData();
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={(e)=> {
            // @ts-ignore
            navigation.navigate('user-infor',{user:user})
        }} style={style.container}>
            {user?.avatar&&<Image style={style.avatar} source={{uri:user?.avatar}} resizeMode={'cover'} />}
            {!user?.avatar&&<Image style={style.avatar} source={require('../../../../../assets/images/adaptive-icon.png')}
                    resizeMode={'cover'}/>}
            <View style={style.content}>
                <Text style={[{color:theme.text.main},style.name]} >{user?.name??'User name!'}</Text>
                <Text style={[{color:theme.text.main},style.email]} >{user?.email??'User email!'}</Text>
                {data?.currentEvent?.isMain&&<Text style={[{color: theme.text.main}, style.email]}>{user?.event ?? 'Event name'}</Text>}
            </View>
        </TouchableOpacity>
    )
}
const style=StyleSheet.create({
    container:{
        width:'75%',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        marginBottom:10
    },
    avatar:{
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
    email:{
        fontSize:14,
    },
    duty:{
        fontSize:12,
    }
});
//
export default React.memo(Member)