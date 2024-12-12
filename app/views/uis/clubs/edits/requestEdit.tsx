// @ts-nocheck
import {KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/core";
import React, {useState} from "react";
import clubRegisterVM from "@/app/viewModels/clubRegisterVM/clubRegisterVM";
import ImageInput from "@/app/components/orthers/input/image";
import Input from "@/app/components/orthers/input/input";
import TextArea from "@/app/components/orthers/input/textArea";
import Radio from "@/app/components/orthers/radio/radio";
import InputList from "@/app/components/orthers/input/inputList";
import InputFile from "@/app/components/orthers/input/file";
import File from "@/app/components/orthers/file/file";
import useSettings from "@/contexts/settings/settings";
import useData from "@/contexts/datas/data";
import showAlert from "@/app/components/orthers/alert/alert";

const RequestEdit=()=>{
    const router:any=useRoute();
    const {data,setData}=useData();
    console.log('data:');
    const {club}=router.params;
    console.log(data.request);
    const {theme,setLoad,lang}=useSettings();
    const {update}=clubRegisterVM();
    const navigation=useNavigation();
    //
    const[name,setName]=useState(club.name);
    const [image,setImage]=useState(club.wallpaper);
    const [check_img,setCheck_img]=useState(false);
    const [fileTern,setFileTern]=useState(club.tern_file);
    const [fileRegulation,setFileRegulation]=useState(club.regulation_file);
    const [changeFile,setChangeFile]=useState(false);
    const [sort,setSort]=useState(club.sort);
    const [orientation,setOrientation]=useState(club.orientation);
    const [full,setFull]=useState(club.full);
    const [lecturer,setLecturer]=useState(club.lecturer);
    const [members,setMembers]=useState(club.members);
    // trang thai nhap thong tin
    const [lecturerOption,setLecturerOption]=useState(club.memberOption);
    const [memberOption,setMembersOption]=useState(club.lecturerOption);
    //
    const options=[
        {
            value:false,
            label:lang.create.club.lect.options[false],
        },
        {
            value:true,
            label:lang.create.club.lect.options[true],
        }
    ]
    const options2=[
        {
            value:false,
            label:lang.create.club.managers.options[false],
        },
        {
            value:true,
            label:lang.create.club.managers.options[true],
        }
    ]
    const options3=[
        {
            value:false,
            label:lang.create.club.file.options[false],
        },
        {
            value:true,
            label:lang.create.club.file.options[true],
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
        setFileTern(club.tern_file);
        setFileRegulation(club.regulation_file);
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
        const updateData={id:club.id,name,sort,full,orientation,lecturer,
            members,image,fileTern,fileRegulation,
            lecturerOption,memberOption,changeFile,check_img};
        setLoad(true);
        const {status,message,newData}=await update(updateData,data.request);
        setLoad(false);
        if(!status) {
            const mes={status:lang.notification.status,message:lang.notification.message.error[message]};
            showAlert(mes);
            return;
        }
        setData({...data,request:newData});
        navigation.goBack();
        return;
    }
    return (
        <View style={[{backgroundColor:theme.background.main},style.container]}>
            <KeyboardAvoidingView style={[style.form]}
                                  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                                  keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
                <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
                    <ImageInput image={image} set={handleChangeImage}/>
                    <View style={style.content}>
                        <Input value={name} set={setName} title={lang.create.club.name.title} des={lang.create.club.name.des}/>
                        <Input value={orientation} set={setOrientation} title={lang.create.club.orien.title} des={lang.create.club.orien.des}/>
                        <Input value={sort} set={setSort} title={lang.create.club.sort.title} des={lang.create.club.sort.des}/>
                        <TextArea value={full} set={setFull} title={lang.create.club.full.title} des={lang.create.club.full.des}/>
                        <Radio title={lang.create.club.lect.opTitle}
                               des={lang.create.club.lect.opDes}
                               defaultValue={lecturerOption} options={options} setState={setLecturerOption} />
                        {lecturerOption&&
                            <Input value={lecturer} set={setLecturer} title={lang.create.club.lect.inputTitle} des={lang.create.club.lect.inputDes}/>}
                        <Radio title={lang.create.club.managers.opTitle}
                               des={lang.create.club.managers.opDes}
                               defaultValue={memberOption} options={options2} setState={setMembersOption} />
                        {memberOption&&<InputList title={lang.create.club.managers.inputTitle} maxItem={4} minLength={8} maxLength={10}
                                                  des={lang.create.club.managers.inputDes}
                                                  members={members} set={setMembers}/>
                        }
                        <Radio title={lang.create.club.file.opTitle}
                               des={lang.create.club.file.opDes}
                               defaultValue={changeFile} options={options3} setState={handleFileChange} />
                        {changeFile&&<>
                            <InputFile  title={lang.create.club.file.tern}
                                        des={lang.create.club.file.ternDes}
                                        file={fileTern} set={setFileTern} />
                            <InputFile title={lang.create.club.file.regular}
                                       des={lang.create.club.file.regularDes}
                                       file={fileRegulation} set={setFileRegulation} />
                        </>
                        }
                        {!changeFile&&<View style={style.file_display}>
                            <Text style={[{color:theme.text.main},style.file_title]}>{lang.create.club.tern.title}</Text>
                            <File url={fileTern}/>
                            <Text style={[{color:theme.text.second},style.file_des]} >{lang.create.club.tern.des}</Text>
                            <Text style={[{color:theme.text.main},style.file_title]}>{lang.create.club.regular.title}</Text>
                            <File url={fileRegulation}/>
                            <Text style={[{color:theme.text.second},style.file_des]} >{lang.create.club.regular.des}</Text>
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
export default React.memo(RequestEdit)