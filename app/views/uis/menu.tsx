import React from "react";
import {ScrollView, StyleSheet, Text, TouchableOpacity} from "react-native";
import useSettings from "@/contexts/settings/settings";
import {AntDesign, Entypo, Feather, FontAwesome5, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import AuthVM from "@/app/viewModels/authVM/authVM";
import confirmAlert from "@/app/components/orthers/alert/confirm";
import {useNavigation} from "@react-navigation/core";

const Menu=()=>{
    const {theme,setLoad,lang}=useSettings();
    const navigation:any=useNavigation();
    const {logout}=AuthVM();
    const handleLogout=async ()=>{
        setLoad(true);
        const check= await logout();
        setLoad(false);
        if(check)navigation.navigate('home');
    }
    const handleConfirm=()=>{
        const  messages={
            status:lang.notification.status,
            message:'You confirm you want to sign out of your current account!',
            cancel:'Cancel',
            success:'Logout'
        }
        confirmAlert(messages,handleLogout);
    }
    return (
        <ScrollView style={[{backgroundColor:theme.background.main},style.container]}>
            <TouchableOpacity style={style.btn}>
                <Text style={style.btn_text}>Profile</Text>
                <AntDesign name="profile" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={style.btn}>
                <Text style={style.btn_text}>Account</Text>
                <MaterialCommunityIcons name="shield-account-outline" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={style.btn}>
                <Text style={style.btn_text}>Events joined</Text>
                <FontAwesome5 name="tasks" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={style.btn}>
                <Text style={style.btn_text}>Tern and Policy</Text>
                <Feather name="bookmark" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={style.btn}>
                <Text style={style.btn_text}>Help center</Text>
                <Ionicons name="help-circle-outline" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleConfirm} style={style.btn}>
                <Text style={style.btn_text}>Logout</Text>
                <Feather name="log-out" size={24} color="black" />
            </TouchableOpacity>
        </ScrollView>
    )
};
export default React.memo(Menu);
//
const style=StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal:15,
        paddingTop:25
    },
    btn:{
        width:'100%',
        flexDirection:'row',
        paddingVertical:15,
        paddingHorizontal:25,
        borderRadius:10,
        justifyContent:'flex-start',
        alignItems:'center',
        borderWidth:0.5,
        marginBottom:10
    },
    btn_text:{
        fontSize:16,
        fontWeight:'bold',
        marginRight:10
    }

})