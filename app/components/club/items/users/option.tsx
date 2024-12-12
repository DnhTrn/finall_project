import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {AntDesign, EvilIcons, Feather, SimpleLineIcons} from "@expo/vector-icons";
import SortUser from "@/app/components/club/items/users/sortUser";
import useSettings from "@/contexts/settings/settings";
import clubVM from "@/app/viewModels/clubVM/clubVM";
import {data} from "@remix-run/router";
import useData from "@/contexts/datas/data";

const Option=({user,set,change}:any)=>{
    const [visible,setVisible]=useState(false);
    // @ts-ignore
    const {theme,setLoad}=useSettings();
    const {removeManager}=clubVM();
    const {data,setData}=useData();
    //
    const handleRemove:any= async ()=>{
        try{
            setLoad(true);
            const temp:any=data;
            const {status,message,newData}=await removeManager(user,temp);
            setLoad(false);
            if(!status){
                console.log(message);
                return;
            }
            setData(newData);
        }catch (e) {

        }
    }

    return(
        <View  style={style.container}>
            <SortUser user={user}/>
            <TouchableOpacity onPress={()=>setVisible(true)}>
                {
                    !visible&&<SimpleLineIcons name={'options'} size={20}/>
                }
                {
                    visible&&<>
                        <TouchableOpacity style={style.btn} onPress={()=> {
                            set(user);
                            change(true);
                            setVisible(false);
                        }}>
                            <Feather name={'edit-3'} size={16}/>
                            <Text style={style.btn_text}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.btn} onPress={handleRemove}>
                            <AntDesign name={'deleteuser'} size={16}/>
                            <Text style={style.btn_text}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.btn} onPress={()=>setVisible(false)}>
                            <EvilIcons name={'close'} size={16}/>
                            <Text style={style.btn_text}>Cancel</Text>
                        </TouchableOpacity>
                    </>
                }
            </TouchableOpacity>
        </View>
    )
}
//
const style=StyleSheet.create({
    container:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    btn:{
        flexDirection:'row',
        justifyContent:"flex-start",
        alignItems:'center',
    },
    btn_text:{
        marginLeft:10
    }
})
//
export default React.memo(Option);