import {StyleSheet, Text, View} from "react-native";
import React from "react";
import useSettings from "@/contexts/settings/settings";
import checkProcess from "@/constants/handles/checkProcess";
import {Switch} from "react-native-paper";
import {backgroundColor} from "react-native-calendars/src/style";
import Slider from "@react-native-community/slider";

const State=({event,status,setStatus,process,setProcess}:any)=>{
    const {theme}=useSettings();
    return (
        <View style={style.info}>
            <View style={style.state}>
                <Text style={style.state_text}>Status:</Text>
                {/*@ts-ignore*/}
                <View style={style.state_wrap}>
                    <Text style={[{backgroundColor: theme.status[0]}, style.state_value]}>Disable</Text>
                    <Switch style={[style.switch]} color={status ? theme.icon.main : 'white'} value={status} onValueChange={setStatus}/>
                    <Text style={[{backgroundColor: theme.status[1]}, style.state_value]}>Active</Text>
                </View>
            </View>
            <View style={style.state}>
                <View style={style.state_wrap}>
                    <Text style={style.state_text}>Progress:</Text>
                    <Text numberOfLines={2} style={[{backgroundColor: theme.progress[checkProcess(process).state]}, style.state_process]}>{checkProcess(process).status}</Text>
                </View>
                <Slider
                    style={style.slider}
                    minimumValue={5} // Giá trị nhỏ nhất
                    maximumValue={100} // Giá trị lớn nhất
                    value={process} // Giá trị ban đầu
                    onValueChange={(val) => setProcess(val.toFixed(0))} // Sự kiện thay đổi giá trị
                    minimumTrackTintColor={theme.icon.main} // Màu thanh trước nút
                    maximumTrackTintColor="#e0e0e0" // Màu thanh sau nút
                    thumbTintColor={theme.icon.main} // Màu nút kéo
                    shouldRasterizeIOS={true}
                />
            </View>
        </View>
    )
}
//
export default React.memo(State)
//
const style = StyleSheet.create({
    info:{
        marginTop:5,
        width:'100%',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        flexDirection:'row'
    },
    state_text:{
        fontSize:14
    },
    status:{
        width:'45%',
        justifyContent:'flex-start',
        alignItems:'flex-start',
    },
    slider:{
        width:'100%'
    },
    state:{
        marginBottom:10,
        width:'50%',
        justifyContent:'flex-start',
        alignItems:'flex-start',
    },
    state_wrap:{
        width:'100%',
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row',
        marginBottom:5
    },
    state_value:{
        color:'white',
        paddingVertical:6,
        fontSize:12,
        paddingHorizontal:10,
        textAlign:'center',
        borderRadius:6
    },
    state_process:{
        color:'white',
        paddingVertical:6,
        fontSize:12,
        paddingHorizontal:10,
        textAlign:'center',
        borderRadius:6,
        marginLeft:5,
    },
    switch:{
        marginHorizontal:5
    }
})