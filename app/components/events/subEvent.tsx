import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import useSettings from "@/contexts/settings/settings";
import {useNavigation} from "@react-navigation/core";

const Sub=({item}:any)=>{
    const [over,setOver]=React.useState(false);
    const {theme}=useSettings();
    const navigation=useNavigation();
    return (
        //@ts-ignore
        <TouchableOpacity onPress={()=>navigation.navigate('event-sub-detail',{id:item?.id})} style={style.container} >
            <View style={style.by}>
                {item.isMain||!item.ava&&<Image  style={style.ava} source={require('../../../assets/images/splash-icon.png')} />}
                {!item.isMain&&item.ava&&<Image source={{uri:item?.ava}} style={style.ava} />}
                <View style={style.info}>
                    <Text numberOfLines={2} style={style.name}>{item?.by}</Text>
                    <Text numberOfLines={2} style={style.name_event}>{item?.name}</Text>
                    <Text numberOfLines={2} style={style.date}>{item?.created_at}</Text>
                </View>
            </View>
            <View style={style.content}>
                <Text numberOfLines={2} >{item?.sort_description}</Text>
                <View style={style.start}>
                    <Text numberOfLines={2} style={style.date}>Start at: {item?.start_at}</Text>
                    <Text  numberOfLines={2} style={[{marginLeft:5},style.date]}>End at: {item?.end_at}</Text>
                </View>
                {item?.imgs&&item?.imgs.length>0&&<Image style={style.img} source={{uri:item?.imgs[0]}} />}
            </View>
        </TouchableOpacity>
    )
}
//
export default React.memo(Sub);
//
const style=StyleSheet.create({
    container:{
        width:'100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor:'white',
        marginBottom:10,
        borderRadius:10,
        paddingHorizontal:15,
        paddingVertical:10,
    },
    ava:{
        width:40,
        height:40,
        borderRadius:10
    },
    by:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        borderBottomWidth:.5,
        borderStyle:'solid',
        borderColor:'gray',
        paddingBottom:5
    },
    info:{
        width:'80%',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        marginLeft:10,

    },
    name:{
        fontSize:12,
    },
    name_event:{
        fontSize:14,
        width:'100%',
    },
    date:{
        fontSize:12,
    },
    content:{
        width:'100%',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        wordWrap:'wrap'
    },
    img:{
        marginTop:5,
        width:'100%',
        height:200,
        borderRadius:10
    },
    start:{
        width:'100%',
        marginVertical:5,
        alignItems:'center',
        justifyContent:'flex-start',
        flexDirection:'row'
    },
    btn:{
        width:'100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor:'white',
        marginBottom:10,
        borderRadius:10,
        paddingHorizontal:15,
        paddingVertical:10,
    },
    text_btn:{
        textAlign:'center',
        fontSize:16,
    }
});