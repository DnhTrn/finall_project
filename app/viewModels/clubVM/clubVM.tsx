import ClubModel from "@/app/models/clubModel/ClubModel";
import {Alert} from "react-native";
import checkData from "@/constants/handles/checkData";
import managers from "@/app/views/uis/clubs/managers/member/managers";
import member from "@/app/views/uis/clubs/managers/member/member";
import {parseJson} from "ajv/dist/runtime/parseJson";
import message = parseJson.message;

const ClubVM:any=()=>{
    // @ts-ignore
    const {index:modelIndex,joined:modelJoined,
        create:modelCreate,detail:modelDetail,
        update:updateModel,getMembers,
        addManager:addModel,setManager:modelSet,
        removeMember:modelRemove}=ClubModel();

    const index:any=async ()=>{
        try{
            return await modelIndex();
        }catch(e){
            return [];
        }
    }
    // lay cac cau lac bo nguoi dung da tham gia
    const joined:any=async ()=>{
        try{
            console.log('joined check');
            return await modelJoined();
        }catch (e) {
            console.log(e);
            return [];
        }
    }
    // tao cau lac bo
    const create:any= async (request:object,data:any)=>{
        try{
            //@ts-ignore
            if(!checkData(data)){
                return {status:false,message:'null-fields'};
            }
            const {status,club}=await modelCreate(request);
            console.log('/');
            console.log(data);
            console.log('/');
            const newData=[...data,club]
            return {status:status,newData:newData,club_id:club?.id};
        }catch (e){
            console.log(e);
            return {status:false,message:'create-false'};
        }
    }
    //
    const detail:any=async (club_id:any)=>{
        try{
            const res:any=await modelDetail(club_id);
            return res;
        }catch (e) {
            console.log("CLUBVM: "+e);
            return {status:false,message:'false-get-data'};
        }
    }
    // updateData
    const update:any=async (updateData:object,data:any)=>{
        try{
            if(!checkData(updateData)){
                return {status:false,message:'null-fields'};
            }
            const {status,message,club}=await updateModel(updateData);
            if(!status){
                return {status:false,message:message};
            }
            let temp={...data,club:{...data?.club,...club}};
            if(temp.join){
                const join=temp?.join.map((item:any)=>{
                    if(item.id===club.id){
                        return {...item,...club};
                    }
                    return item;
                })
                temp={...temp,join:join};
            }
            if(temp.clubs){
                const clubs=temp?.clubs.map((item:any)=>{
                    if(item.id===club.id){
                        return {...item,...club};
                    }
                    return item;
                })
                temp={...temp,clubs:clubs};
            }
            return {status:true,newData:temp}
        }catch (e) {
            console.log('VM: '+e);
            return {status:false,message:'false-update'};
        }
    }
    //
    const members:any=async (club_id:any)=>{
        try{
            console.log(club_id);
            return await getMembers(club_id);
        }catch (e) {
            console.log(e);
            return {
                status:false,
                message:'false-to-load',
                managers:[],
                mems:[]
            };
        }
    }
    //them thanh vien vao ban quan tri
    const addManager:any= async (list:any,data:any,club_id:any)=>{
        try{
            if(list.length+data?.managers.length>6){
                return {
                    status:false,
                    message:'manager-limit',
                }
            }
            const {status,message}= await addModel(list,club_id);
            if(!status){
                return {status:false,message:message};
            }
            const members:any=data?.members.filter((member:any)=> {
                const check:any=list.find((item:any)=>item.user_code==member.user_code);
                if(!check){
                    return member;
                }
            });
            const temp:any=list.map((item:any)=>({...item,position_id:3}));
            return {
                status:true,
                newData:{...data,members:members,managers: [...data?.managers,...temp]}
            };
        }catch (e) {
            console.log('club vm:'+e);
            return {status:false,message:'false-to-update'};
        }

    }
    // ham xoa bo khoi ban quan tri
    const removeManager:any=async (user:any,data:any)=>{
        try{
            let check:boolean=false;//check rermove master
            if(user?.position_id==2){
                check=true;
            }
            // check master role
            if(check){
                let count:number=0;
                data?.managers.forEach((item:any)=>{
                    if(item.position_id==2){
                        count+=1;
                    }
                })
                if(count <=1){
                    return {status:false,message:'limit-master'};
                }
            }
            //
            const {status,message}=await modelSet(user,5,data?.club?.id);
            if(!status){
                return {status:false,message:message};
            }
            // cap nhap lai danh sach thanh vien
            const members:any=[...data.members,{...user,position_id:5}];
            // cap nhap lai danh sach ban quan ly
            const managers:any=data.managers.filter((item:any)=> {
                if(item?.user_code !== user?.user_code){
                    return item;
                }
            });
            return {
                status:true,
                newData:{...data,members:members,managers:managers}
            }
        }catch (e) {
            return {status:false,message:'false-update'};
        }

    }
    // setManeger
    const setManager:any= async (user:any,data:any,rule:any)=>{
        try{
            let count:number=0;
            data?.managers.forEach((item:any)=>{
                if(item.position_id==rule){
                    count+=1;
                }
            })
            if(rule===2&&count>=2){
                return {status:false,message:'master-limit'};
            }
            if(rule===3&&count>=4){
                return {status:false,message:'sub-master-limit'};
            }
            if(rule===4&&count>=1){
                return {status:false,message:'lecture-limit'};
            }
            const {status,message}=await modelSet(user,rule,data?.club?.id);
            if(!status){
                return {status:false,message:message};
            }
            // cap nhap lai danh sach thanh vien

            const managers:any=data?.managers.map((item:any)=> {
                if(item?.user_code === user?.user_code){
                    return {...item,position_id:rule};
                }
                return item;
            });
            return {
                status:true,
                newData:{...data,managers:managers}
            }
        }catch (e) {
            console.log('VM:'+e);
            return {
                status:false,message:'false-update'
            }
        }
    }
    //
    const removeMember:any=async (list:any,data:any)=>{
        try{
            console.log(list);
            const {status,message}=await modelRemove(list,data?.club?.id);
            if(!status){
                return {status:false,message:message};
            }
            const members:any=data?.members.filter((item:any)=> {
                const check:any=list.find((member:any)=>member.user_code==item.user_code);
                if(!check){
                    return item;
                }
            });
            console.log('members:');
            console.log(members);
            const newClub={...data?.club,members:data?.club?.members-list.length};
            let temp:any ={...data,members:members,
                club:newClub};
            if(temp.join){
                const join=temp?.join.map((item:any)=>{
                    if(item.id===newClub.id){
                        return newClub;
                    }
                    return item;
                })
                temp={...temp,join:join};
            }
            if(temp.clubs){
                const clubs=temp?.clubs.map((item:any)=>{
                    if(item.id===newClub.id){
                        return newClub;
                    }
                    return item;
                })
                temp={...temp,clubs:clubs};
            }
            return {
                status:true,
                newData:temp
            }
        }catch (e) {
            console.log(e);
            return {
                status:false,
                message:'false-update'
            }
        }
    }
    return {
        index,
        joined,
        create,
        detail,
        update,
        members,
        addManager,
        removeManager,
        setManager,
        removeMember
    }
}
//
export default ClubVM;
