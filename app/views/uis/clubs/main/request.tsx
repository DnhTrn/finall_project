import {ScrollView, View} from "react-native";
import React, {useEffect, useState} from "react";
import ClubRegisterVM from "@/app/viewModels/clubRegisterVM/clubRegisterVM";
import SortClub from "@/app/components/skeletons/sortClub";
import Requested from "@/app/components/club/items/requested";
import useData from "@/contexts/datas/data";

const Request=()=>{
    const {index}=ClubRegisterVM();
    const {data,setData}=useData();
    useEffect(() => {
        const fetch=async ()=>{
            try{
                const response=await index();
                if(!response)return;
                // console.log(data);
                setData({...data,request:response});
            }catch (e) {
                console.log(e);
            }
        }
        fetch();
    }, []);
    return (
        <ScrollView >
            {!data?.request&&<SortClub/>}
            {/*//@ts-ignore*/}
            {data?.request&&data?.request.map((club:any,key:number)=><Requested club={club} key={key} />)}
        </ScrollView>
    );
}
// /
export default React.memo(Request);