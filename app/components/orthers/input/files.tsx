import * as DocumentPicker from "expo-document-picker";
import {Image, Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import useSettings from "@/contexts/settings/settings";
import Swiper from "react-native-swiper";

const FilesInput=({title, des, file, set}:{title: string, des: string, file: any, set: any})=>{
    const {theme}=useSettings()
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
            multiple:true
        }) ;

        if (result.assets && result.assets.length > 0) {
            console.log(result.assets);
            set(result.assets);
        }
    }
    //
    const getFileIcon=(item:any)=>{
        const fileExtension = item.name.split('.').pop()?.toLowerCase();
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
            <Text style={style.title}>{title}</Text>
            {file.length==0&&<Pressable style={style.btn} onPress={getFile}>
                <View style={style.skeleton}><Text style={style.skeText}>Choose file</Text></View>
            </Pressable>}
            {file.length>0&&<Swiper
                style={style.slide}
                autoplay={true}
                autoplayTimeout={5}
                loop={true}
                showsPagination={true}
                showsButtons={false}
            >
                {file.map((item:any, i:any) => (
                    <View style={style.file} key={i}>
                        <Image style={style.icon} source={getFileIcon(item)} resizeMode='stretch' />
                        <View style={style.file_info}>
                            <Text style={style.file_text}>Filename: {item.name}</Text>
                            <Text style={style.file_text}>File size: {item.size} bytes</Text>
                        </View>
                    </View>
                ))}
            </Swiper>}
            {file.length > 0 && (
                <TouchableOpacity
                    style={[style.change, { backgroundColor: theme.icon.main }]} // Màu nền thay đổi theo theme
                    onPress={getFile}
                >
                    <Text style={style.skeText}>Change files</Text>
                </TouchableOpacity>
            )}
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
    slide: {
        height: 100,
        justifyContent:'center',
        alignItems:'center'
    },
    change: {
        width: "100%",
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
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
        minHeight:50,
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
export  default  React.memo(FilesInput);