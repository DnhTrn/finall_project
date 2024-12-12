import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import Modal from "react-native-modal";
import {WINDOW_HEIGHT} from "@gorhom/bottom-sheet";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {AntDesign, Feather, Ionicons} from "@expo/vector-icons";
import useSettings from "@/contexts/settings/settings";
import Option from "@/app/components/club/items/users/option";
import AddManager from "@/app/views/uis/clubs/managers/member/addManager";
import useData from "@/contexts/datas/data";
import clubVM from "@/app/viewModels/clubVM/clubVM";
import addManager from "@/app/views/uis/clubs/managers/member/addManager";

const Managers=()=>{
    const {data,setData}=useData();
    const [option,setOptions]=useState(false);
    const [choose,setChoose]=useState({});
    const [visible,setVisible]=useState(false);
    //
    const {setManager}=clubVM();
    const {setLoad}=useSettings();
    //
    const handleUpdate:any=async(rule:any)=>{
        try{
            setLoad(true);
            const temp:any=data;
            const {status,message,newData}=await setManager(choose,temp,rule);
            setLoad(false);
            if(!status){
                console.log(message);
                return;
            }
            setOptions(false);
            setData(newData);
        }catch (e) {

        }
    }
    //
    //@ts-ignore
    const {theme}=useSettings();
    return (
        <View style={{flex:1}}>
            <ScrollView style={[{backgroundColor:theme.background.main}]}>
                <View style={style.top}>
                    <Text style={style.title}>Club Managers</Text>
                    <Text style={[{color:theme.text.second},style.des]}>The only master can be change club managers</Text>
                </View>

                <View style={[{borderColor:theme.border.main},style.list]}>
                    {
                        data?.managers.map((item:any,key:any)=><Option user={item} set={setChoose} change={setOptions} key={key}/>)
                    }
                </View>
                <View style={style.bottom}>
                    <TouchableOpacity onPress={()=>setVisible(true)} style={[{backgroundColor:theme.icon.main},style.add]}>
                        <Text style={[{color:theme.text.th3},style.add_text]}>Add new managers</Text>
                    </TouchableOpacity>
                    <Text style={[{color:theme.text.second},style.des]}>The limit of sub mangers is 4 and lecture is 1</Text>
                </View>
            </ScrollView>
            <Modal
                isVisible={option}
                style={style.modal}
                animationIn={'slideInUp'}
                animationOut={'slideOutDown'}
                coverScreen={true}
                onBackdropPress={()=>setOptions(false)} // Nhấn vào vùng ngoài để đóng modal
                onSwipeComplete={()=>setOptions(false)}
                backdropOpacity={0.15} // Độ mờ của nền
                hasBackdrop={true} // Bật nền
                avoidKeyboard={true} // Tránh keyboard che modal
                useNativeDriverForBackdrop={true} // Sử dụng native driver
                animationInTiming={400} // Thời gian animation khi mở
                animationOutTiming={400} // Thời gian animation khi đóng
                backdropTransitionInTiming={400} // Thời gian animation nền khi mở
                backdropTransitionOutTiming={400} // Thời gian animation nền khi đóng
                propagateSwipe={true} // Cho phép swipe để đóng modal
                swipeDirection={['down']}>
                <View style={[{backgroundColor:theme.background.main},style.modal_view]}>
                    {/*@ts-ignore*/}
                    {choose&&choose?.position_id!==2&&<TouchableOpacity onPress={()=>handleUpdate(2)} style={style.option_item}>
                        <Feather name={'shield'} size={24}/>
                        <Text style={style.option_text}>Set as Master</Text>
                    </TouchableOpacity>}
                    {/*@ts-ignore*/}
                    {choose&&choose?.position_id!==3&&<TouchableOpacity onPress={()=>handleUpdate(3)} style={style.option_item}>
                        <Ionicons name={'key-outline'} size={24}/>
                        <Text style={style.option_text}>Set as sub master</Text>
                    </TouchableOpacity>}
                    {/*@ts-ignore*/}
                    {choose&&choose?.position_id!==4&&<TouchableOpacity onPress={()=>handleUpdate(4)} style={style.option_item}>
                        <AntDesign name={'staro'} size={24}/>
                        <Text style={style.option_text}>Set as lecture</Text>
                    </TouchableOpacity>}
                </View>
            </Modal>
            <AddManager visible={visible} set={setVisible} />
        </View>
    )
}
//
const style=StyleSheet.create({
    top:{
        paddingHorizontal:15,
    },
    list:{
        paddingHorizontal:15,
        width:'100%',
        marginVertical:5,
        borderStyle:'solid',
        borderTopWidth:2,
        borderBottomWidth:2,
        paddingTop:10
    },
    title:{
        fontSize:18,
        fontWeight:'bold',
    },
    des:{
        fontSize:14,
    },
    bottom:{
        paddingHorizontal:15,
    },
    add:{
        width:'100%',
        paddingVertical:10,
        borderRadius:10,
        marginVertical:5
    },
    add_text:{
        textAlign:'center',
    },
    modal:{
        flex:1,
        margin: 0,
        justifyContent:"flex-end",
    },
    modal_view:{
        borderRadius:10,
        padding:15,
        height:WINDOW_HEIGHT*0.2,
        width:'100%',
    },
    option_item:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:10,
        justifyContent:'flex-start'
    },
    option_text:{
        alignItems:'center',
        marginLeft:10,
        fontSize:16,
    }
})
//
export default React.memo(Managers)