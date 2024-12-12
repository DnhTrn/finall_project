import EventModel from "@/app/models/eventModel/eventModel";
import formatDate from "@/constants/handles/formatDate";

const EventVM:any=()=>{
    // @ts-ignore
    const {mainEvents:modelMain,attendance:modelAtten,join:modelJoin,left:modelLeft,getClubsEvents:modelClubs,
        getMembers:modelMembers,checkAction:modelCheck,clubEvent:modelClub,
        getSubs:modelGetSubs}=EventModel();
    const getMain=async ()=>{
        try{
            const {status,main}=await modelMain();
            if (!status){
                return {status:false}
            }
            // @ts-ignore
            const mainEvent=main.map((event:any)=>{
                return {
                    ...event,
                    by:'School',
                    start_at:formatDate(event.start_at),
                    end_at:formatDate(event.end_at),
                    created_at:formatDate(event.created_at),
                }
            })
            //
            return {status:true,events:mainEvent}
        }catch (e) {
            console.log("VM: "+e);
            return {status:false}
        }
    }
    //
    const getSubs=async (id:any)=>{
        try{
            const {status,subs}=await modelGetSubs(id);
            if (!status){
                return {status:false}
            }
            // @ts-ignore
            const event=subs.map((event:any)=>{
                return {
                    ...event,
                    by:event?.by??'School',
                    start_at:formatDate(event.start_at),
                    end_at:formatDate(event.end_at),
                    created_at:formatDate(event.created_at),
                }
            })
            return {status:true,events:event}
        }catch (e) {
            return {status:false}
        }
    }
    //
    const getMembers=async (id:any,check=true)=>{
        try{
            const {status,members}=await modelMembers(id,check);
            // @ts-ignore
            const mems=members.map((item:any)=>({
                ...item,
                joined_at:formatDate(item.joined_at),
                updated_at:formatDate(item.updated_at),
            }))
            return {status:status,members:mems}
        }catch (e) {
            console.log('VM: '+e);
            return {status:false}
        }
    }
    //
    const checkAction=async (id:any)=>{
        try {
            return await modelCheck(id);
        }catch (e) {
            console.log('VM: '+e);
            return {status:false}
        }
    }
    //
    const attendance=async (id:any,code:any)=>{
        try{
            return await modelAtten(id,code);
        }catch (e) {
            console.log('VM: '+e);
            return {status:false}
        }
    }
    //
    const join=async (data:any)=>{
        try{
            return await modelJoin(data);
        }catch (e) {
            console.log('VM: '+e);
            return {status:false}
        }
    }
    //
    const left=async (id:any)=>{
        try{
            await modelLeft(id)
        }catch (e) {
            console.log('VM: '+e);
        }
    }
    //
    const getClubsEvents=async ()=>{
        try{
            const {status,events}=await modelClubs();
            if(!status){
                return {status:false}
            }
            // @ts-ignore
            const data=events.map(item=>({...item,start_at:formatDate(item.start_at),
                end_at:formatDate(item.end_at),
                created_at:formatDate(item.created_at),}))
            return {status:true,events:data}
        }catch (e) {
            console.log('M: '+e)
        }
    }
    //
    const getClubEvents=async (id:any)=>{
        try{
            // @ts-ignore
            const {status,events}=await modelClub(id);
            if(!status){
                return {status:false}
            }
            // @ts-ignore
            const data=events.map(item=>({...item,start_at:formatDate(item.start_at),
                end_at:formatDate(item.end_at),
                created_at:formatDate(item.created_at),}))
            return {status:true,events:data}
        }catch (e) {
            console.log('M: '+e)
        }
    }
    return {getMain,getSubs,getMembers,checkAction,attendance,join,left,getClubsEvents,getClubEvents}
}
//
export default EventVM;