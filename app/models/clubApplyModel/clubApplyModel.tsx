// @ts-ignore
import {addDoc, collection, deleteDoc, getDocs, limit, query, Timestamp, updateDoc, where} from "@firebase/firestore";
import {doc, getDoc} from "firebase/firestore";
import {auth, firestore} from "@/constants/firebase/firebase";

const ClubApplyModel:any=()=>{
    const table='club_apply';
    const coll:any=collection(firestore,table);
    //
    const index:any=async (club_id:any)=>{
        try{
            const requestRef=query(coll,where('club_id','==',club_id));
            const requestRes=await getDocs(requestRef);
            const request=requestRes.docs.map((doc:any)=>({id:doc.id,...doc.data()}));
            const userIds=request.map((item:any)=>item.user_id);
            const uReq:any=query(collection(firestore,'users'),where('__name__','in',userIds));
            const uRes:any=await getDocs(uReq);
            const data:any=uRes.docs.map((doc:any)=>{
                const current:any = request.find((item:any)=>item.user_id==doc.data().user_id);
                return {id:doc.id,...doc.data(),date:current?.date}
            });
            return {
                status:true,
                data
            };
        }catch (e) {
            console.log("model apply: "+e);
            return {
                status:false,
                message:'false-to-load',
                data:[]
            };
        }
    }
    //
    const apply:any= async (club_id:any)=>{
        try{
            console.log(club_id);
            const data={date:Timestamp.now(),user_id:auth.currentUser?.uid,club_id:club_id};
            await addDoc(coll,data)
            return {status:true};
        }catch (e) {
            console.log(e);
            return {status:true,message:'false-update'};
        }
    }
    // thu hoi yeu cau tham gia
    const revo:any= async (club_id:any)=>{
        try{
            const req=query(coll,where('club_id','==',club_id),
                where('user_id','==',auth.currentUser?.uid),limit(1));
            const res=await getDocs(req);
            await deleteDoc(res.docs[0].ref);
            return {status:true};
        }catch (e) {
            console.log(e);
            return {status:false,message:'false-update'};
        }
    }
    //
    const update:any= async (user:any,type:any=false,club_id:any)=>{
        try{
            console.log(user);
            const req1: any = query(
                coll,
                where("club_id", "==", club_id),
                where("user_id", "==", user?.id),
                limit(1)
            );

            // Lấy danh sách tài liệu
            const querySnapshot = await getDocs(req1);
            await deleteDoc(querySnapshot.docs[0].ref);
            //
            if(type){
                const data={
                    club_id:club_id,
                    user_code:user.user_code,
                    position_id:5,
                    join_at:Timestamp.now(),
                }
                await addDoc(collection(firestore,'club_members'),data);
            }
            return {status:true};
        }catch (e) {
            console.log('Model:'+e);
            return {
                status:false,
                message:'false-update'
            }
        }
    }
    return {
        apply,revo,index,update
    }
}
//@ts-ignore
export default ClubApplyModel;