import React, {useEffect, useState} from "react";
import {ScrollView, Text} from "react-native";
import clubVM from "@/app/viewModels/clubVM/clubVM";
import SortClub from "@/app/components/skeletons/sortClub";
import Sort from "@/app/components/club/items/sort";
import useData from "@/contexts/datas/data";

const Join=()=>{
    const [visible,setVisibale]=useState(false);
    const [chooseId,setChoose]=useState<number|null>(null);
    // @ts-ignore
    const {joined}=clubVM();
    const {data,setData}=useData();
    useEffect(() => {
        const fetch=async ()=>{
            try{
                const response=await joined();
                if(!response)return;
                // @ts-ignore
                setData({...data,join:response});
            }catch (e){
                console.log(e);
            }
        }
        fetch();
    }, []);
    return (
        <ScrollView style={{flex:1}}>
            {!data?.join&&<SortClub/>}
            {
                data?.join&&data?.join.length==0&&<Text style={{fontSize:16,marginTop:15,width:'100%',textAlign:'center'}}>You are not currently participating in any clubs.</Text>
            }
            {
                // @ts-ignore
                data?.join&&data?.join.length!=0&&data?.join.map((club:any,key:number)=><Sort club={club} choose={()=>setChoose(club)} set={setVisibale} key={key} />)
            }
        </ScrollView>
    );
}
//
export default  React.memo(Join);