import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import React, {useState} from "react";
import * as DocumentPicker from 'expo-document-picker';

const InputFile=({title, des, file, set}:{title: string, des: string, file: any, set: any})=>{

    // hàm xử lý lấy file
    const getFile=async ()=>{
        const result = await DocumentPicker.getDocumentAsync({
            type: [
                "application/msword",             // .doc
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
                "application/pdf",                 // .pdf
                "application/vnd.google-apps.document" // .gdoc (Google Docs, có thể không khả dụng trên tất cả các thiết bị)
            ], // có thể chỉ định loại file mong muốn
            copyToCacheDirectory: true,
        }) ;

        if (result.assets && result.assets.length > 0) {
            set(result.assets[0]);
        }
    }
    //
    const getFileIcon=()=>{
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        switch (fileExtension) {
            case "pdf":
                return require('../../../../assets/images/icons/pdf.png');
            case "doc":
            case "docx":
            case "gdoc":
                return require('../../../../assets/images/icons/word.png');
            default:
                return require('../../../../assets/images/icons/default.png');
        }
    }
    return (
        <View style={style.container}>
            <Pressable style={style.btn} onPress={getFile}>
                <Text style={style.title}>{title}</Text>
                {!file&&<View style={style.skeleton}><Text style={style.skeText}>Choose file</Text></View>}
                {file&&<View style={style.file}>
                    <Image style={style.icon} source={getFileIcon()} resizeMode='stretch' />
                    <View style={style.file_info}>
                        <Text style={style.file_text}>Filename: {file.name}</Text>
                        <Text style={style.file_text}>File size: {file.size} bytes</Text>
                    </View>
                </View>}
            </Pressable>
            <Text style={style.des}>{des}</Text>
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
        marginBottom:10
    },
    btn:{
        width:'100%',
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'flex-start',
    },
    title:{
        color:'black',
        fontSize:14,
        marginBottom:10,
        fontWeight:'bold',
    },
    skeleton:{
      width:'100%',
        height:50,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#dddddd',
        borderRadius:10
    },
    skeText:{
      fontSize:16,
      textAlign:'center',
      justifyContent:'center',
      fontWeight:'bold',
      color:'white',
    },
    file:{
        width:'100%',
        height:50,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    icon:{
        width:40,
        height:50,
    },
    file_info:{
        flex:1,
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        marginLeft:10
    },
    file_text:{
      fontSize:14,
      fontWeight:'bold',
        color:'gray',
    },
    des:{
        fontSize:12,
        color:'gray',
        marginTop:5
    }
})
//
export  default  React.memo(InputFile);