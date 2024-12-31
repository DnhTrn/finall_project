import {KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import useSettings from "@/contexts/settings/settings";
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import {WINDOW_HEIGHT, WINDOW_WIDTH} from "@gorhom/bottom-sheet";
import {MaterialIcons} from "@expo/vector-icons";
import Input from "@/app/components/orthers/input/input";
import TextArea from "@/app/components/orthers/input/textArea";
import DateInput from "@/app/components/orthers/date/date";
import AuthVM from "@/app/viewModels/authVM/authVM";
import showAlert from "@/app/components/orthers/alert/alert";
import formatDate from "@/constants/handles/formatDate";
import {useNavigation} from "@react-navigation/core";

const ChangePassword=()=>{
    const nav:any=useNavigation();
    const {theme,setLoad,lang}=useSettings();
    const [step,setStep]=useState(0);
    const [user,setUser]=useState(null);
    const [data,setData]=useState(null);
    const x=useSharedValue(0);
    //
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [hidden,setHidden]=useState(true);
    //
    const [dob,setDob]=useState(new Date());
    const [address,setAddress]=useState('');
    const [major,setMajor]=useState('');
    const [phone,setPhone]=useState('');
    //
    const {changePassword,getInfo,put}=AuthVM();
    useEffect(()=>{
        x.value=withTiming(step*(WINDOW_WIDTH),{duration:700});
    },[step])
    const animate=useAnimatedStyle(()=>{
        return {
            transform: [{ translateX: -x.value }]
        }
    });
    // handle change password
    const handleChangePassword=async ()=>{
        try{
            setLoad(true);
            const {status,error}= await changePassword(password,confirmPassword);
            if(status){
                setStep(2);
                return;
            }
            setLoad(false);
            const message={status:lang.notification.status,message:lang.notification.message.changePassword[error]};
            showAlert(message);
        }catch (e) {
            console.log("UI: "+e);
        }
    }
    // handle update
    const handleUpdate=async ()=>{
        try{
            console.log(data);
            setLoad(true);
            const {status}=await put(data);
            setLoad(false);
            if(status){
                setStep(3);
                return;
            }
            const message={status:lang.notification.status,message:'Please fill in all information fields.'};
            showAlert(message);
        }catch (e) {
            console.log("UI: "+e);
        }
    }
    // trigger update data
    useEffect(() => {
        // @ts-ignore
        setData({ address,dob,major,phone})
    }, [address,dob,major,phone]);
    //trigger get user information
    useEffect(() => {
        if (step==2){
            const fetch=async ()=>{
                try{
                    if(user){
                        setLoad(false);
                        return;
                    }
                    const {status,data}=await getInfo();
                    setLoad(false);
                    if(status){
                        setUser(data);
                    }
                }catch (e) {
                    console.log("UI: "+e);
                    setLoad(false);
                }
            }
            fetch();
        }
    }, [step]);
    //
    useEffect(() => {
        // @ts-ignore
        setPhone(user?.phone??'');
        // @ts-ignore
        setAddress(user?.address??'');
        // @ts-ignore
        setMajor(user?.major??'');
        // @ts-ignore
        if(!user?.dob){
            return;
        }
        // @ts-ignore
        console.log(formatDate(user?.dob));
        // @ts-ignore
        let date=formatDate(user?.dob).split('-');
        // @ts-ignore
        date=new Date(`${date[2]}-${date[1]}-${date[0]}`)
        // @ts-ignore
        setDob(date);
    }, [user]);
    // trigger change with step
    const handle=async ()=>{
        switch (step){
            case 0:
                setStep(1);
                break;
            case 1:
                await handleChangePassword();
                break;
            case 2:
                await handleUpdate();
                break;
            case 3:
                // @ts-ignore
                nav.replace('main');
        }
    }
    return (
        <View style={[{backgroundColor:theme.background.main},style.container]}>
            <Animated.View style={[animate,style.content]}>
                <View style={style.view}>
                    <Text style={[{color:theme.title.main},style.hi]}>Hi!</Text>
                    <Text style={[{color:theme.text.main,fontSize: 18},style.text]}>It seems this is your first time coming to us.</Text>
                    <Text style={[{color:theme.text.second,fontSize: 12},style.text]}>To continue experiencing the software, please follow the next steps to set up your account!</Text>
                </View>
                <KeyboardAvoidingView style={[{backgroundColor:theme.background.main},style.container]}
                                      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                                      keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}>
                    <View style={style.view}>
                        <Text style={[{color:theme.title.main,fontSize:28},style.text]}>First! let change your password.</Text>
                        <Text style={[{color:theme.text.second,fontSize: 12,marginBottom:20},style.text]}>The new password will be used from your next visit.</Text>
                        <Input hidden={hidden} value={password} set={setPassword} type='password'
                               place={'Type new password'} title={'Password'}/>
                        <Input hidden={hidden} value={confirmPassword} set={setConfirmPassword} type='password'
                               place={'Type confirm password'} title={'Confirm password'}/>
                        <TouchableOpacity style={style.show_password} onPress={()=>setHidden(!hidden)}>
                            <View style={hidden?style.hidden:style.show}/>
                            <Text>{hidden?'Show':'Hidden'}</Text>
                        </TouchableOpacity>
                        <Text style={[style.text,{color:theme.text.second,fontSize: 12,marginBottom:20,textAlign: 'left'}]}>The new password must have at least 8 characters including at least one capital letter and one special character.</Text>
                    </View>
                </KeyboardAvoidingView>
                <KeyboardAvoidingView style={[{backgroundColor:theme.background.main},style.container]}
                                      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                                      keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}>
                    <ScrollView style={style.scroll} showsVerticalScrollIndicator={false}>
                        <Text style={[{color:theme.title.main,fontSize:24},style.text]}>Finally! checking your information!</Text>
                        <Text style={[{color:theme.text.second,fontSize: 12,marginBottom:30},style.text]}>Confirm that the information has been updated in the system and supplement information if there is any missing or incorrect information.</Text>
                        <View style={style.date}>
                            <Text style={style.inputTitle}>Date of birth:</Text>
                            <DateInput value={dob} set={setDob}/>
                        </View>
                        <Input value={major} set={setMajor} type='text'
                               place={'Type your major'} title={'Major'}/>
                        <Input value={phone} set={setPhone} type='text'
                               place={'Type your phone number'} title={'Phone number'}/>
                        <TextArea value={address} set={setAddress} type='text'
                               place={'Type your address'} title={'Address'}/>
                    </ScrollView>
                </KeyboardAvoidingView>
                <View style={style.view}>
                    <Text style={[{color:theme.title.main},style.hi]}>Done!</Text>
                    <Text style={[{color:theme.text.main,fontSize: 18},style.text]}>Let's experience wonderful moments together.</Text>
                    <Text style={[{color:theme.text.second,fontSize: 12},style.text]}>You have completed updating your personal information, or enjoying the experiences we bring to you.</Text>
                </View>
            </Animated.View>
            {step==0&&<View style={style.active}>
                <TouchableOpacity onPress={()=>setStep(1)} style={[style.btn]}>
                    <Text style={{color: theme.title.main,fontSize:18}}>Next</Text>
                    <MaterialIcons name="navigate-next" size={24} color={theme.title.main} />
                </TouchableOpacity>
            </View>}
            {step!=0&&<View style={style.active1}>
                <TouchableOpacity onPress={()=>setStep(step-1)} style={[style.btn]}>
                    <MaterialIcons name="arrow-back-ios" size={18} color={theme.text.second} />
                    <Text style={{color: theme.icon.second}}>Pre</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handle} style={[style.btn]}>
                    <Text style={{color: theme.title.main,fontSize:18}}>Next</Text>
                    <MaterialIcons name="navigate-next" size={24} color={theme.title.main} />
                </TouchableOpacity>
            </View>}
        </View>
    )
}
export default React.memo(ChangePassword);
//
const style=StyleSheet.create({
    container:{
        flex:1
    },
    content:{
        flex:1,
        width:'400%',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'flex-start'
    },
    inputTitle:{
        color:'black',
        fontSize:14,
        fontWeight:'bold',
    },
    date:{
        width:'100%',
        height:50,
        flexDirection:'row',
        marginBottom:5,
        justifyContent:'flex-start',
        alignItems:'center'
    },
    view:{
        flex:1,
        width:'100%',
        paddingHorizontal:15,
        height:WINDOW_HEIGHT*0.8,
        justifyContent:'center',
        alignItems:'center'
    },
    form:{
      width:'100%',
    },
    scroll:{
        flex:1,
        width:'100%',
        paddingTop:100,
        paddingHorizontal:15,
        height:WINDOW_HEIGHT*0.8,
    },
    hi:{
        fontSize:42,
        width:'100%',
        textAlign:'center',
        fontWeight:'bold'
    },
    text:{
        width:'100%',
        marginBottom:5,
        textAlign:'center',
    },
    active:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center',
    },
    active1:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    btn:{
        width:150,
        height:45,
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    },
    show:{
        width:15,
        height:15,
        borderWidth:1,
        marginRight:10,
        borderStyle:'solid',
        borderColor:'lightgray',
        borderRadius:10,
        backgroundColor:'#4082FF'
    },
    hidden:{
        width:15,
        height:15,
        borderWidth:1,
        marginRight:10,
        borderStyle:'solid',
        borderColor:'lightgray',
        borderRadius:10,
        backgroundColor:'white',
    },
    show_password:{
        flexDirection:'row',
        width:'100%',
        alignItems:'center',
        justifyContent:'flex-start',
        marginBottom:10
    },
})