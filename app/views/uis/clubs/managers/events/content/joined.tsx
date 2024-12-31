import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Search from "@/app/components/orthers/input/search";
import React, {useEffect, useState} from "react";
import {useRoute} from "@react-navigation/core";
import useSettings from "@/contexts/settings/settings";
import {Entypo} from "@expo/vector-icons";
import Joined from "@/app/components/club/items/users/joined";

const JoinedEvent=()=>{
    const {theme,setLoad}=useSettings();
    const [fill,setFill]=useState(0);
    const [show,setShow]=useState(false);
    const fillValue={
        0:'Default',
        1:'Attendance',
        2:'Missing'
    }
    // @ts-ignore
    const route=useRoute();
    const {data,check}:any=route.params;
    const [value,setValue]=useState('');
    const [search,setSearch]=useState(data);
    // trigger khi thay doi fill
    useEffect(() => {
        if (fill==0&&value==''){
            setSearch(data);
            return;
        }
        let temp=data;
        if (fill!=0){
            temp=data.filter((item:any)=>item.status==(fill==1?1:0))
        }
        if(value==''){
            setSearch(temp);
            return;
        }
        temp=temp.filter((item:any)=>item.user_code==value);
        setSearch(temp);
    }, [fill,value]);
    return (
        <ScrollView style={[{backgroundColor:theme.background.main},style.container]}>
            <Text style={style.title}>Members joined</Text>
            <Text style={[{color:theme.text.second},style.note]}>The list includes members who participated in the event.</Text>
            <View style={[{borderColor:theme.border.main},style.action]}>
                <View style={style.search}>
                    <Search value={value} set={setValue}/>
                </View>
                <View style={style.fillZone}>
                    <Text style={style.fill}>Filter:</Text>
                    <TouchableOpacity onPress={()=>setShow(!show)} style={[{borderColor:theme.border.main},style.select]}>
                        <View style={style.choose} >
                            {/*@ts-ignore*/}
                            <Text>{fillValue[fill]}</Text>
                            {!show&&<Entypo name="chevron-small-down" size={24} color="black"/>}
                            {show&&<Entypo name="chevron-small-up" size={24} color="black"/>}
                        </View>
                        {show&&fill!=0&&<TouchableOpacity onPress={()=>{
                            setFill(0)
                            setShow(false)
                        }} style={style.value}><Text>Default</Text></TouchableOpacity>}
                        {show&&fill!=1&&<TouchableOpacity onPress={()=>{
                            setFill(1)
                            setShow(false)
                        }} style={style.value}><Text>Attendance</Text></TouchableOpacity>}
                        {show&&fill!=2&&<TouchableOpacity onPress={()=>{
                            setFill(2)
                            setShow(false)
                        }} style={style.value}><Text>Missing</Text></TouchableOpacity>}
                    </TouchableOpacity>
                </View>
            </View>
            {search.map((item:any,key:number)=><Joined check={check} key={key} user={item}/>)}
        </ScrollView>
    )
}
//
const style=StyleSheet.create({
    container:{
        flex: 1,
        padding:15
    },
    fill:{
      marginTop:5
    },
    title:{
        fontSize:18,
        fontWeight:'bold',
        marginBottom:5
    },
    note:{
        fontSize:14,
        marginBottom:5
    },
    search:{
        width:'55%',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    fillZone:{
        flexDirection:'row',
        width:'45%',
        justifyContent:'flex-end',
        alignItems:'flex-start',
    },
    action:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'flex-start',
        borderBottomWidth:0.5,
    },
    select:{
        marginLeft:5,
        paddingVertical:1,
        paddingHorizontal:10,
        borderRadius:10,
        borderWidth:1,
        borderStyle:'solid'
    },
    choose:{
      flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    value:{
      marginBottom:2
    },
    check_zone:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center'
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
//
export default React.memo(JoinedEvent);