import React from "react";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/core";
import useData from "@/contexts/datas/data";
//
const Item=({route,title}:any)=>{
    const navigation:any =useNavigation();
    // @ts-ignore
    return (<TouchableOpacity onPress={()=>navigation.navigate(route)} style={styles.item}>
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>)
}
//
const DetailScreen=()=>{
    const list=[{route:'club-info',title:'Info'},
        {route:'club-members',title:'Members'}]
    return (
        <ScrollView style={styles.container} showsHorizontalScrollIndicator={false} horizontal={true}>
            {
                list.map((item,key)=><Item key={key} route={item.route} title={item.title}/>)
            }
        </ScrollView>
    )
}
//
const styles=StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:15,
        borderColor:'#e6e6e6',
        borderStyle:'solid',
        borderBottomWidth:5,
    },
    item:{
        marginHorizontal:5,
        marginBottom:10,
        width:100,
        backgroundColor:'lightgray',
        borderRadius:15,
        paddingHorizontal:15,
        paddingVertical:10
    },
    text:{
        color:'white',
        textAlign:'center',
    }
})
//
export default React.memo(DetailScreen);