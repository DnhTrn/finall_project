import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {SCREEN_HEIGHT} from "@gorhom/bottom-sheet";
import {useNavigation} from "@react-navigation/core";
import useSettings from "@/contexts/settings/settings";
const style=StyleSheet.create({
    header:{
        height:SCREEN_HEIGHT*0.05,
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:20,
        paddingVertical:10,
        alignItems:'flex-end',
    },
    titleZone:{
        flexDirection:'row',
        alignItems:'center',
    },
    title:{
        fontSize:18,
        marginRight:10,
        fontWeight:'800'
    },
    back:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    back_title:{
        marginHorizontal:5,
        fontSize:16,
        fontWeight:'800',
        color:'#4082FF',
    }
    ,
    avata:{
        height:35,
        width:35,
        marginRight:10,
        borderRadius:20,
    }
})
const Header=({text,avata=true,search=true,back=false}:any)=>{
    const navigation:any=useNavigation();
    const {theme}=useSettings();
    const searchHandle:any=()=>{
        // @ts-ignore
        navigation.navigate('search');
    }
    const goBack:any=()=>{
        navigation.goBack();
    }
    const profileHandle:any=()=>{
        navigation.navigate('profile');
    }
    return(
        <View style={style.header}>
            <View style={style.titleZone}>
                {back&&<TouchableOpacity style={style.back} onPress={() => goBack(navigation)}>
                    <Ionicons name={'chevron-back-outline'} size={30} color={theme.icon.main}/>
                    <Text style={style.back_title} >Back</Text>
                </TouchableOpacity>}
                {avata&&<TouchableOpacity onPress={() => profileHandle(navigation)}>
                    <Image style={style.avata} source={require('../../../../assets/images/splash-icon.png')}
                           resizeMode="cover"/>
                </TouchableOpacity>}
                <Text style={style.title} >{text}</Text>
            </View>
            {search&&<TouchableOpacity onPress={() => searchHandle(navigation)}>
                <Ionicons name='search-outline' size={24}/>
            </TouchableOpacity>}
        </View>
    );
}
//
export default React.memo(Header);
//
