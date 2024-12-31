import {KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import useSettings from "@/contexts/settings/settings";
import Radio from "@/app/components/orthers/radio/radio";
import SelectEvent from "@/app/views/uis/clubs/main/select";
import Input from "@/app/components/orthers/input/input";
import DateInput from "@/app/components/orthers/date/date";
import TextArea from "@/app/components/orthers/input/textArea";
import ImagesInput from "@/app/components/orthers/input/images";
import FilesInput from "@/app/components/orthers/input/files";
import EventVM from "@/app/viewModels/eventVM/eventVM";
import showAlert from "@/app/components/orthers/alert/alert";
import useData from "@/contexts/datas/data";

const CreateEvent=()=>{
    const {data:current}=useData();
    const {theme,lang,setLoad}=useSettings();
    const [type,setType]=useState(false);
    const [name,setName]=useState("");
    const [sortDes,setSortDes]=useState('');
    const [fullDesc,setFullDesc]=useState('');
    const [start,setStart]=useState(new Date());
    const [end,setEnd]=useState(new Date());
    const [files,setFiles]=useState([]);
    const [imgs,setimgs]=useState([]);
    const [pre,setPre]=useState('');
    const [data,setData]=useState({});
    const {create}=EventVM();
    // trigger update data
    useEffect(()=>{
       setData({club_id:current?.club.id,type, name, sortDes, fullDesc, start, end, files, imgs, pre})
    },[type,name,sortDes,fullDesc,start,end,files,imgs,pre,]);
    // handle submit
    const handleSubmit=async ()=>{
        try{
            setLoad(true);
            const {status,message}=await create(data);
            console.log(status);
            console.log(message);
            console.log(data);
            setLoad(false);
            if(!status){
                const mes={status:lang.notification.status,message:lang.notification.message.error[message]};
                showAlert(mes);
                return;
            }
        }catch (e) {
            setLoad(false);
            console.log('ui error: '+e );
        }
    }
    //
    const options=[
        {
            value:false,
            label:lang.create.event.type.options.false,
        },
        {
            value:true,
            label:lang.create.event.type.options.true,
        }
    ]
    return (
        <KeyboardAvoidingView style={[{backgroundColor:theme.background.main},style.container]}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}>
            <Text style={[{color:theme.title.main},style.title]}>Create event information</Text>
            <ScrollView style={style.content} showsVerticalScrollIndicator={false}>
                <Radio title={lang.create.event.type.opTitle}
                       des={lang.create.event.type.opDes}
                       defaultValue={type} options={options} setState={setType} />
                {type&&<SelectEvent title={lang.create.event.type.inputTitle} des={lang.create.event.type.inputDes} set={setPre} />}
                <Input value={name} set={setName} title={lang.create.event.event_name.title} des={lang.create.event.event_name.des} type={'text'} />
                <Text style={style.inputTitle}>{lang.create.event.event_date.title}</Text>
                <View style={style.date}>
                    <View style={style.input}>
                        <Text style={style.label}>Start:</Text>
                        <DateInput value={start} set={setStart}/>
                    </View>
                    <View style={style.input}>
                        <Text style={style.label}>End:</Text>
                        <DateInput value={end} set={setEnd}/>
                    </View>
                </View>
                <Text style={style.noteText}>{lang.create.event.event_date.des}</Text>
                <Input value={sortDes} set={setSortDes} title={lang.create.event.event_sort.title} des={lang.create.event.event_sort.des} type={'text'} />
                <TextArea value={fullDesc} set={setFullDesc} title={lang.create.event.event_full.title} des={lang.create.event.event_full.des} type={'text'} />
                <Text style={style.inputTitle}>Choose event images</Text>
                <ImagesInput images={imgs} set={setimgs} />
                <Text style={style.noteText}>You need to choose at least one photo to be the main photo for the event.</Text>
                <FilesInput file={files} set={setFiles} title={'Choose event files'} des={'You need to select at least one event terms file.'}/>
            </ScrollView>
            <TouchableOpacity onPress={handleSubmit} style={[{backgroundColor:theme.icon.main},style.submit]}>
                <Text style={style.submit_text}>Submit</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}
//
export default React.memo(CreateEvent);
//
const style=StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:15
    },
    title:{
        fontSize:18,
        fontWeight:'bold',
        marginTop:10
    },
    content:{
        paddingTop:10,
        flex:1
    },
    inputTitle:{
        color:'black',
        fontSize:14,
        fontWeight:'bold',
        marginBottom:5
    },
    date:{
        width:'100%',
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row'
    },
    input:{
      width:'50%',
      flexDirection:'row',
      justifyContent:'flex-start',
      alignItems:'center',
    },
    label:{
        fontSize:14,
        color:'gray',
    },
    noteText:{
        fontSize:12,
        color:'gray',
        marginTop:5,
        marginBottom:10
    },
    submit: {
        width: "100%",
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginTop:5
    },
    submit_text:{
        fontSize:16,
        textAlign:'center',
        justifyContent:'center',
        fontWeight:'bold',
        color:'white',
    }
})