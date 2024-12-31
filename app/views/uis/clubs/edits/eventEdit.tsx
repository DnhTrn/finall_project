import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import React, {useEffect, useState} from "react";
import useSettings from "@/contexts/settings/settings";
import Radio from "@/app/components/orthers/radio/radio";
import SelectEvent from "@/app/views/uis/clubs/main/select";
import Input from "@/app/components/orthers/input/input";
import DateInput from "@/app/components/orthers/date/date";
import TextArea from "@/app/components/orthers/input/textArea";
import ImagesInput from "@/app/components/orthers/input/images";
import FilesInput from "@/app/components/orthers/input/files";
import {useNavigation, useRoute} from "@react-navigation/core";
import FullEvent from "@/app/components/skeletons/fullEvent";
import EventVM from "@/app/viewModels/eventVM/eventVM";
import formatDate from "@/constants/handles/formatDate";
import Swiper from "react-native-swiper";
import File from "@/app/components/orthers/file/file";
import showAlert from "@/app/components/orthers/alert/alert";
import confirmAlert from "@/app/components/orthers/alert/confirm";

const EventEdit=()=>{
    const route=useRoute();
    // @ts-ignore
    const {id} = route.params;
    const {detail,update,deleteEvent}=EventVM();
    const [event,setEvent]=useState(null);
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
    const [changeImgs,setChangeImgs]=useState(false);
    const [changeFiles,setChangeFiles]=useState(false);
    const navigation=useNavigation();
    //
    useEffect(() => {
        const fetch=async ()=>{
            try{
                const {status,event:res}=await detail(id);
                if(!status)return;
                setEvent(res);
                setName(res?.name);
                setSortDes(res?.sort_description);
                setFullDesc(res?.full_description);
                setName(res?.name);
                const start =res?.start_at.split('-');
                const end =res?.end_at.split('-');
                setStart(new Date(`${start[2]}-${start[1]}-${start[0]}`));
                setEnd(new Date(`${end[2]}-${end[1]}-${end[0]}`));
            }catch (e) {
                console.log('UI: '+e);
            }
        }
        fetch();
    }, []);
    // trigger update data
    useEffect(()=>{
        setData({id,type, name, sortDes, fullDesc, start, end, file:files, img:imgs, pre,changeFiles,changeImgs})
    },[type,name,sortDes,fullDesc,start,end,files,imgs,pre,changeFiles,changeImgs]);
    // handle submit
    const handleSubmit=async ()=>{
        try{
            setLoad(true);
            const {status,message}=await update(data);
            setLoad(false);
            console.log(status,message);
            if(!status){
                const mes={status:lang.notification.status,message:lang.notification.message.error[message]};
                showAlert(mes);
                return;
            }
        }catch (e) {
            console.log('UI: '+e);
        }
    }
    //
    const del=async ()=>{
        try{
            setLoad(true);
            const {status,message}=await deleteEvent(id);
            setLoad(false);
            if(!status){
                const mes={status:lang.notification.status,message:lang.notification.message.error[message]};
                showAlert(mes);
                return;
            }
        }catch (e) {
            console.log('VM: '+e);
            return {status:false}
        }
    }
    const handleDel=()=>{
        const messages={
            status:lang.notification.status,
            message:'Are you sure you want to delete this event.',
            cancel:'Cancel',
            success:'Delete'
        }
        confirmAlert(messages,del)
    }
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
            {!event&&<FullEvent/>}
            {event&&<Text style={[{color: theme.title.main}, style.title]}>Edit event information</Text>}

            {event&&<ScrollView style={style.content} showsVerticalScrollIndicator={false}>
                <Input value={name} set={setName} title={lang.create.event.event_name.title}
                       des={lang.create.event.event_name.des} type={'text'}/>
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
                <Input value={sortDes} set={setSortDes} title={lang.create.event.event_sort.title}
                       des={lang.create.event.event_sort.des} type={'text'}/>
                <TextArea value={fullDesc} set={setFullDesc} title={lang.create.event.event_full.title}
                          des={lang.create.event.event_full.des} type={'text'}/>
                <Text style={style.inputTitle}>Choose event images</Text>
                {/*@ts-ignore*/}
                {!changeImgs&&event?.imgs&&<View style={style.wrap}>
                    <Swiper style={style.slide}
                            showsPagination={true}
                            showsButtons={false}>
                        {/*@ts-ignore*/}
                        {event?.imgs.map((item:any,i:any)=><Image key={i} style={style.img} source={{uri:item}} />)}
                    </Swiper>
                    <TouchableOpacity onPress={()=>setChangeImgs(true)} style={[{backgroundColor: theme.icon.main}, style.change]}>
                        <Text style={style.change_text}>Change images</Text>
                    </TouchableOpacity>
                </View>}
                {changeImgs&&<ImagesInput images={imgs} set={setimgs}/>}
                {changeImgs&&<TouchableOpacity onPress={() => setChangeImgs(false)}
                                   style={[{backgroundColor: theme.icon.th3}, style.change]}>
                    <Text style={style.change_text}>Cancel</Text>
                </TouchableOpacity>}
                <Text style={style.noteText}>You need to choose at least one photo to be the main photo for the
                    event.</Text>
                {!changeFiles&&<Text style={style.inputTitle}>Choose event files</Text>}
                {/*@ts-ignore*/}
                {!changeFiles&&event?.files&&event?.files.length>0&&event?.files.map((item:any,key:any)=><File url={item} key={key}/>)}
                {!changeFiles&&<TouchableOpacity onPress={() => setChangeFiles(true)}
                                   style={[{backgroundColor: theme.icon.main}, style.change]}>
                    <Text style={style.change_text}>Change files</Text>
                </TouchableOpacity>}
                {!changeFiles&&<Text style={style.noteText}>You need to select at least one event terms file.</Text>}
                {changeFiles&&<FilesInput file={files} set={setFiles} title={'Choose event files'}
                             des={'You need to select at least one event terms file.'}/>}
                {changeFiles&&<TouchableOpacity onPress={() => setChangeFiles(false)}
                                               style={[{backgroundColor: theme.icon.th3}, style.change]}>
                    <Text style={style.change_text}>Cancel</Text>
                </TouchableOpacity>}
            </ScrollView>}
            {event&&<View style={style.btn_zone}>
                {/*@ts-ignore*/}
                <TouchableOpacity onPress={handleDel} style={[{backgroundColor: theme.icon.th3}, style.del]}>
                    <Text style={style.submit_text}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSubmit} style={[{backgroundColor: theme.icon.main}, style.submit]}>
                    <Text style={style.submit_text}>Submit</Text>
                </TouchableOpacity>
            </View>}
        </KeyboardAvoidingView>
    )
}
//
export default React.memo(EventEdit);
//
const style=StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:15
    },
    btn_zone:{
      width:'100%',
      justifyContent:'space-between',
      alignItems:'center',
      flexDirection:'row',
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
    wrap:{
      width:'100%',
        justifyContent:'flex-start',
        alignItems:'flex-start',
    },
    slide:{
        height:225,
    },
    img:{
        marginTop:5,
        width:'100%',
        height:200,
        borderRadius:10
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
    change:{
        width: "100%",
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginBottom:10,
    },
    change_text:{
        fontSize:16,
        textAlign:'center',
        justifyContent:'center',
        fontWeight:'bold',
        color:'white',
    },
    submit: {
        width: "69%",
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        marginTop:5
    },
    del: {
        width: "30%",
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        marginTop:5
    },
    submit_text:{
        fontSize:16,
        textAlign:'center',
        justifyContent:'center',
        fontWeight:'bold',
        color:'white',
    },

})