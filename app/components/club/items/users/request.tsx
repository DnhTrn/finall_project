import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {useNavigation} from "@react-navigation/core";
import useSettings from "@/contexts/settings/settings";
import useData from "@/contexts/datas/data";
import clubApplyVM from "@/app/viewModels/clubApplyVM/clubApplyVM";

const Request = ({index,request}:any)=>{
    // @ts-ignore
    const {theme,setLoad}=useSettings();
    const {data,setData}=useData();
    const {update}=clubApplyVM();
    console.log(request);
    const navigation = useNavigation();
    //
    const handle= async (type:boolean)=>{
        try{
            setLoad(true);
            const temp:any=data;
            const {status,message,newData}=await update(type,request,temp);
            setLoad(false);
            if(!status){
                console.log(message);
                return;
            }
            console.log('newData');
            console.log(newData);
            setData(newData);
        }catch (e) {
            
        }
    }
    return (
        // @ts-ignore
        <TouchableOpacity key={index} onPress={()=>navigation.navigate('user-infor',{user:request})} style={style.container}>
            <Image style={style.avata} source={require('../../../../../assets/images/adaptive-icon.png')} resizeMode={'cover'} />
            <View style={style.content}>
                <Text style={[{color:theme.text.main},style.name]} >{request?.name??"User name"}</Text>
                <Text style={[{color:theme.text.second},style.date]}>20h20 - 20/8/2024</Text>
                <View style={style.action}>
                    <TouchableOpacity style={[{backgroundColor:theme.icon.main},style.btn]} onPress={()=>handle(true)}>
                        <Text style={[{color:theme.text.th3},style.btn_text]}>Access</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{backgroundColor:theme.icon.th3},style.btn]} onPress={()=>handle(false)}>
                        <Text style={style.btn_text}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}
//
export default  React.memo(Request);
//
const style=StyleSheet.create({
    container:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        marginBottom:10
    },
    avata:{
        width:50,
        height:50,
        borderRadius:25,
    },
    content:{
        width:'80%',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'flex-start',
        marginLeft:10
    },
    name:{
        fontSize:16,
        fontWeight:'bold',
    },
    date:{
        fontSize:12,
    },
    action:{
        marginTop:10,
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    btn:{
        paddingVertical:5,
        borderRadius:15,
        width:'48%'
    },
    btn_text:{
        textAlign:'center',
        fontSize:16,
    }
})