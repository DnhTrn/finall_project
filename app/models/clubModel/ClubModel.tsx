// @ts-nocheck
import {
    collection,
    query,
    getDocs,
    where,
    Timestamp,
    setDoc,
    doc,
    getDoc,
    limit,
    updateDoc,
    getCountFromServer, deleteDoc
} from "@firebase/firestore";
import {ref, uploadBytesResumable, getDownloadURL, listAll, deleteObject} from 'firebase/storage';
import {auth, firestore, storage} from "@/constants/firebase/firebase";
import uploadFile from "@/constants/handles/uploadFile";
import formatDate from "@/constants/handles/formatDate";
import {find} from "styled-components/test-utils";
import expoKeepAwake from "expo-keep-awake/src/ExpoKeepAwake";


const ClubModel:any = ()=>{
    const table ='clubs';
    const coll:any=collection(firestore,table);
    //lay toan bo danh sach cau lac bo
    const index:any=async ()=>{
        try{
            // @ts-ignore
            const resUser:any = doc(firestore, 'users', auth.currentUser?.uid);
            const res:any = await getDoc(resUser);
            const user:any = res.data();

            if (!user){
                return {status:false,message:'false-to-load'}
            }
            const response:any = await getDocs(coll);

            // Sử dụng `Promise.all` để chờ tất cả các hàm async trong `map`
            const data= await Promise.all(
                response.docs.map(async (doc)=>{
                    const members=await getCountFromServer(
                        query(
                            collection(firestore,'club_members'),
                            where('club_id','==',doc?.id)
                        )
                    )
                    const events=await getCountFromServer(
                        query(
                            collection(firestore,'events'),
                            where('club_id','==',doc?.id),
                            where('progress','not-in',[0,-1])
                        )
                    )
                    const isMemRef=query(collection(firestore,'club_members'),
                        where('club_id','==',doc?.id),
                        where('user_code','==',user?.user_code))
                    const isMemRes=await getCountFromServer(isMemRef);
                    if(isMemRes.data().count!=0){
                        return { id: doc.id,...doc.data(), check: true,
                            joined:true,members:members.data().count??0,events:events.data().count??0};
                    }
                    const isApplyRef=query(collection(firestore,'club_apply'),
                        where('club_id','==',doc?.id),
                        where('user_id','==',auth.currentUser?.uid))
                    const isApplyRes=await getCountFromServer(isApplyRef);
                    if(isApplyRes.data().count!=0){
                        return { id: doc.id,...doc.data(), check: true,
                            joined:false,members:members.data().count??0,events:events.data().count??0 };
                    }
                    return { id: doc.id,...doc.data(), check: false,
                        joined:false,members:members.data().count??0,events:events.data().count??0 };
                })
            )
            return data;
        }catch(e){
            console.log(e);
            return false;
        }
    }
    // lay cac cau lac bo ma nguoi dung da tham gia
    const joined:any=async ()=>{
        try{
            // @ts-ignore
            const reUser:any = doc(firestore, 'users', auth.currentUser?.uid);
            const res:any = await getDoc(reUser);
            const user:any = res.data();

            if (!user) throw new Error('Không tìm thấy dữ liệu người dùng');
            //
            const joinedRef:any=query(collection(firestore,'club_members'),
                where('user_code','==',user?.user_code));
            const joinedRes:any=await getDocs(joinedRef);
            const ids=joinedRes.docs.map((item:any)=>item.data().club_id);
            console.log(ids);
            const clubRef=query(coll,where("__name__",'in',ids))
            const clubRes=await getDocs(clubRef);
            const data=await Promise.all(
                clubRes.docs.map(async (doc:any)=> {
                    const members=await getCountFromServer(
                        query(
                            collection(firestore,'club_members'),
                            where('club_id','==',doc?.id)
                        )
                    )
                    const events=await getCountFromServer(
                        query(
                            collection(firestore,'events'),
                            where('club_id','==',doc?.id),
                            where('progress','not-in',[0,-1])
                        )
                    )
                    return ({id: doc.id, ...doc.data(), check: true,members:members.data().count??0,events:events.data().count??0})
                })
            );
            return data;
        }catch (e){
            console.log(e);
            return [];
        }
    }
    // khoi tao don dang ky cau lac bo
     const create:any=async (data:object)=>{
        try {
            // 1. Tạo một tài liệu mới trong `clubs` để lấy ID
            const clubRef:any = doc(collection(firestore, 'clubs_register'));
            const clubId:string = clubRef.id;

            // 2. Định nghĩa các đường dẫn tải lên trong Storage
            const imagePath = `/temp/${clubId}/images/${data.image.split('/').pop()}`;
            const fileTernPath = `/temp/${clubId}/files/terns/${data.fileTern.name}`;
            const fileRegulationPath = `/temp/${clubId}/files/regulations/${data.fileRegulation.name}`;
            // 4. Tải lên tất cả các tệp
            const [wallpaperUrl, ternFileUrl, regulationFileUrl] = await Promise.all([
                uploadFile(data.image, imagePath),
                uploadFile(data.fileTern.uri, fileTernPath),
                uploadFile(data.fileRegulation.uri, fileRegulationPath),
            ]);

            // 5. Tạo đối tượng dữ liệu để lưu vào Firestore
            const clubData = {
                name: data.name,
                sort: data.sort,
                full: data.full,
                orientation: data.orientation,
                lecturer: data.lecturer,
                master:auth.currentUser?.uid,
                members: data.members,
                lecturerOption: data.lecturerOption,
                memberOption: data.memberOption,
                status:0,
                wallpaper: wallpaperUrl,          // Đường dẫn ảnh trong Storage
                tern_file: ternFileUrl,           // Đường dẫn file tern trong Storage
                regulation_file: regulationFileUrl, // Đường dẫn file regulation trong Storage
                created_at: Timestamp.now(),      // Thời gian tạo bản ghi
            };

            // 6. Lưu dữ liệu vào Firestore với ID đã tạo trước đó
            await setDoc(clubRef, clubData);
            const club:any= await getDoc(clubRef,clubId);
                console.log(club.data());
            console.log("Bản ghi mới đã được tạo thành công với ID:", clubId);
            return {status:true,club:({id:clubId,...club.data()})};

        } catch (error) {
            console.error("Lỗi khi tạo bản ghi mới:", error);
            return {status:false,message:'create-false'};
        }
    }
    // vao man hinh detail
    const detail:any =async (club_id:any)=>{
        try {
            const clubRef:any = doc(firestore,'clubs',club_id);
            const clubRes:any=await getDoc(clubRef);
            const mems=await getCountFromServer(
                query(collection(firestore,'club_members'),where('club_id','==',club_id))
            )
            const events=await getCountFromServer(
                query(collection(firestore,'events'),where('club_id','==',club_id),
                    where('progress','not-in',[0,-1]))
            )
            const club= {id:club_id,...clubRes.data(),members:mems.data().count??0,events:events.data().count??0};
            // Lấy thông tin người dùng hiện tại
            const userReq:any = doc(firestore, 'users', auth.currentUser?.uid);
            const userDoc:any = await getDoc(userReq);
            const user:any = userDoc.data();
            // Kiểm tra quyền quản lý và là thành viên hay không
            let isMaster:boolean = false;
            let isMember:boolean = false;
            let isManager:boolean=false;
            let isRequest:boolean=false;
            // kiem tra xem nguoi dung co dang yeu cau gia nhap cau lac bo hay khong
            const appllyReq:any=query(
                collection(firestore, 'club_apply'),
                where('club_id', '==', club_id),
                where('user_id','==',auth.currentUser?.uid),
            )
            //
            const applyRes:any=await getCountFromServer(appllyReq);
            console.log(applyRes.data().count)
            if(applyRes.data().count!=0){
                isRequest=true;
                return {
                    status:true,
                    isManager: isManager,
                    isMember: isMember,
                    isMaster: isMaster,
                    isRequest:isRequest,
                    club
                };
            }
            // Neu nguoi dung dang khong yeu cau thi kiem tra thong tin thanh vien
            // Truy vấn để lấy một thành viên từ `club_members` có `club_id` khớp với `res.id`
            const membersQuery:any = query(
                collection(firestore, 'club_members'),
                where('club_id', '==', club_id),
                where('user_code','==',user?.user_code),
                limit(1)
            );
            // Kiểm tra nếu tồn tại tài liệu
            const check=await getCountFromServer(membersQuery);
            if(check.data().count==0){
                return {
                    status:true,
                    isManager: isManager,
                    isMember: isMember,
                    isMaster: isMaster,
                    isRequest:isRequest,
                    club
                };
            }
            const membersSnapshot:any = await getDocs(membersQuery);
            // Lấy tài liệu đầu tiên (duy nhất) từ `membersSnapshot`
            const member:any = membersSnapshot.docs[0].data();
            isMaster = member?.position_id === 2;
            isManager=member?.position_id<5;
            isMember = true;
            return {
                status:true,
                isManager: isManager,
                isMember: isMember,
                isMaster: isMaster,
                isRequest:isRequest,
                club
            };
        } catch (e) {
            console.error("Error fetching club details:", e);
            return {status:false,message:'false-get-data'};
        }
    }
    // update club data
    const update:any=async (data:any)=>{
        try{
            console.log(data);
            const req:any=doc(firestore,table,data?.id);
            const updateData={
                name:data?.name,
                full_description:data?.full,
                sort_description:data?.sort,
                status:data?.status,
                orientations:data?.orientation,
            }
            if(data?.changeFile){
                // truy cap vao kho luu tru va xoa cac file cu di
                const reqFolder:any=ref(storage,`clubs/${data?.id}/files`);
                // Liệt kê tất cả các file trong thư mục và xóa từng file
                const listResult:any = await listAll(reqFolder);
                const deletePromises:any = listResult.items.map((fileRef:any) => deleteObject(fileRef));
                await Promise.all(deletePromises);
                // Định nghĩa các đường dẫn tải lên trong Storage
                const fileTernPath = `/clubs/${data?.id}/files/terns/${data.fileTern.name}`;
                const fileRegulationPath = `/clubs/${data?.id}/files/regulations/${data.fileRegulation.name}`;
                //
                const [ternFileUrl, regulationFileUrl] = await Promise.all([
                    uploadFile(data.fileTern.uri, fileTernPath),
                    uploadFile(data.fileRegulation.uri, fileRegulationPath),
                ]);
                updateData.tern=ternFileUrl;
                updateData.regular=regulationFileUrl;
            }
            if(data?.check_img){
                const reqFolder:any=ref(storage,`clubs/${data?.id}/images/wallpaper`);
                // Liệt kê tất cả các file trong thư mục và xóa từng file
                const listResult:any = await listAll(reqFolder);
                const deletePromises:any = listResult.items.map((fileRef:any) => deleteObject(fileRef));
                await Promise.all(deletePromises);
                //duong dan de upload anh
                const imagePath = `/clubs/${data?.id}/images/wallpaper/${data.image.split('/').pop()}`;
                //lay duong dan anh
                const img_url:any = await uploadFile(data.image, imagePath);
                updateData.wallpaper=img_url;
            }
            await updateDoc(req,updateData);
            const res:any= await getDoc(req);
            if(!res){
                return {status:false,message:'false-update'};
            }
            return {status:true,club: {id:res.id,...res.data()}};
        }catch (e) {
            console.log('Model: '+e);
            return {status:false,message:'false-update'};
        }
    }
    //
    const getMembers:any= async (club_id:any)=>{
        try{
            const memberRef=query(collection(firestore,'club_members'),
                where('club_id','==',club_id))
            const memberRes=await getDocs(memberRef);
            const members=memberRes.docs.map(doc=>({id:doc.id,...doc.data()}));
            const coll:any=collection(firestore, 'users');
            console.log(members);
            const userCodes:any = members?.map((member:any) => member.user_code) || [];
            const req:any=query(coll,where('user_code','in',userCodes));
            const res:any=await getDocs(req);
            const managers:[]=[];
            const mems:[]=[];
            res.docs.forEach((doc:any) => {
                const current:any= members.find((member:any)=>member.user_code == doc.data()?.user_code);
                if(current.position_id<5){
                    managers.push({...doc.data(),position_id:current.position_id,join_at:formatDate(current.join_at)});
                }else{
                    mems.push({...doc.data(),position_id:current.position_id,join_at:formatDate(current.join_at)});
                }
            })
            //
            return {
                status:true,
                managers,
                mems
            }
        }catch (e) {
            console.log('club model: '+e);
            return {
                status:false,
                message:'false-to-load',
                managers:[],
                mems:[]
            };
        }

    }
    // add manager boad
    const addManager:any= async (list:any,club_id:any)=>{
        try{
            await Promise.all(
                list.map(async (user:any) => {
                    const req=query(collection(firestore,'club_members'),
                        where('club_id','==',club_id),
                        where('user_code','==',user.user_code),limit(1));
                    const current=await getDocs(req);
                    await updateDoc(current.docs[0].ref,{position_id:3})
                })
            )
            return {status:true};
        }catch (e){
            console.log('club model:'+e);
            return {status:false,message:'false-to-update'}
        }
    }
    // set manager rule
    const setManager:any= async (user:any,rule:any,club_id:any)=>{
        try{
            const req=query(collection(firestore,'club_members'),
                where('club_id','==',club_id),
                where('user_code','==',user.user_code),limit(1));
            const current=await getDocs(req);
            await updateDoc(current.docs[0].ref,{position_id:rule})
            return {status:true};
        }catch (e) {
            console.log('Model:'+e);
            return {
                status:false,
                message:'false-update'
            }
        }
    }
    //
    const removeMember:any=async (list:any,club_id:any)=>{
        try{
            await Promise.all(
                list.map(async (user:any) => {
                    const req=query(collection(firestore,'club_members'),
                        where('club_id','==',club_id),
                        where('user_code','==',user.user_code),limit(1));
                    const current=await getDocs(req);
                    await deleteDoc(current.docs[0].ref)
                })
            )
            return {status:true};
        }catch (e) {
            console.log(e);
            return {status:false,message:'false-to-update'};
        }
    }
    return {index,joined,create,detail,update,getMembers,addManager,setManager,removeMember}
}
//
export default ClubModel;