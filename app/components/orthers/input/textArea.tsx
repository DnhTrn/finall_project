import {StyleSheet, Text, TextInput, View} from "react-native";
import React from "react";

const TextArea=({title,value='',des,set}:any)=>{
    return (
        <View style={style.inputForm}>
            <Text style={style.inputTitle}>{title}:</Text>
            <TextInput value={value} onChangeText={set} style={[style.inputStyle,style.textArea]} multiline numberOfLines={4} placeholder="Type here..."/>
            <Text style={style.noteText}>{des}</Text>
        </View>
    )
}
//
export default React.memo(TextArea);
//
const style=StyleSheet.create({
    inputForm:{
        width:'100%',
        height:'auto',
        marginBottom:10,
        flexDirection:'column',
    }
    ,
    inputTitle:{
        color:'black',
        fontSize:14,
        fontWeight:'bold',
    },
    inputStyle:{
        width:'100%',
        paddingHorizontal:10,
        paddingVertical:5,
        marginTop:10,
        borderRadius:10,
        borderColor:'gray',
        borderWidth:1,
        borderStyle:'solid',
    },
    noteText:{
        fontSize:12,
        color:'gray',
        marginTop:5
    },
    textArea:{
        minHeight:150,
        height:'auto'
    }
})