import React, {useEffect, useState} from "react";
import {
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView, StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import ClubVM from "@/app/viewModels/clubVM/clubVM";
import State from "@/app/components/club/state/state";
import ImageInput from "@/app/components/orthers/input/image";
import Input from "@/app/components/orthers/input/input";
import TextArea from "@/app/components/orthers/input/textArea";
import Radio from "@/app/components/orthers/radio/radio";
import InputList from "@/app/components/orthers/input/inputList";
import InputFile from "@/app/components/orthers/input/file";
import Checkbox from "@/app/components/orthers/checkbox/checkbox";
import useSettings from "@/contexts/settings/settings";
import useData from "@/contexts/datas/data";
import showAlert from "@/app/components/orthers/alert/alert";
//
const { width: SCREEN_WIDTH } = Dimensions.get('window'); // Lấy chiều rộng màn hình
const CreateClub=({navigation}: { navigation: any })=>{
    // @ts-ignore
    const {theme,setLoad,lang}=useSettings();
    const {data,setData}=useData();
    const {create}=ClubVM();
    const [state,setState]=useState(0);
    const [image,setImage]=useState(null);
    const [fileTern,setFileTern]=useState(null);
    const [fileRegulation,setFileRegulation]=useState(null);
    const [name,setName]=useState("");
    const [sort,setSort]=useState("");
    const [orientation,setOrientation]=useState("");
    const [full,setFull]=useState("");
    const [lecturer,setLecturer]=useState("");
    const [members,setMembers]=useState([]);
    // trang thai nhap thong tin
    const [lecturerOption,setLecturerOption]=useState(false);
    const [memberOption,setMembersOption]=useState(false);
    const [tern,setTern]=useState(false);
    const x=useSharedValue(0);
    useEffect(()=>{
        x.value=withTiming(state*SCREEN_WIDTH,{duration:700});
    },[state])
    const animate=useAnimatedStyle(()=>{
        return {
            transform: [{ translateX: -x.value }]
        }
    });
    //
    const options=[
        {
            value:false,
            label:lang.create.club.lect.options.false,
        },
        {
            value:true,
            label:lang.create.club.lect.options.true,
        }
    ]
    const options2=[
        {
            value:false,
            label:lang.create.club.managers.options.false,
        },
        {
            value:true,
            label:lang.create.club.managers.options.true,
        }
    ]
    //
    const submit= async ()=>{
        const request={name,sort,full,orientation,lecturer,
            members,image,fileTern,fileRegulation,
            lecturerOption,memberOption};
        setLoad(true);
        const {status,message,newData,club_id}= await create(request,data?.request??[]);
        console.log(status,newData);
        setLoad(false);
        if(status) {
            setData({...data,request:newData});
            navigation.replace('club-request-detail', {'club_id': club_id});
            return;
        }
        const mes={status:lang.notification.status,message:lang.notification.message.error[message]};
        showAlert(mes);
    }
    return (
        <View style={style.container}>
            <View style={style.top}>
                <State state={state} />
                <KeyboardAvoidingView style={[style.form]}
                                      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                                      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
                    <Animated.View style={[style.form_state,animate]}>
                        <ScrollView style={style.form_input}>
                            <ImageInput image={image} set={setImage}/>
                            <Input value={name} set={setName} title={lang.create.club.name.title} des={lang.create.club.name.des}/>
                            <Input value={orientation} set={setOrientation} title={lang.create.club.orien.title} des={lang.create.club.orien.des}/>
                            <Input value={sort} set={setSort} title={lang.create.club.sort.title} des={lang.create.club.sort.des}/>
                            <TextArea value={full} set={setFull} title={lang.create.club.full.title} des={lang.create.club.full.des}/>
                        </ScrollView>
                        <ScrollView style={style.form_input}>
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
                        </ScrollView>
                        <View style={style.form_input}>
                            <ScrollView>
                                <InputFile title={lang.create.club.file.tern} des={lang.create.club.file.ternDes}
                                            file={fileTern} set={setFileTern} />
                                <InputFile title={lang.create.club.file.regular} des={lang.create.club.file.regularDes}
                                           file={fileRegulation} set={setFileRegulation} />
                            </ScrollView>
                            <Checkbox title={lang.create.club.policy}
                                      check={tern} setCheck={()=>setTern(!tern)}/>

                        </View>
                    </Animated.View>
                </KeyboardAvoidingView>
            </View>
            <View style={style.bottom}>
                <TouchableOpacity disabled={state>0?false:true} style={style.pre} onPress={()=>{
                    let temp=state;
                    if(temp>0){
                        temp-=1;
                    }
                    setState(temp)
                }} >
                    <Text style={style.textbtn} >{lang.create.club.btn.pre}</Text>
                </TouchableOpacity>

                {state<2&&<TouchableOpacity style={[{backgroundColor:theme.icon.main},style.next]} onPress={() => {
                    let temp = state;
                    if (temp < 2) {
                        temp += 1;
                    }
                    setState(temp)
                }}>
                    <Text style={style.textbtn}>{lang.create.club.btn.next}</Text>
                </TouchableOpacity>}
                {state==2&&<TouchableOpacity onPress={submit} disabled={tern?false:true}
                                             style={[{backgroundColor: tern?theme.icon.main:theme.icon.th3},style.next]}>
                    <Text style={style.textbtn}>{lang.create.club.btn.submit}</Text>
                </TouchableOpacity>}
            </View>
        </View>
    )
}
//
export default React.memo(CreateClub);
//
const style=StyleSheet.create({
    container:{
        flex: 1,
        paddingTop:10,
        backgroundColor:'white',
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'flex-start',
        overflow:'hidden'
    },
    top:{
        flex:1,
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'flex-start',
    },
    form:{
        width:'100%',
        height:'90%',
        justifyContent:'flex-start',
        alignItems:'flex-start',
    },
    form_state:{
        paddingTop: 15,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'flex-start',
        width:'300%',
    },
    form_input:{
        paddingHorizontal:10,
        width:'33%',
        minHeight:'100%'
        // backgroundColor:'lightgray'
    },
    bottom:{
        width:'100%',
        height:'10%',
        flexDirection:'row',
        paddingTop:10,
        paddingHorizontal:'5%',
        justifyContent:"space-between",
        alignItems:'center',
        backgroundColor:'white',
    },
    next:{
        width:'60%',
        paddingHorizontal:20,
        paddingVertical:10,
        borderRadius:10,
    },
    pre:{
        width:'34%',
        paddingHorizontal:20,
        paddingVertical:10,
        borderRadius:10,
        backgroundColor:'#dddddd'
    },
    textbtn:{
        color:'white',
        textAlign:'center'
    },
    inputForm:{
        width:'100%',
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
    textArea:{
        minHeight:100
    }
})