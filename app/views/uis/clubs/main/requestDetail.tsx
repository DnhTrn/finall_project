import {View} from "react-native";
import React, {useEffect, useState} from "react";
import {useRoute} from "@react-navigation/core";
import ClubRegisterVM from "@/app/viewModels/clubRegisterVM/clubRegisterVM";
import FullClub from "@/app/components/skeletons/fullClub"
import Content from "@/app/components/club/items/detail/request/content";
import useData from "@/contexts/datas/data";

const RequestDetail=()=>{
    const [club,setClub]=useState(null);
    const {data,setData}=useData();
    const router:any = useRoute();
    useEffect(() => {
        const fetch:any= async ()=>{
            try {
                const {club_id}:any=router.params;
                const current=data.request.find((item:any)=>item.id==club_id);
                setClub(current);
            }catch (e) {
                console.error(e);
                setClub(null);
            }
        }
        fetch();
    }, [data]);
    return (
        <View style={{flex:1}}>
            {!club&&<FullClub/>}
            {club&&<Content club={club}/>}
        </View>
    )
}
//
export default React.memo(RequestDetail);