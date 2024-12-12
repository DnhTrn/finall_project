import {ScrollView} from "react-native";
import React, {useEffect, useState} from "react";
import SortClub from "@/app/components/skeletons/sortClub";
import clubVM from "@/app/viewModels/clubVM/clubVM";
import Sort from "@/app/components/club/items/sort";
import Preview from "@/app/components/club/items/preview/preview";
import useData from "@/contexts/datas/data";

const List=()=>{
    const [visible,setVisibale]=useState(false);
    const [choose,setChoose]=useState(null);
    const {index}=clubVM();
    const {data,setData}=useData();
    useEffect(() => {
        const fetch= async ()=>{
            try{
                const response=await index();
                if(!response)return;
                // @ts-ignore
                setData({...data,clubs:response});
            }catch (e){

            }
        }
        fetch();
    }, []);
    return (
        <ScrollView style={{flex:1}}>
            {!data?.clubs&&<SortClub/>}
            {
                // @ts-ignore
                data?.clubs&&data?.clubs.map((club:any,key:number)=><Sort club={club} index={key} choose={()=>setChoose(club)} set={setVisibale} key={key} />)
            }
            <Preview visible={visible} club={choose} onClose={()=>setVisibale(false)}/>
        </ScrollView>
    );
}
//
export default  React.memo(List);