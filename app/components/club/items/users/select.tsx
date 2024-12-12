import {StyleSheet, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import SortUser from "@/app/components/club/items/users/sortUser";
import useSettings from "@/contexts/settings/settings";

/**
 *
 * @param user is a user data
 * @param choose is array of user had selected
 * @param set is a function to add or remove user form array
 * @param SetIsChoose is function to change status of isChoose
 * @constructor
 */
const Select=({user,choose,set,index,isChoose=false,setIsChoose}:any)=>{
    // console.log('user:');
    const [check,setCheck]=useState(false);
    const {theme}=useSettings();
    // listion isChoose change event
    useEffect(()=>{
        setCheck(isChoose)
    },[isChoose])
    //
    useEffect(() => {
        if(check){
            if(!choose.includes(user)){
                set([...choose,user]);
            }
            return;
        }
        const temp=choose.filter((item:any)=>item!=user)
        set(temp);
    }, [check]);
    return (
        <TouchableOpacity key={index} onPress={()=>setCheck(!check)} style={style.container}>
            <View style={[{borderColor:theme.border.second},style.check]}>
                {check&&<View style={[{backgroundColor: theme.icon.main}, style.checked]}/>}
            </View>
            <SortUser user={user} check={false} set={()=>setCheck(!check)}/>
        </TouchableOpacity>
    )
}
//
export default React.memo(Select);
//
const style=StyleSheet.create({
    container:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
    },
    check:{
        width:20,
        height:20,
        borderRadius:5,
        borderStyle:'solid',
        borderWidth:1,
        marginRight:5
    },
    checked:{
        width:16,
        height:16,
        margin:1,
        borderRadius:5
    }
})