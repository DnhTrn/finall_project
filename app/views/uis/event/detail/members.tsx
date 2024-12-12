import {ScrollView, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import User from "@/app/components/skeletons/user";
import useSettings from "@/contexts/settings/settings";
import EventVM from "@/app/viewModels/eventVM/eventVM";
import useData from "@/contexts/datas/data";
import SortUser from "@/app/components/club/items/users/sortUser";
import Member from "@/app/components/club/items/users/member";

const EventMember=()=>{
    const {data,setData} = useData();
    const [load,setLoad]=useState(true);
    const [members,setMembers]=useState([]);
    const {theme}=useSettings();
    const {getMembers}=EventVM();
    useEffect(()=>{
        const fetch=async ()=>{
            try{
                const {status,members}=await getMembers(data?.currentEvent?.id,data?.currentEvent?.isMain);
                console.log(members)
                setLoad(false);
                if (status){
                    setMembers(members);
                    return;
                }
                setMembers([]);

            }catch (e) {
                console.log('UI: '+e);
            }
        }
        fetch()
    },[data])
    return (
        <View style={[{backgroundColor:theme.background.main},style.container]}>
            {load&&<User/>}
            {!load&&<ScrollView style={style.content}>
                {members.length==0&&<Text style={style.empty}>This event currently has no participants.</Text>}
                {members.length!=0&&members.map((item,key)=><Member user={item} key={key}/>)}
            </ScrollView>}
        </View>
    )
}
//
export default React.memo(EventMember);
//
const style=StyleSheet.create({
    container:{
      flex:1,
        paddingTop:10
    },
    content:{
      width:'100%',
    },
    empty:{
        textAlign:'center',
        width:'100%',
        fontSize:14
    }
})