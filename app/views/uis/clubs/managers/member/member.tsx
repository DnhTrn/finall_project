import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/core";
import clubVM from "@/app/viewModels/clubVM/clubVM";
import clubApplyVM from "@/app/viewModels/clubApplyVM/clubApplyVM";
import useSettings from "@/contexts/settings/settings";
import User from "@/app/components/skeletons/user";
import Request from "@/app/components/club/items/users/request";
import SortUser from "@/app/components/club/items/users/sortUser";
import useData from "@/contexts/datas/data";

const Member=()=>{
    // @ts-ignore
    const {theme}=useSettings();
    // @ts-ignore
    const {members}=clubVM();
    const {index}=clubApplyVM();
    const [load,setLoad]=useState(true);
    const [load2,setLoad2]=useState(true);
    const {data,setData}=useData();
    const navigation:any = useNavigation();
    //
    useEffect(() => {
        const fetch=async ()=>{
            try{
                const [data1,data2]= await Promise.all([
                   members(data?.club?.id),
                   index(data?.club?.id)
                ]);
                 if(data1?.status){
                    setLoad(false);
                }
                if(data2.status){
                    setLoad2(false);
                }
                setData({...data,managers:data1?.managers,members:data1?.mems,apply:data2?.data});
            }catch (e) {
                console.log(e);
            }
        }
        fetch();
    }, []);
    //
    return (
        <ScrollView style={[{backgroundColor:theme.background.main},style.container]}>
            <View style={[{borderColor:theme.border.main},style.list]}>
                <Text style={style.title}>Managers</Text>
                {load&&<User/>}
                {!load&&data?.managers.map((item:any,key:number)=> {
                    // @ts-ignore
                    if(item?.position_id==2||item?.position_id==4){
                        return <SortUser user={item} key={key}/>
                    }
                })}
                {!load&&//@ts-ignore
                <TouchableOpacity onPress={()=>navigation.navigate('club-management-managers')} >
                    <Text>View more</Text>
                </TouchableOpacity>}
            </View>
            <View style={[{borderColor:theme.border.main},style.list]}>
                <Text style={style.title}>Join request</Text>
                {load2&&<User/>}
                {!load2&&Array.from(data?.apply).map((item,key)=> {
                    if(key<5){
                        return<Request request={item} key={key}/>
                    }
                })}
                {!load2&&//@ts-ignore
                    <TouchableOpacity onPress={()=>navigation.navigate('club-management-request')} >
                        <Text>View more</Text>
                    </TouchableOpacity>}
            </View>
            <View style={[{borderColor:theme.border.main},style.list]}>
                <Text style={style.title}>Memeber ({data?.members?.length})</Text>
                {load&&<User/>}
                {!load&&Array.from(data?.members).map((item,key)=> {
                    if(key<5){
                        return <SortUser user={item} key={key}/>
                    }
                })}
                {!load&&//@ts-ignore
                    <TouchableOpacity onPress={()=>navigation.navigate('club-management-member-list')} >
                        <Text>View more</Text>
                    </TouchableOpacity>}
            </View>
        </ScrollView>
    )
}
//
export default React.memo(Member);
//
const style =StyleSheet.create({
    container:{
        flex: 1,
        paddingVertical:10,
    },
    list:{
        width:'100%',
        flexDirection:'column',
        borderStyle:'solid',
        borderBottomWidth:1,
        paddingHorizontal:15,
        paddingVertical:10
    },
    title:{
        fontSize:22,
        marginBottom:10,
        fontWeight:'bold',
    }
})