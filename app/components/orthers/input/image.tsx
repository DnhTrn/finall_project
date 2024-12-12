import React from "react";
import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import * as ImagePicker from 'expo-image-picker';

const ImageInput=({image,set}:any)=>{
    const pickImage=async ()=>{
        // yeu cau truy cap vao thu vien
        const permissionResult =await  ImagePicker.requestMediaLibraryPermissionsAsync();

        if(!permissionResult){
            alert("Permission denied");
            return ;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });
        if(!result.canceled){
            set(result.assets[0].uri)
        }
    }
    return (
        <View style={style.container}>
            <Pressable style={({pressed})=>[
                    {opacity: pressed ? 0.5 : 1},
                    style.btn
                ]} onPress={pickImage}>
                {!image&&<View style={style.skeleton}><Text style={style.skeletonText}>Choose club image</Text></View>}
                {image&&<Image source={{uri:image}} style={style.image} resizeMethod='scale' />}
            </Pressable>
        </View>
    )
}
//
const style=StyleSheet.create({
    container:{
      width:'100%',
        minHeight:200,
        maxHeight:'30%',
        // backgroundColor:'lightgray',
      borderRadius:10,
        overflow:'hidden',
        marginBottom:10
    },
    skeleton:{
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#dddddd'
    },
    skeletonText:{
        fontSize:16,
        textAlign:'center',
        fontWeight:'bold',
        color:'white',
    },
    btn:{
        width:'100%',
        height:'100%'
    },
    image:{
        width:'100%',
        height:'100%',
    }
})
//
export default React.memo(ImageInput)