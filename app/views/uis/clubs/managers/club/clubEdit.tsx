// @ts-nocheck
import {KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/core";
import React, {useState} from "react";
import clubVM from "@/app/viewModels/clubVM/clubVM";
import useSettings from "@/contexts/settings/settings";
import ImageInput from "@/app/components/orthers/input/image";
import Input from "@/app/components/orthers/input/input";
import Radio from "@/app/components/orthers/radio/radio";
import TextArea from "@/app/components/orthers/input/textArea";
import InputFile from "@/app/components/orthers/input/file";
import File from "@/app/components/orthers/file/file";
import useData from "@/contexts/datas/data";

const ClubEdit=()=>{
    const {data,setData}=useData();
    const {theme,setLoad}=useSettings();
    const {update}=clubVM();
    const navigation=useNavigation();
    //
    const[name,setName]=useState(data?.club?.name);
    const [image,setImage]=useState(data?.club?.wallpaper);
    const [check_img,setCheck_img]=useState(false);
    const [fileTern,setFileTern]=useState(data?.club?.tern);
    const [fileRegulation,setFileRegulation]=useState(data?.club?.regular);
    const [changeFile,setChangeFile]=useState(false);
    const [sort,setSort]=useState(data?.club?.sort_description);
    const [orientation,setOrientation]=useState(data?.club?.orientations);
    const [full,setFull]=useState(data?.club?.full_description);
    const [check,setCheck]=useState(data?.club?.status);
    //
    const options=[
        {
            value:0,
            label:'Disable club',
        },
        {
            value:1,
            label:'Active club',
        }
    ]
    const options3=[
        {
            value:false,
            label:'Keep old files',
        },
        {
            value:true,
            label:'change files',
        }
    ]
    /*
    * ham chuyen doi khi lua chon thay the file cu
    * neu doi se chuyen ve null de thuc hien chon file moi
    * neu khong se gan lai bang duong dan file cu
    * */
    const handleFileChange=(value)=>{
        if(value){
            setFileTern(null);
            setFileRegulation(null);
            setChangeFile(value);
            return;
        }
        setChangeFile(value);
        setFileTern(data?.club?.tern_file);
        setFileRegulation(data?.club?.regulation_file);
    }
    /*
    * Ham kiem tra co thay doi anh hay khong
    *
    * */
    const handleChangeImage=(url)=>{
        setImage(url);
        setCheck_img(true);
    }
    /*
    * Ham cap nhap du lieu
    * */
    const handleSubmit= async ()=>{
        try{
            const updateData={id:data?.club?.id,name,sort,full,orientation,
                image,fileTern,fileRegulation,status:check,
                changeFile,check_img};
            setLoad(true);
            const temp:any=data;
            const {status,message,newData}=await update(updateData,temp);
            setLoad(false);
            if(!status){
                console.log(message);
                return;
            }
            setData(newData);
            navigation.goBack();
        }catch (e) {

        }
    }
    return (
        <View style={[{backgroundColor:theme.background.main},style.container]}>
            <KeyboardAvoidingView style={[style.form]}
                                  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                                  keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
                <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
                    <ImageInput image={image} set={handleChangeImage}/>
                    <View style={style.content}>
                        <Input value={name} set={setName} title={'Input the club name'} des={'Name of club will be the key for member can be search to join'}/>
                        <Radio title={'Change club status'}
                               des={'If change to disable club can\'t be search. '}
                               defaultValue={check} options={options} setState={setCheck} />
                        <Input value={orientation} set={setOrientation} title={'Input the orientation of the club'} des={'The club\'s orientation will be used to advise members about the club'}/>
                        <Input value={sort} set={setSort} title={'Input the short description'} des={'Short description will be show when member searching club'}/>
                        <TextArea value={full} set={setFull} title={'Input the Full description'} des={'Full description will be show on the club screen'}/>
                        <Radio title={'Change a new tern and regulation file'}
                               des={'If change you must selected a new file for tern and regulation'}
                               defaultValue={changeFile} options={options3} setState={handleFileChange} />
                        {changeFile&&<>
                            <InputFile  title={'Choose file tern of club'}
                                        des={'The terms of the club are mandatory when initiating the club. The Terms govern the club as well as its members.'}
                                        file={fileTern} set={setFileTern} />
                            <InputFile title={'Choose file regulations of club.'}
                                       des={'Regulations are mandatory when initiating a club. The regulations aim to regulate and sanction the club.'}
                                       file={fileRegulation} set={setFileRegulation} />
                        </>
                        }
                        {!changeFile&&<View style={style.file_display}>
                            <Text style={[{color:theme.text.main},style.file_title]}>Tern file:</Text>
                            <File url={fileTern}/>
                            <Text style={[{color:theme.text.second},style.file_des]} >This file needs to contain the rules for activities in the club</Text>
                            <Text style={[{color:theme.text.main},style.file_title]}>Regulation file:</Text>
                            <File url={fileRegulation}/>
                            <Text style={[{color:theme.text.second},style.file_des]} >This file needs to contain the rules for activities in the club</Text>
                        </View>
                        }
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
            <View style={style.bottom}>
                <TouchableOpacity onPress={handleSubmit} style={[{backgroundColor:theme.icon.main},style.btn]}>
                    <Text style={[{color:theme.text.th3},style.text_btn]}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
//
const style=StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column'
    },
    form:{
        flex:1,
        paddingBottom:20,
    },
    content:{
        paddingHorizontal:15,
        paddingBottom:15
    },
    bottom:{
        width:'100%',
        paddingHorizontal:15,
        justifyContent:'center',
        alignItems:'center',
        height:45,
        marginTop:5
    },
    btn:{
        width:'100%',
        paddingVertical:10,
        borderRadius:10
    },
    text_btn:{
        textAlign:"center"
    },
    file_display:{
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'flex-start'
    },
    file_title:{
        fontSize:16,
        fontWeight:'bold'
    },
    file_des:{
        fontSize:12,
        marginBottom:5

    }


})
//
export default React.memo(ClubEdit)