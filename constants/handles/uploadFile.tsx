//
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "@/constants/firebase/firebase";

const uploadFile:any = async (uri:any, path:any) => {
    const response:any = await fetch(uri);
    const blob:any = await response.blob();
    const fileRef:any = ref(storage, path);
    const uploadTask:any = uploadBytesResumable(fileRef, blob);

    return new Promise((resolve:any, reject:any) => {
        uploadTask.on(
            'state_changed',
            (snapshot:any) => {
                const progress:any = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress}% done`);
            },
            (error:any) => {
                console.error("Lỗi khi tải lên tệp:", error);
                reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL:any) => {
                    resolve(downloadURL);
                });
            }
        );
    });
};
//
export default uploadFile;