import React, {useEffect, useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import useSettings from "@/contexts/settings/settings";
import {Feather, Ionicons, SimpleLineIcons} from "@expo/vector-icons";
import Input from "@/app/components/orthers/input/input";
import EventVM from "@/app/viewModels/eventVM/eventVM";
import useData from "@/contexts/datas/data";
import showAlert from "@/app/components/orthers/alert/alert";
import confirmAlert from "@/app/components/orthers/alert/confirm";

const EventAction=()=>{
    const {data,setData}=useData();
    const [value,setValue]=useState(null);
    const [load,setLoad]=useState(true);
    const [check,setCheck]=useState(false);
    const {theme,setLoad:setLoading,lang}=useSettings();
    const {checkAction,attendance,join,left:leftVM}=EventVM();
    const [code,setCode]=useState("");
    useEffect(() => {
        const fetch=async ()=>{
            try{
                const {status,value}=await checkAction(data?.currentEvent?.id);
                console.log(value);
                if(status){
                    setValue(value);
                    setLoad(false);
                }
            }catch (e) {
                console.log('UI: '+e);
            }
        }
        if(load){
            fetch();
        }
    }, [load]);
    //
    const handleCheckAttendance=()=>{
        // @ts-ignore
        if(!value?.check){
            showAlert({status:'Notification',message:'The event is not yet open for attendance.'});
            return;
        }
        setCheck(true);
    }
    // ham diem danh
    const handleSubmit=async ()=>{
        try{
            setLoading(true);
            const {status}=await attendance(data?.currentEvent?.id,code);
            setLoading(false);
            setLoad(true);
            if(!status){
                showAlert({status:'Notification',message:'The attendance code is not correct.'});
                return;
            }
            // @ts-ignore
            setValue({...value,attendance:true});
        }catch (e) {
            console.log('UI: '+e);
        }
    }
    // ham tham gia su kien
    const handleJoin=async ()=>{
        try{
            setLoading(true);
            const {status}=await join(data?.currentEvent);
            setLoading(false);
            setLoad(true);
        }catch (e) {
            console.log('UI: '+e);
        }
    }
    // left function
    const left=async ()=>{
        try{
            setLoading(true);
            await leftVM(data.currentEvent?.id);
            setLoading(false);
            setLoad(true);
        }catch (e) {
            console.log('UI: '+e);
        }
    }
    // handle left event
    const handleLeft=async ()=>{
        const messages={
            status:lang.notification.status,
            message:'You definitely want to skip this event.',
            cancel:'Cancel',
            success:'Left'
        }
        confirmAlert(messages,left)
    }
    return (
        <View style={style.container}>
            {load&&<Text style={[{backgroundColor:theme.icon.th3},{width:'100%'},style.btn_text]}>Loading...</Text>}
            {/*@ts-ignore*/}
            {!load&&!value?.open&&<Text style={[{backgroundColor:theme.icon.th3},{width:'100%'},style.btn_text]}>The event is not yet open.</Text>}
            {/*@ts-ignore*/}
            {!load&&value?.open&&!value?.join&&<TouchableOpacity onPress={handleJoin} style={[{backgroundColor:theme.icon.main},{width:'100%'},style.btn]}>
                <Text style={[{color:theme.text.th3},style.btn_text]}>Join</Text>
            </TouchableOpacity>}
            {/*@ts-ignore*/}
            {!load&&value?.open&&value?.join&&!value?.attendance&&!value?.close&&<View style={style.warper}>
                {!check&&<TouchableOpacity onPress={handleLeft} style={[{backgroundColor: theme.icon.th3}, {width: '49%'}, style.btn]}>
                    <Text style={[{color: theme.text.th3}, style.btn_text]}>Left</Text>
                </TouchableOpacity>}
                {!check&&<TouchableOpacity onPress={handleCheckAttendance}
                                   style={[{backgroundColor: theme.icon.main}, {width: '49%'}, style.btn]}>
                    <Text style={[{color: theme.text.th3}, style.btn_text]}>Attendance</Text>
                </TouchableOpacity>}
                {check&&<View style={style.attendance}>
                    <Input title={'Input attendance code'} value={code} set={setCode} type={'text'} des={'Attendance codes are provided by the event organizing club and are time-limited.'}/>
                    <View style={style.warper}>
                        <TouchableOpacity onPress={()=>setCheck(false)} style={[{backgroundColor: theme.icon.th3}, {width: '49%'}, style.btn]}>
                            <Text style={[{color: theme.text.th3}, style.btn_text]}>Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleSubmit} style={[{backgroundColor: theme.icon.main}, {width: '49%'}, style.btn]}>
                            <Text style={[{color: theme.text.th3}, style.btn_text]}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>}
            </View>}
            {/*@ts-ignore*/}
            {!load&&value?.open&&value?.join&&value?.attendance&&<View style={[{backgroundColor:theme.icon.done},{width:'100%'},style.missing]}>
                <Feather style={{marginRight:5}} name="check-square" size={16} color={theme.text.th3} />
                <Text style={[{color:theme.text.th3},style.btn_text]}>Done</Text>
            </View>}
            {/*@ts-ignore*/}
            {!load&&value?.open&&value?.join&&!value?.attendance&&value?.close&&<View style={[{backgroundColor:theme.icon.dismiss},{width:'100%'},style.missing]}>
                <SimpleLineIcons style={{marginRight:5}} name="close" size={16} color={theme.text.th3} />
                <Text style={[{color:theme.text.th3},style.btn_text]}>Missing</Text>
            </View>}
        </View>
    )
}
export default React.memo(EventAction);
//
const style=StyleSheet.create({
    container:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    btn:{
        borderRadius:10
    },
    btn_text:{
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        fontSize:14,
        paddingVertical:10,
        borderRadius:10
    },
    warper:{
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
    },
    attendance:{
        width:'100%',
        justifyContent:'flex-start',
        alignItems:'flex-start',
    },
    missing:{
        borderRadius:10,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    }
})
