import clubApplyModel from "@/app/models/clubApplyModel/clubApplyModel";
import {Timestamp} from "@firebase/firestore";
import members from "@/app/components/club/items/detail/members";

const ClubApplyVM:any=()=>{
    const {apply:modelApply,revo:modelRevo,index:modelIndex,update:modelUpdate}=clubApplyModel();
    //
    const index:any=async (club_id:any)=>{
        try{
            return await modelIndex(club_id);
        }catch (e) {
            console.log(e);
            return {
                status:false,
                message:'false-to-load',
                data:[]
            };
        }
    }
    //
    const apply:any= async (club_id:any,data:any)=>{
        try{
            const {status,message}= await modelApply(club_id);
            if(!status){
                return {status:false,message:message};
            }
            let club:any= data?.clubs.find((item:any):any=>item.id===club_id);
            club={...club,check:true};
            const clubs:any=data?.clubs.map((item:any):any=>{
                if(item?.id!==club_id){
                    return item;
                }
                return club;
            })
            let temp:any={...data,clubs:clubs};
            if(data?.club&&club_id===data?.club?.id){
                temp={...temp,club:{...temp?.club,...club},isRequest:true,isMember:false}
            }
            return {
                status:true,newData:temp,
            }
        }catch (e) {
            console.log(e);
            return {
                status:false,
                message:'false-to-load',
                data:[]
            };
        }
    }
    //
    const revo:any= async (club_id:any,data:any)=>{
        try{
            const {status,message}= await modelRevo(club_id);
            if(!status){
                return {status:false,message:message};
            }
            let club:any= data?.clubs.find((item:any):any=>item.id===club_id);
            club={...club,check:false};
            const clubs:any=data?.clubs.map((item:any):any=>{
                if(item?.id!==club_id){
                    return item;
                }
                return club;
            })
            let temp:any={...data,clubs:clubs};
            temp={...temp,club:{...temp?.club,...club},isRequest:false,isMember:false}
            console.log(temp.club);
            return {
                status:true,newData:temp,
            }
        }catch (e) {
            console.log(e);
            return {
                status:false,
                message:'false-to-load',
                data:[]
            };
        }
    }
    //
    const update:any=async (type:any,user:any,data:any)=>{
        try{
            const {status,message}=await modelUpdate(user,type,data?.club?.id);
            if(!status){
               return {status:false,message:message};
            }
            const newApply:any=data?.apply.filter((item:any)=>{
                if(item?.id!==user?.id){
                    return item;
                }
            });
            let temp:any={...data,apply:newApply};
            if(type){
                const newMembers:any=[...temp?.members,{...user,join_at:Timestamp.now(),position_id:5}];
                const newClub={...temp?.club,members:temp?.club?.members+1};
                if(temp?.join){
                    const join:any=temp.join.map((item:any)=>{
                        if(item?.id!==newClub.id){
                            return item;
                        }
                        return newClub;
                    })
                    temp={...temp,join:join};
                }
                if(temp?.clubs){
                    const clubs:any=temp.clubs.map((item:any)=>{
                        if(item?.id!==newClub.id){
                            return item;
                        }
                        return newClub;
                    })
                    temp={...temp,clubs:clubs};
                }
                temp={...temp,members:newMembers,club:newClub};
            }
            return {status:true,newData:temp}
        }catch (e) {
            console.log('VM:'+e);
            return {
                status:false,message:'false-update'
            }
        }
    }
    return {apply,revo,index,update}
}
//
export default ClubApplyVM;