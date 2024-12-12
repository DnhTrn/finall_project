import ClubRegisterModel from "@/app/models/clubRegisterModel/clubRegisterModel";
import {Alert} from "react-native";
import checkData from "@/constants/handles/checkData";

const ClubRegisterVM:any = ()=>{
    const {index:modelAll,show:modelShow,remove:removeRes,update:updateData}=ClubRegisterModel();
    //
    const index:any=async ()=>{
       try{
           return await modelAll();
       }catch (e) {
           console.log(e);
           return [];
       }
    }
    //
    const show:any= async (club_id:any)=>{
        try{
            return await modelShow(club_id);
        }catch (e) {
            console.log(e);
            return null;
        }
    }
    // xoa don dang ky
    const remove:any=async (club_id:any)=>{
        try{
            return await removeRes(club_id);
        }catch (e) {
            console.error("MV: "+e);
            return false;
        }
    }
    //
    const update:any=async (newData:object,data:any)=>{
        try{
            if(!checkData(newData)){
                return {status:false,message:'null-fields'};
            }
            const {status,club}=await updateData(newData);
            if(!status){
                return {status:false,message:'update-false'};
            }
            console.log('update data:');
            console.log(club);
            const temp:[]=data.map((item:any)=>{
                return item.id==club?.id?club:item;
            })
            return {status:true,newData:temp};
        }catch (e) {
            console.log('VM: '+e);
            return {status:false,message:'update-false'};
        }
    }
    return {index,show,remove,update};
}
//
export default ClubRegisterVM;