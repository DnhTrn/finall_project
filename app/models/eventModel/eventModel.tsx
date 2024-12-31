// @ts-ignore
// @ts-nocheck
import {
    collection,
    getDocs,
    query,
    Timestamp,
    where,
    doc,
    getDoc,
    orderBy,
    getCountFromServer, limit, updateDoc, addDoc, deleteDoc, setDoc
} from "@firebase/firestore";
import {auth, firestore, storage} from "@/constants/firebase/firebase";
import clubModel from "@/app/models/clubModel/ClubModel";
import {awaitExpression} from "@babel/types";
import {data} from "@remix-run/router";
import {deleteObject, listAll, ref} from "firebase/storage";
import uploadFile from "@/constants/handles/uploadFile";

const EventModel=()=>{
    const table = 'events';
    const coll=collection(firestore,table);
    //
    const mainEvents=async (progress=6)=>{
        try{
            const currentTime = Timestamp.now(); // Lấy thời gian hiện tại dưới dạng Timestamp
            // lay cac su kien chinh
            const mainRef=query(coll,where('pre_id','==',null),where('club_id','==',null),
                where('progress','>=',progress),
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
    const detail=async (id:any)=>{
        try{
            const req=doc(coll,id);
            const res=await getDoc(req);
            const event={id:res.id,...res.data(),isMain:(res.data()?.club_id)?false:true,by:'School'};
            // @ts-ignore
            if(event?.club_id){
                // @ts-ignore
                const req=doc(collection(firestore,'clubs'),event?.club_id);
                const res=await getDoc(req);
                event.by=res.data()?.name;
                // @ts-ignore
                event.ava=res.data()?.wallpaper;

            }
            if(event?.pre_id){
                const req=doc(coll,event?.pre_id);
                const res=await getDoc(req);
                event.pre_name=res.data()?.name;
            }
            return {status:true,event:event};
        }catch (e) {
            console.log(e);
            return {status:false};
        }
    }
    //
    const getEvent = async (id: any, check = true,start=false,date='',sort=true) => {
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
            if (start) {
                console.log(date);
                // @ts-ignore
                filters.push(where('created_at', '>=', Timestamp.fromDate(date)));
            }
            // Thực hiện truy vấn
            const req = query(coll, ...filters, orderBy('updated_at',sort?'desc':'asc'));
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
            console.log("Error in getEvent: ", e);
            return { status: false };
        }
    };
    const clubEvent=async (id:any)=>{
        try{
            return await getEvent(id,false);
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
            if(eventRes.data()?.progress<35&&eventRes.data()?.status){
                return {status:true,value:{open:false,}}
            }
            //
            const joinReq=query(collection(firestore,'event_apply'),
                where('event_id','==',id),where('user_id','==',auth.currentUser?.uid),limit(1));
            const joinRes=await getCountFromServer(joinReq);
            if(joinRes.data().count==0&&eventRes.data()?.status){
                return {status:true,value:{open:true,join:false}};
            }
            const attendanceReq=query(collection(firestore,'attendance_code'),
                where('event_id','==',id));
            const attendanceRes=await getCountFromServer(attendanceReq);
            console.log(attendanceRes.data().count);
            if(attendanceRes.data().count==0&&eventRes.data()?.status){
                return {status:true,value:{open:true,join:true,check:false}};
            }
            const res=await getDocs(joinReq);
            if(res.docs.length>0&&res.docs[0].data().status){
                return {status:true,value:{open:true,join:true,check:true,attendance:true}};
            }
            console.log('check');
            const close=!eventRes?.data()?.status;
            return {status:true,value:{open:true,join:joinRes.data().count!=0,check:true,attendance:false,close}};
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
    //
    const getMonthEvent=async (month:any,year:any)=>{
        try{
            const start = Timestamp.fromDate(new Date(year, month - 1, 1)); // Bắt đầu tháng
            const end = Timestamp.fromDate(new Date(year, month, 0, 23, 59, 59)); // Kết thúc tháng
            console.log(start,end);
            console.log('Start:', start.toDate(), 'End:', end.toDate());
            const req=query(
                collection(firestore,'event_apply'),where('user_id','==',auth.currentUser?.uid),
                where('join_at','>=',start),where('join_at','<=',end));
            const res=await getDocs(req);
            console.log(res.docs);
            const events=await Promise.all(res.docs.map(async item=>{
                const req=doc(collection(firestore,'events'),item.data().event_id);
                const res=await getDoc(req);
                return {id:res.id,...res.data()}
            }));
            return {status:true,events:events};
        }catch (e) {
            // @ts-ignore
            console.error('Error in getMonthEvent:'+ e?.message || e);
            return {status:false}
        }
    }
    //
    const total=async (id:any,start=false,date='')=>{
        try{
            const {status,events}=await getEvent(id,false,start,date,false);
            if (!status)return{status:false}
            const data=await Promise.all(
                // @ts-ignore
                events.map(async item=>{
                    const req=query(collection(firestore,'event_apply'),
                        where('event_id','==',item.id));
                    const res= await getDocs(req);
                    const mems=res.docs.map(mem=>({id:mem.id,...mem.data()}))
                    console.log('mems');
                    console.log(mems);
                    return {...item,mems}
                })
            )
            return {status:true,events:data}
        }catch (e) {
            console.log("M: "+e);
            return {status:false}
        }
    }
    // 
    const getRegister=async (id:any)=>{
        try{
            const req=query(coll,where('club_id','==',id),
                where('pre_id','!=',null),
                where('progress','in',[0,-1]));
            const res:any=await getDocs(req);
            const data:any=await Promise.all(
                res.docs.map(async (item:any)=>{
                    const req:any =doc(coll,item.data().pre_id);
                    const res:any=await getDoc(req);
                    return {id:item.id,...item.data(),pre_name:res.data().name}
                })
            )
            return {status:true,events:data}
        }catch (e) {
            console.log('M: '+e);
            return {status:false}
        }
    }
    // 
    const create:any=async (data:any)=>{
        try{
            const item:any =doc(coll);
            const {imgs,files,...createData}=data;
            //
            const imgPaths=await Promise.all(imgs.map(async( img:any)=>{
                const imagePath = `/events/${item.id}/imgs/${img.split('/').pop()}`;
                return await uploadFile(img,imagePath);
            }))
            const filePaths=await Promise.all(files.map(async( file:any)=>{
                const filePath = `/events/${item.id}/files/${file.name}`;
                return await uploadFile(file.uri,filePath);
            }))
            createData.imgs=imgPaths;
            createData.files=filePaths;
            await setDoc(item,createData);
            return {status:true,id:item.id}
        }catch (e) {
            console.log('M: '+e);
            return {status:false}
        }
    }
    //
    const update=async (data:any)=>{
        try{
            const event=doc(coll,data.id);
            const {changeImgs,changeFiles,imgs,files,id,...newData}=data;
            if (changeFiles){
                const reqFolder = ref(storage,`/events/${id}/files`);
                // Liệt kê tất cả các file trong thư mục và xóa từng file
                const listResult:any = await listAll(reqFolder);
                const deletePromises:any = listResult.items.map((fileRef:any) => deleteObject(fileRef));
                await Promise.all(deletePromises);
                const filePaths=await Promise.all(files.map(async( file:any)=>{
                    const filePath = `/events/${id}/files/${file.name}`;
                    return await uploadFile(file.uri,filePath);
                }))
                newData.files=filePaths;
            }
            if (changeImgs){
                const reqFolder = ref(storage,`/events/${id}/imgs`);
                // Liệt kê tất cả các file trong thư mục và xóa từng file
                const listResult:any = await listAll(reqFolder);
                const deletePromises:any = listResult.items.map((fileRef:any) => deleteObject(fileRef));
                await Promise.all(deletePromises);
                const imgPaths=await Promise.all(imgs.map(async( img:any)=>{
                    const imagePath = `/events/${id}/imgs/${img.split('/').pop()}`;
                    return await uploadFile(img,imagePath);
                }))
                newData.imgs=imgPaths;
            }
            await updateDoc(event,newData);
            return {status:true}
        }catch (e) {
            console.error('Error in update: '+e);
            return {status:false}
        }
    }
    //
    const deleteEvent=async (id:any)=>{
        try{
            const req=doc(coll,id);
            await deleteDoc(req);
            return {status:true}
        }catch (e) {
            console.log('M: '+e);
            return {status:false}
        }
    }
    return {mainEvents,getSubs,getMembers,checkAction,attendance,join,create,update,deleteEvent,
        left,getClubsEvents,clubEvent,detail,getMonthEvent,total,getRegister}
}
//
export default EventModel;