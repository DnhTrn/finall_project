import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import useSettings from "@/contexts/settings/settings";
import Search from "@/app/components/orthers/input/search";
import Select from "@/app/components/club/items/users/select";
import useData from "@/contexts/datas/data";
import clubVM from "@/app/viewModels/clubVM/clubVM";

const ListMembers=()=>{
    // @ts-ignore
    const {theme,setLoad}=useSettings();
    const {data,setData}=useData();
    const[choose,setChoose]=useState([]);
    const [search,setSearch]=useState("");
    const [searchData,setSearchData]=useState(data?.members);
    const [all,setAll]=useState(false);
    const {removeMember}=clubVM();
    //
    useEffect(() => {
        if(all){
            // @ts-ignore
            setChoose(data?.members)
            return;
        }
        setChoose([]);
    }, [all]);
    //
    useEffect(() => {
        console.log(choose);
    }, [choose]);
    //
    useEffect(() => {
        console.log('data:members');
        console.log(data?.members);
        setSearchData(data?.members);
    }, [data]);
    //
    useEffect(() => {
        if(search==''){
            setSearchData(data?.members);
            return;
        }
        const temp= searchData.filter((item:any)=>{
            console.log(item.user_code==search);
            if(new RegExp(search).test(item?.user_code)){
                return item;
            }
        })
        setSearchData(temp);
    }, [search]);
    // handle remove
    const handleRemove:any=async ()=>{
        try{
            setLoad(true);
            const temp:any=data;
            const {status,message,newData}=await removeMember(choose,temp);
            setLoad(false);
            if(!status){
                console.log(message);
                return;
            }
            setData(newData);
        }catch (e) {
            
        }
    }
    return (
        <View style={[{backgroundColor:theme.background.main},style.container]}>
            <Text style={style.title}>Members (30)</Text>
            <Text style={[{color:theme.text.second},style.note]}>Choose member or input them member id to search.</Text>
            <Search value={search} set={setSearch}/>
            <View style={style.action}>
                <View style={style.check_zone}>
                    <TouchableOpacity onPress={()=>setAll(!all)} style={[{borderColor:theme.border.second},style.check]}>
                        {all&&<View style={[{backgroundColor: theme.icon.main}, style.checked]}/>}
                    </TouchableOpacity>
                    <Text>Select all</Text>
                </View>
                {choose.length>0&&
                    <TouchableOpacity onPress={handleRemove}>
                        <Text>Remove</Text>
                    </TouchableOpacity>
                }
            </View>
            <ScrollView style={{marginTop:10}}>
                {searchData&&
                    searchData.map((item:any,key:any)=>
                        <Select key={key} index={key} user={item} choose={choose} set={setChoose} isChoose={all} />)
                }
            </ScrollView>
        </View>
    )
}
//
export default React.memo(ListMembers);
//
const style=StyleSheet.create({
    container:{
        flex: 1,
        padding:15
    },
    title:{
        fontSize:18,
        fontWeight:'bold',
    },
    note:{
        fontSize:14,
        marginBottom:5
    },
    action:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
    },
    check_zone:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center'
    }
    ,
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