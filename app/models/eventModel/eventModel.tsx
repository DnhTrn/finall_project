import {
    collection,
    getDocs,
    query,
    Timestamp,
    where,
    doc,
    getDoc,
    orderBy,
    getCountFromServer, limit, updateDoc, addDoc, deleteDoc
} from "@firebase/firestore";
import {auth, firestore} from "@/constants/firebase/firebase";
import clubModel from "@/app/models/clubModel/ClubModel";
import {awaitExpression} from "@babel/types";

const EventModel=()=>{
    const table = 'events';
    const coll=collection(firestore,table);
    //
    const mainEvents=async ()=>{
        try{
            const currentTime = Timestamp.now(); // Lấy thời gian hiện tại dưới dạng Timestamp
            // lay cac su kien chinh
            const mainRef=query(coll,where('pre_id','==',null),where('club_id','==',null),
                where('end_at','>=',currentTime),orderBy('updated_at','desc'));
            const mainRes=await getDocs(mainRef);
            const main=mainRes.docs.map(doc=>({id:doc.id,...doc.data(),isMain:true}));
            return {status:true,main}
        }catch (e) {
            console.log(e);
            return {status:false};
        }
    }
    //
    const getEvent = async (id: any[], check = true) => {
        try {
            console.log(id);
            const currentTime = Timestamp.now();

            // Xây dựng điều kiện lọc động
            let filters = [
                where('club_id', '==', id),
                where('progress', 'not-in',  [0,-1]),
            ];

            if (check) {
                filters.push(where('end_at', '>=', currentTime));
            }

            // Thực hiện truy vấn
            const req = query(coll, ...filters, orderBy('updated_at', 'desc'));
            const result = await getDocs(req);
            console.log(result.docs);
            // Lấy dữ liệu và xử lý các tài liệu trả về
            const events = await Promise.all(
                result.docs.map(async item=>{
                    if(item.data().club_id==null){
                        return ({id:item.id,...item.data(),isMain:false});
                    }
                    const req=doc(firestore,'clubs',item.data().club_id);
                    const res=await getDoc(req);
                    return ({id:item.id,...item.data(),ava:res.data()?.wallpaper,by:res.data()?.name,isMain:false})
                })
            )
            return { status: true, events };
        } catch (e) {
            console.error("Error in getEvent: ", e);
            return { status: false };
        }
    };
    const clubEvent=async (id:any)=>{
        try{
            return await getEvent(id);
        }catch (e) {
            console.log('M: '+e);
        }
    }
    const getClubsEvents=async ()=>{
        try{
            const req=doc(collection(firestore,'users'),auth.currentUser?.uid);
            const res=await getDoc(req);
            const user=res.data();
            const clubsReq=query(collection(firestore,'club_members'),where('user_code','==',user?.user_code));
            const clubsRes=await getDocs(clubsReq);
            const event=await Promise.all(
                clubsRes.docs.map(async (item:any)=>{
                    const {status,events}=await getEvent(item.data()?.club_id);
                    if(!status){
                        return []
                    }
                    return events;
                })
            );
            // @ts-ignore
            const value=[];
            event.forEach((item)=>{
                // @ts-ignore
                item.forEach((item2)=>{
                    value.push(item2)
                })
            })
            // @ts-ignore
            return {status:true,events:value}
        }catch (e) {
            console.log('M: '+e);
            return {status:false};
        }
    }
    const getSubs=async (id:any)=>{
        try{
            const req=query(coll,where('pre_id','==',id),where('progress','not-in',[0,-1]));
            const res=await getDocs(req);
            const subs=await Promise.all(
                res.docs.map(async item=>{
                    if(item.data().club_id==null){
                        return ({id:item.id,...item.data(),isMain:false});
                    }
                    const req=doc(firestore,'clubs',item.data().club_id);
                    const res=await getDoc(req);
                    return ({id:item.id,...item.data(),ava:res.data()?.wallpaper,by:res.data()?.name,isMain:false})
                })
            )
            return {status:true,subs:subs};
        }catch (e) {
            console.log("M: "+e);
            return {status:false,message:'false-get-doc'};
        }
    };
    // 
    const getMembers=async (id:any,check=true)=>{
        try{
            const req=query(collection(firestore,'event_apply'),
                check?where('pre_id','==',id):where('event_id','==',id)
            );
            const res=await getDocs(req);
            const mems=await Promise.all(res.docs.map(async item=>{
                const req=doc(firestore,'users',item.data().user_id);
                const res=await getDoc(req);
                let data={id:res.id,...item.data(),...res.data()}
                if(check){
                    const req=doc(firestore,'events',item.data().event_id);
                    const res=await getDoc(req);
                    // @ts-ignore
                    data.event=res.data()?.name;
                }
                return data;
            }));
            return {status:true,members:mems}
        }catch (e) {
            console.log("M: "+e);
            return {status:false};
        }
    }

    // kiem tra trang thai event va trang thai diem danh
    const checkAction=async (id:any)=>{

        try{

            const checkStatus=doc(firestore,'events',id)
            const eventRes=await getDoc(checkStatus);
            if(eventRes.data()?.progress<35){
                return {status:true,value:{open:false,}}
            }
            //
            const joinReq=query(collection(firestore,'event_apply'),
                where('event_id','==',id),where('user_id','==',auth.currentUser?.uid),limit(1));
            const joinRes=await getCountFromServer(joinReq);
            if(joinRes.data().count==0){
                return {status:true,value:{open:true,join:false}};
            }
            const attendanceReq=query(collection(firestore,'attendance_code'),
                where('event_id','==',id));
            const attendanceRes=await getCountFromServer(attendanceReq);
            console.log(attendanceRes.data().count);
            if(attendanceRes.data().count==0){
                return {status:true,value:{open:true,join:true,check:false}};
            }
            const res=await getDocs(joinReq);
            if(res.docs[0].data().status){
                return {status:true,value:{open:true,join:true,check:true,attendance:true}};
            }
            const close=!eventRes?.data()?.status;
            return {status:true,value:{open:true,join:true,check:true,attendance:false,close}};
        }catch (e) {
            console.log("M: "+e);
            return {status:false,value:{}};
        }
    }
    // 
    const attendance=async (id:any,code:any)=>{
        try{
           const req=query(collection(firestore,'attendance_code'),
               where('event_id','==',id),limit(1));
           const res=await getDocs(req);
           if(res.docs[0].data().code!=code){
               return {status:false};
           }
            const reqU=query(collection(firestore,'event_apply'),
                where('user_id','==',auth.currentUser?.uid),
                where('event_id','==',id),limit(1));
            const resU=await getDocs(reqU);
            await updateDoc(resU.docs[0].ref,{status:1,updated_at:new Date()});
            return {status:true};
        }catch (e) {
            console.log("M: "+e);
            return {status:false}
        }
    }
    //
    const join=async (data:any)=>{
        try{
            const req=doc(collection(firestore,'users'),auth.currentUser?.uid);
            const res=await getDoc(req);
            const user=res.data();
            console.log('event:');
            console.log(data);
            console.log('user:');
            console.log(user);
            const item={
                status:0,
                join_at:new Date(),
                updated_at:new Date(),
                event_id:data?.id,
                pre_id:data?.pre_id,
                user_id:auth.currentUser?.uid,
                user_code:user?.user_code
            }
            await addDoc(collection(firestore,'event_apply'),item);
            return {status:true};
        }catch (e) {
            console.log("M: "+e);
            return {status:false}
        }
    }
    //
    const left=async (id:any)=>{
        try{
            const req=query(collection(firestore,'event_apply'),
                where('event_id','==',id),where('user_id','==',auth.currentUser?.uid),limit(1));
            const res=await getDocs(req);
            await deleteDoc(res.docs[0].ref);
        }catch (e) {
            console.log("M: "+e);
        }
    }
    return {mainEvents,getSubs,getMembers,checkAction,attendance,join,left,getClubsEvents,clubEvent}
}
//
export default EventModel;