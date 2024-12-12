import React, {useEffect, useState} from "react";
import {StyleSheet} from "react-native";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {WINDOW_HEIGHT} from "@gorhom/bottom-sheet";
import {useRoute} from "@react-navigation/core";
import ClubVM from "@/app/viewModels/clubVM/clubVM";
import FullClub from "@/app/components/skeletons/fullClub";
import Content from "@/app/components/club/items/detail/content";
import useData from "@/contexts/datas/data";
import showAlert from "@/app/components/orthers/alert/alert";
import useSettings from "@/contexts/settings/settings";

const Detail=({navigation}:any)=>{
    const routes=useRoute();
    // @ts-ignore
    const {club_id}=routes.params;
    const {detail}=ClubVM();
    const {data,setData}=useData();
    const {lang}=useSettings();
    const [load,setLoad] = useState(true);
    useEffect(()=>{
        const fetch=async ()=>{
            try {
                const {status,message,club,isManager,isMember,isMaster,isRequest}:any=await detail(club_id);
                if(!status){
                    const mes={status:lang.notification.status,message:lang.notification.message.error[message]};
                    showAlert(mes);
                    return;
                }
                console.log(status,message,isManager,isMember,isMaster,isRequest);
                console.log('checck');
                setData({...data,club:club,isManager,isMember,isMaster,isRequest});
                setLoad(false)
            }catch (e) {
                console.log(e);
            }
        }
        fetch();
    },[])
    return (
        <GestureHandlerRootView style={{flex:1}}>
            {load&&<FullClub/>}
            {!load&&<Content/>}
        </GestureHandlerRootView>

    )
}
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
//

export default  React.memo(Detail);