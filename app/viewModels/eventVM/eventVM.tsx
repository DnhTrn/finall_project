import EventModel from "@/app/models/eventModel/eventModel";
import formatDate from "@/constants/handles/formatDate";
import ClubModel from "@/app/models/clubModel/ClubModel";
import checkData from "@/constants/handles/checkData";
import {useNavigation} from "@react-navigation/core";

const EventVM:any=()=>{
    // @ts-ignore
    const {mainEvents:modelMain,attendance:modelAtten,join:modelJoin,left:modelLeft,getClubsEvents:modelClubs,detail:modelDetail,deleteEvent:modelDelete,
        getMembers:modelMembers,checkAction:modelCheck,clubEvent:modelClub,getMonthEvent:monthEvent,total:modelTotal,getRegister:modelRegister,
        getSubs:modelGetSubs,create:modelCreate,update:modelUpdate}=EventModel();
    const {getMembers:clubMember}=ClubModel();
    const navigation=useNavigation();
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
    //
    const detail=async (id:any)=>{
        try{
            const {status,event}=await modelDetail(id);
            if(!status){
                return {status:false}
            }
            // @ts-ignore
            const data ={...event, start_at:formatDate(event?.start_at), end_at:formatDate(event?.end_at), created_at:formatDate(event?.created_at)}
            return {status:true,event:data}
        }catch (e) {
            console.log('VM: '+e);
            return {status:false}
        }
    }
    //
    const getMonthEvent=async (month:any,year:any)=>{
        try{
            const {status,events}=await monthEvent(month,year);
            if (!status){
                return {status:false}
            }
            // @ts-ignore
            const data=events?.map(item=>{
                // @ts-ignore
                return ({id:item.id,name:item.name,des:item.sort_description,start_at:formatDate(item?.start_at), end_at:formatDate(item?.end_at)})
            });
            return {status:true,events:data}
        }catch (e) {
            console.log('VM: '+e);
            return {status:false}
        }
    }
    //
    const getMainCreate=async ()=>{
        try{
            const {status,main}=await modelMain(35);
            if(!status){
                return {status:false}
            }
            // @ts-ignore
            const data=main.map(item=>({id:item.id,name:item?.name}))
            return {status:true,events:data}
        }catch (e) {
            console.log('VM: '+e);
            return {status:false}
        }
    }
    //
    const getTotal= async (id:any)=>{
        try{
            // @ts-ignore
            const {status,events}= await modelTotal(id);
            if(!status)return {status:false}
            const {status:memStatus, managers, mems}=await clubMember(id);
            const list=[...managers??[],...mems??[]];
            console.log('mems');
            console.log(list);
            console.log('events');
            console.log(events);
            const total=events?.length;
            let interval=0;
            let sub=0;
            let joinedRate=0;
            const count=list.length;
            if(total==0){
                return {status:true,value:{total,interval,sub,joinedRate}}
            }
            let rate=0;
            events?.forEach(item=>{
                // @ts-ignore
                if(item?.pre_id!=null){
                    sub+=1;
                }else{
                    interval+=1;
                }
                if(count==0){
                    return;
                }
                let members=0;
                item?.mems.forEach((mem:any)=>{
                    console.log(mem);
                    const current =list.find((e:any)=>e.user_code==mem.user_code);
                    console.log(current);
                    if(current){
                        members+=1;
                    }
                })
                  // @ts-ignore
                  rate+=(members/count).toFixed(2)*100;
            })
            // @ts-ignore
            joinedRate=(rate/events?.length).toFixed(2);
            console.log(joinedRate,rate,count,total);
            return {status:true,value:{total,interval,sub,joinedRate}}
        }catch (e) {
            console.log('VM: '+e);
            return {status:false}
        }
    }
    //
    const lineChart=async (id:any)=>{
        try {
            const {status,events}= await modelTotal(id);
            const data={label:[],data:[]};
            // @ts-ignore
            events?.forEach(item=>{
                // @ts-ignore
                const year=item?.created_at.toDate().getFullYear();
                // @ts-ignore
                if(data.label.indexOf(year)===-1){
                    // @ts-ignore
                    data.label.push(year)
                    // @ts-ignore
                    data.data.push(0);
                };
                // @ts-ignore
                const index=data.label.indexOf(year);
                const temp=data.data[index]+1;
                // @ts-ignore
                data.data[index]=temp;
            })
            return {status:true, value:data}
        }catch (e) {
            console.log('VM: '+e);
            return {status:false}
        }
    }
    // tong ket lai su kien sau khi da hoan thanh
    const checkout=async (id:any,club_id:any,check:boolean)=>{
        try{
            const {status:memStatus,members:joined}= await modelMembers(id,false);
            const {status:clubStatus,managers,mems}=await clubMember(club_id);
            if(!memStatus){
                return {status:false}
            }
            if(!clubStatus){
                return {status:false}
            }
            if(joined?.length==0){
                return {status:false}
            }
            const members=[...managers,...mems];
            let attendance=0;// so thanh vien diem danh
            let count=joined?.length;
            let rate=0;//ti le thanh vien trong cau lac bo tham gia
            let inClub=0;// so thanh vien trong cau lac bo tham gia
            joined?.forEach((item:any)=>{
                const check = members.find(mem=>mem.user_code==item.user_code);
                if(check){
                    inClub+=1;
                }
                if(item.status===1){
                    attendance+=1;
                }
            })
            // @ts-ignore
            rate=parseFloat((inClub/members.length).toFixed(2));
            console.log(typeof rate);
            // @ts-ignore
            attendance=parseFloat((attendance/count).toFixed(2));
            const data={labels:[],data:[]};
            if (check){
                // @ts-ignore
                let other=parseFloat(((count-inClub)/count).toFixed(2));
                // @ts-ignore
                data.labels.push('Other');
                // @ts-ignore
                data.data.push(other);
            }
            // @ts-ignore
            data.labels.push('Club','Atten');
            // @ts-ignore
            data.data.push(rate,attendance);
            return {status:true, value:data,count}
        }catch (e) {
            console.log('VM: '+e);
            return {status:false}
        }
    }
    //

    const barChart=async (date:any,id:any)=>{
        try{
            const {status,events}= await modelTotal(id,true,date);
            console.log(status,'bar');
            console.log(events);
            const data={label:[],data:[]};
            // @ts-ignore
            events?.forEach((item,key)=>{
                const count=item.mems.length;
                // @ts-ignore
                data.label.push(key);
                // @ts-ignore
                data.data.push(count??0);

            })
            return {status:true, value:data}
        }catch (e) {
            console.log('VM: '+e);
            return {status:false}
        }
    }
    const clubRegister=async (id:any)=>{
        try{
            const {status,events}= await modelRegister(id);
            if(!status){
                return {status:false}
            }
            // @ts-ignore
            const data=events.map(item=>{
                console.log(item);
                // @ts-ignore
                return {...item,
                    start_at:formatDate(item?.start_at),
                    end_at:formatDate(item?.end_at),
                    created_at:formatDate(item?.created_at)
                }
            })
            return {status:true,events:data}
        }catch (e) {
            console.log('VM: '+e);
            return {status:false}
        }
    }
    //
    const create=async (data:any)=>{
        try{
            if(!checkData(data)){
                return {status:false,message:'null-fields'};
            }
            const createData={
                name:data.name,
                created_at:new Date(),
                pre_id:data.type?data.pre:null,
                full_description: data.fullDesc,
                sort_description: data.sortDes,
                start_at: data.start,
                end_at:data.end,
                club_id:data.club_id,
                status:1,
                progress:data?.type?0:5,
                updated_at:new Date(),
                files:data.files,
                imgs:data.imgs
            }
            const {status,id}=await modelCreate(createData);
            if(!status)return {status:false,message:'create-false'}
            // @ts-ignore
            navigation.replace('clubs',{screen:'event-manager-detail',params:{id:id}})
            return {status:true};
        }catch (e) {
            console.log('VM: '+e);
            return {status:false,message:'create-false'}
        }
    }
    // 
    const quickChange=async (data:any)=>{
        try{
            const {status}=await modelUpdate(data);
            return {status};
        }catch (e) {
            console.log('VM: '+e);
            return {status:false}
        }
    }
    const update=async (data:any)=>{
        try{
            if(!checkData(data)){
                return {status:false,message:'null-fields'};
            }
            const updateData={
                id:data.id,
                name:data.name,
                full_description: data.fullDesc,
                sort_description: data.sortDes,
                start_at: data.start,
                end_at:data.end,
                updated_at:new Date(),
                files:data.file,
                imgs:data.img,
                changeImgs:data.changeImgs,
                changeFiles:data.changeFiles
            }
            const {status}=await modelUpdate(updateData);
            if(!status)return {status:false,message:'create-false'}
            // @ts-ignore
            navigation.reset({
                index: 1, // Chỉ số màn hình đầu tiên trong stack
                routes: [
                    // @ts-ignore
                    { name: 'club-management', params: { screen: 'club-management-event'} },
                ],
            });
            return {status:true};
        }catch (e) {
            console.log('VM: '+e);
            return {status:false}
        }
    }
    // 
    const deleteEvent=async (id:any)=>{
        try{
            const {status}= await modelDelete(id);
            if(!status)return {status:false,message:'delete-false'};
            // @ts-ignore
            navigation.reset({
                index: 1, // Chỉ số màn hình đầu tiên trong stack
                routes: [
                    // @ts-ignore
                    { name: 'club-management', params: { screen: 'club-management-event'} },
                ],
            });
            return {status:true};
        }catch (e) {
            console.log('VM: '+e);
            return {status:false}
        }
    }
    return {getMain,getSubs,getMembers,checkAction,attendance,join,left,getTotal,lineChart,barChart,create,update,deleteEvent,
        getClubsEvents,getClubEvents,detail,getMonthEvent,getMainCreate,clubRegister,quickChange,checkout}
}
//
export default EventVM;