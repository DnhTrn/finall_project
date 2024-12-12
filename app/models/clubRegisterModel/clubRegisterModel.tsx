// @ts-nocheck
import {collection, deleteDoc, getDocs, query, Timestamp, updateDoc, where} from "@firebase/firestore";
import {doc, getDoc} from "firebase/firestore";
import {deleteObject, getDownloadURL, listAll, ref, uploadBytesResumable} from "firebase/storage";
import {auth, firestore, storage} from "@/constants/firebase/firebase";
import uploadFile from "@/constants/handles/uploadFile";

const ClubRegisterModel = ()=>{
    const table='clubs_register';
    const coll:any=collection(firestore,table);
    //
    const index:any= async ()=>{
        try{
            const userId:any=auth.currentUser?.uid;
            const req:any=query(coll,where('master','==',userId));
            const res:any= await getDocs(req);
            const data:any= res.docs.map((doc:any)=>({id:doc.id,...doc.data(),status:0}));
            return data;
        }catch (e) {
            console.error(e);
            return [];
        }
    }
    // lay thong tin cua 1 don dang ky
    const show:any=async (club_id:string)=>{
        try {
            const req:any=doc(firestore,table,club_id);
            const res:any=await getDoc(req);
            const data:any= ({id:res.id,...res.data(),status:0});
            return data;
        }catch (e) {
            console.error(e);
            return null;
        }
    }
    // xoa don dang ky
    const remove:any=async (club_id:string)=>{
        try{
            //xoa ban ghi
            const req:any=doc(firestore,table,club_id);
            await deleteDoc(req);
            //xoa cac file lien quan
            const reqFolder:any=ref(storage,`temp/${club_id}`);
            // Liệt kê tất cả các file trong thư mục và xóa từng file
            const listResult:any = await listAll(reqFolder);
            const deletePromises:any = listResult.items.map((fileRef:any) => deleteObject(fileRef));
            await Promise.all(deletePromises);
            return true;
        }catch (e) {
            console.error("Model: "+e);
            return false;
        }
    }

    const update:any=async (data:object)=>{
        try{
            const clubData = {
                name: data?.name,
                sort: data?.sort,
                full: data?.full,
                orientation: data?.orientation,
                lecturer: data?.lecturer,
                master:auth.currentUser?.uid,
                members: data?.members,
                lecturerOption: data?.lecturerOption,
                memberOption: data?.memberOption,
            };
            if(data?.changeFile){
                // truy cap vao kho luu tru va xoa cac file cu di
                const reqFolder:any=ref(storage,`temp/${data?.id}/files`);
                // Liệt kê tất cả các file trong thư mục và xóa từng file
                const listResult:any = await listAll(reqFolder);
                const deletePromises:any = listResult.items.map((fileRef:any) => deleteObject(fileRef));
                await Promise.all(deletePromises);
                // Định nghĩa các đường dẫn tải lên trong Storage
                const fileTernPath = `/temp/${data?.id}/files/terns/${data.fileTern.name}`;
                const fileRegulationPath = `/temp/${data?.id}/files/regulations/${data.fileRegulation.name}`;
                //
                const [ternFileUrl, regulationFileUrl] = await Promise.all([
                    uploadFile(data.fileTern.uri, fileTernPath),
                    uploadFile(data.fileRegulation.uri, fileRegulationPath),
                ]);
                clubData.tern_file=ternFileUrl;
                clubData.regulation_file=regulationFileUrl;
            }
            if(data?.check_img){
                const reqFolder:any=ref(storage,`temp/${data?.id}/images`);
                // Liệt kê tất cả các file trong thư mục và xóa từng file
                const listResult:any = await listAll(reqFolder);
                const deletePromises:any = listResult.items.map((fileRef:any) => deleteObject(fileRef));
                await Promise.all(deletePromises);
                //
                const imagePath = `/temp/${data?.id}/images/${data.image.split('/').pop()}`;
                //
                const img_url:any = await uploadFile(data.image, imagePath);
                clubData.wallpaper=img_url;
            }
            //
            const req:any=doc(firestore,table,data.id);
            await updateDoc(req,clubData)
            const res:any=await getDoc(req);
            return {status:true,club:({id:data.id,...res.data()})};
        }catch (e) {
            console.error(e);
            return {status:false,club:[]};
        }
    }
    // 
    return {index,show,remove,update};
}
//
export default ClubRegisterModel;