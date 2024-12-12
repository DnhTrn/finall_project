import React from "react";
import {Image, TouchableOpacity, ScrollView, Text, View, StyleSheet} from "react-native";
import { useRoute} from "@react-navigation/core";
import ClubApplyVM from "@/app/viewModels/clubApplyVM/clubApplyVM";
import useSettings from "@/contexts/settings/settings";
import useData from "@/contexts/datas/data";

const Policy=({navigation}:any)=>{
    const router:any = useRoute();
    // @ts-ignore
    const {theme,setLoad}=useSettings();
    const {apply}=ClubApplyVM();
    const {club}=router.params;
    const {data,setData}=useData();
    const handleJoin=async ()=>{
        console.log('click');
        setLoad(true);
        const temp:any=data;
        const {status,message,newData}:any=await apply(club?.id,temp);
        setLoad(false);
        if(!status){
            console.log(message);
            return ;
        }
        setData(newData);
        navigation.replace('club-detail',{ club_id: club.id });
    }
    return (
        <View style={style.container} >
            <ScrollView style={style.content}>
                <Image style={style.image} source={{uri:club.wallpaper}} resizeMode="cover"/>
                <Text style={style.hi}>First, {club.name} want to say hi to you and some notes you must to know to join with us!</Text>
                <View style={style.terms}>
                    <Text style={style.title}>terms and conditions</Text>
                    <Text style={style.rules}>You need to ensure you comply with the school and club's rules regarding terms of school activities...</Text>
                    <Text  style={style.rules}>1. Comply with the school's general rules</Text>
                    <Text  style={style.rules}>2. Do not affect the overall image of the club and school....</Text>
                </View>
                <View style={style.note}>
                    <Text style={style.note_text}>By clicking join, you agree to the club's terms and conditions.
                        Your request to join will be sent to the club management and we will respond to you as soon as possible.
                    </Text>
                    <Text style={style.thank}>Thank you for joining width us!</Text>
                </View>
            </ScrollView>
            <View style={style.action}>
                <TouchableOpacity onPress={()=>navigation.goBack()}
                                  style={[style.btn,style.cancel]}>
                    <Text style={style.btn_text}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[style.btn,style.join]} onPress={handleJoin}>
                    <Text style={style.btn_text}>Join</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
//
export default React.memo(Policy);
//
const style=StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    content:{
        width:'100%',
        flexDirection:'column',
        padding:10
    },
    image: {
        width: '100%', // Đảm bảo hình ảnh chiếm toàn bộ chiều ngang container
        height: 200,
        borderRadius: 10,
    },
    hi:{
        fontSize:18,
        fontWeight:'600'
    },
    terms:{
        marginVertical:10,
        flexDirection:'column'
    },
    title:{
        fontSize:16,
        fontWeight:'800'
    },
    rules:{
        fontSize:14,
        marginVertical:10
    },
    note:{
        flex:1,
        flexDirection:'column'
    },
    note_text:{
        fontSize:12,
        color:'gray'
    },
    thank:{
        marginVertical:10,
        fontSize:18,
        fontWeight:'600',
        color:'gray'
    },
    action:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'white',
        paddingTop:10,
        paddingHorizontal:10
    },
    btn:{
        paddingHorizontal:10,
        paddingVertical:15,
        borderRadius:10
    },
    cancel:{
        backgroundColor:'gray',
        width:"34%"
    },
    join:{
        backgroundColor:'#4082FF',
        width:'65%'
    },
    btn_text:{
        color:'white',
        textAlign:'center'
    }
})