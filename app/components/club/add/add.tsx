import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/core";

const Add=()=>{
    const navigation:any=useNavigation();
    return (
        // @ts-ignore
        <TouchableOpacity onPress={()=>navigation.navigate('club-create')}>
            <View style={style.btn}>
                <Ionicons style={style.btn_icon} size={24}  name='add' /> 
            </View>
        </TouchableOpacity>
    );
}
// 
export default React.memo(Add);
const style=StyleSheet.create({
    btn:{
        position:'absolute',
        bottom:60,
        right:25,
        padding:15,
        backgroundColor:'#4082FF',
        borderRadius:25,
        zIndex:100,
        shadowColor:'gray',
        // Shadow for iOS
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 5,

        // Shadow for Android
        elevation: 5,

    },
    btn_icon:{
        color:'white'
    }
})