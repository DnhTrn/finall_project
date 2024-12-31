// @ts-nocheck
import {Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Modal from "react-native-modal";
import {Entypo} from "@expo/vector-icons";
import React, {useState} from "react";
import {WINDOW_HEIGHT} from "@gorhom/bottom-sheet";
import ClubApplyVM from "@/app/viewModels/clubApplyVM/clubApplyVM";
import {useNavigation} from "@react-navigation/core";
import Head from "@/app/components/club/items/detail/head";
import DetailScreen from "@/app/viewModels/viewVM/clubs/detailScreen";
import useSettings from "@/contexts/settings/settings";
import useData from "@/contexts/datas/data";
import Confirm from "@/app/components/orthers/alert/confirm";
import InforContent from "@/app/components/club/items/detail/info/inforContent";
import Events from "@/app/components/club/items/detail/events";
import Add from "@/app/views/uis/clubs/main/add";

const Content=()=>{
    const {data,setData}=useData();
    const [show,setShow]=useState(false);
    const {revo}=ClubApplyVM();
    const navigation=useNavigation();
    // @ts-ignore
    const {theme,lang,setLoad}=useSettings();
    // ham xu ly khi thoat cau lac bo
    const handlLeft =()=>{
        Alert.alert(
            "Notification",
            "You sure to want left the club?",
            [
                {
                    text: "Cancel",
                    onPress: () => setShow(false),
                    style: "cancel"
                },
                {
                    text: "Left",
                    onPress: () => console.log("OK Pressed"),
                    style: "default"
                }
            ]
        );
    }
    // ham xu ly thu hoi yeu cau tham gia cau lac bo
    const handlRevo=()=>{
        const handle=async () => {
            try{
                setLoad(true);
                const temp:any=data;
                const {status,message,newData}= await revo(data?.club.id,temp);
                setLoad(false);
                setShow(false);
                if(!status) {
                    console.log(message);
                    return;
                }
                setData(newData);

            }catch (e) {
                console.log(e);
            }
        }
        const messages={
            status:lang.notification.status,
            message:'You sure to want revocation of a join request the club?',
            cancel:'Cancel',
            success:'Revocation'
        }
        Confirm(messages,handle);
    }
    return(
        <>
            <ScrollView style={[{backgroundColor:theme.background.main,flex:1}]}>
                <Head set={setShow}/>
                {/*@ts-ignore*/}
                {data?.isMember&&
                    <>
                        <DetailScreen/>
                        <Events/>
                    </>
                }
                {!data?.isMember&&
                    <InforContent/>
                }
                <Modal isVisible={show} style={style.modal}
                       onBackdropPress={()=>setShow(false)} // Nhấn vào vùng ngoài để đóng modal
                       onSwipeComplete={()=>setShow(false)}
                       backdropOpacity={0.4} // Độ mờ của nền
                       hasBackdrop={true} // Bật nền
                       avoidKeyboard={true} // Tránh keyboard che modal
                       useNativeDriverForBackdrop={true} // Sử dụng native driver
                       animationInTiming={400} // Thời gian animation khi mở
                       animationOutTiming={400} // Thời gian animation khi đóng
                       backdropTransitionInTiming={200} // Thời gian animation nền khi mở
                       backdropTransitionOutTiming={200} // Thời gian animation nền khi đóng
                       propagateSwipe={true} // Cho phép swipe để đóng modal
                       swipeDirection={['down']} >
                    <View style={[{backgroundColor:theme.background.main},style.container]}>
                        {data?.isRequest&&<TouchableOpacity onPress={handlRevo} style={[style.btn]}>
                            <Entypo name={'log-out'} size={24}/>
                            <Text style={style.text_btn}>Revocation of a join request</Text>
                        </TouchableOpacity>}
                        {data?.isMember&&<TouchableOpacity onPress={handlLeft} style={[style.btn]}>
                            <Entypo name={'log-out'} size={24}/>
                            <Text style={style.text_btn}>Left</Text>
                        </TouchableOpacity>}
                    </View>
                </Modal>
            </ScrollView>
            {data.isManager&&<Add />}
        </>
    )
}
//
export default React.memo(Content);
//
const style=StyleSheet.create({
    modal:{
        justifyContent: 'flex-end',
        borderRadius:10,
        margin: 0,
    },
    container:{
        paddingTop:15,
        borderRadius:10,
        paddingHorizontal:15,
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        height:WINDOW_HEIGHT*0.15,
    },
    btn:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        paddingVertical:10,
        borderRadius:10
    },
    text_btn:{
        fontSize:16,
        marginLeft:10,
        textAlign:'center',
    }
})