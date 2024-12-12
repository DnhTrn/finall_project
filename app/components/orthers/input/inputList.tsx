import {Pressable, StyleSheet, Text, TextInput, View,Alert} from "react-native";
import React, {useState} from "react";

const InputList=({title,des,members,set,maxItem,minLength,maxLength}:any)=>{
    const [input,setInput]=useState("");
    const handelEnd=()=>{
        if(input===''){
            return;
        }
        if(input.length<minLength){
            Alert.alert('Notification',`The member code must had ${minLength} characters!`);
            return;
        }
        if(input.length>maxLength){
            Alert.alert('Notification',`The member code must had maximum ${minLength} characters!`);
            return;
        }
        if(members.length>=maxItem){
            Alert.alert('Notification',`You only add ${maxItem} members for management board`);
            return;
        }
        if(members.indexOf(input)!==-1){
            Alert.alert('Notification',`The member code had already exits!`);
            return;
        }
        set([...members,input.trim()]);
        setInput('');
    }
    //
    const remove=(index:number)=>{
        const temp=members.filter((item:string,key:number)=>index!==key);
        set(temp);
    }
    return (
        <View style={style.container}>
            <View style={style.inputForm}>
                <Text style={style.inputTitle}>{title}:</Text>
                <TextInput style={style.inputStyle} placeholder="Type here..." value={input} onChangeText={setInput}
                onEndEditing={handelEnd}/>
                <Text style={style.noteText}>{des}</Text>
            </View>
            <View style={style.list}>
                {members.map((member:string,key:number)=>{
                    return (
                        <Pressable key={key} style={style.item} onPress={()=>remove(key)}>
                            <Text style={style.itemText}>X {member}</Text>
                        </Pressable>
                    )
                })}
            </View>

        </View>
    );
}
//
const style=StyleSheet.create({
    container:{
        width:'100%',
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'flex-start',
    },
    list:{
        width:'100%',
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        marginVertical:5,
    },
    item:{
        marginBottom:5,
        marginRight:5,
        paddingHorizontal:15,
        paddingVertical:5,
        borderRadius:10,
        backgroundColor:'#4082FF',
    },
    itemText:{
        color:'white',
        textAlign:'center',
    },
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
        height:50,
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
    }
    ,
})
//
export default  React.memo(InputList);