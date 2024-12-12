import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Modal from "react-native-modal";
import React, {useState} from "react";
import {WINDOW_HEIGHT} from "@gorhom/bottom-sheet";
import useSettings from "@/contexts/settings/settings";
import Select from "@/app/components/club/items/users/select";
import Search from "@/app/components/orthers/input/search";
import useData from "@/contexts/datas/data";
import clubVM from "@/app/viewModels/clubVM/clubVM";

const AddManager=({visible,set}:any)=>{
    const {theme,setLoad}=useSettings();
    const {data,setData}=useData();
    const [choose,setChoose]=useState([]);
    const {addManager}=clubVM();
    //
    const handle=async()=>{
        try{
            setLoad(true);
            const temp=data;
            const {status,message,newData}=await addManager(choose,temp,temp?.club?.id);
            setLoad(false);
            if(!status){
                console.log(message);
                return;
            }
            set(false);
            setData(newData);
        }catch (e) {

        }
    }
    return (
        <Modal
            isVisible={visible}
            style={style.modal}
            onBackdropPress={()=>set(false)} // Nhấn vào vùng ngoài để đóng modal
            onSwipeComplete={()=>set(false)}
            backdropOpacity={0.25} // Độ mờ của nền
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
                <Search/>
                <ScrollView>
                    {
                        Array.from(data?.members).map((item:any,key:any)=><Select index={key} user={item} choose={choose} set={setChoose} key={key}/>)
                    }
                </ScrollView>
                <TouchableOpacity disabled={choose.length>0?false:true} onPress={handle}
                  style={[{backgroundColor:choose.length>0?theme.icon.main:theme.icon.th3},style.btn]}>
                    <Text style={[{color:theme.text.th3},style.btn_text]}>Add</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}
//
export default React.memo(AddManager);
//
const style=StyleSheet.create({
    modal:{
        flex:1,
        justifyContent:'flex-end',
        margin:0
    },
    modal_view:{
        height:WINDOW_HEIGHT*0.4,
        borderRadius:15,
        padding:15
    },
    btn:{
        marginTop:10,
        width:'100%',
        borderRadius:15,
        paddingVertical:10,
        marginBottom:5
    },
    btn_text:{
        textAlign:'center',
    }
})