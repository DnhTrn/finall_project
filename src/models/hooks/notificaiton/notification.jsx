import { useEffect, useState } from "react";

const useNotification=()=>{
    // Trang thai hien thi thong bao he thong
    const [mode,setMode]=useState('default');
    // danh sach thong bao 
    const [list,setList]=useState([]);
    // danh sach thong bao cho cac thao tac
    const [systemList,setSystemList]=useState([]);
    // trang thai khi hover vao thong bao dang hien thi
    const [check,setCheck]=useState(false);
    // thoi gian ton tai cua thong bao
    const [time,setTime]=useState('2000');
    // them thong bao vao list
    const addNotification=(state,title,content)=>{
        const temp=[...list,{'state':state,'title':title,'content':content,show:true}]
        setList(temp);
    };
    // them thong bao thao tac vao list
    const addSystemNotification=(state,title,content)=>{
        const temp=[...systemList,{'state':state,'title':title,'content':content,show:true}];
        setSystemList(temp);
    };
    // cap nhap lai trang thai cua list khi thay doi
    useEffect(()=>{
        if(list.length===0){
            return;
        }
        const temp=list.filter((item,index)=>{
            if(index!==0){
                return item;
            }
        });
        let timeout;
        if(!check){
            timeout=setTimeout(()=>{
                list[0].show=false;
                setList(temp);
            },time);
        }else{
            return ()=>clearTimeout(timeout);
        }
    },[list,check]);
    // cap nhap lai trang thai cua list khi thay doi 
    useEffect(()=>{
        if(systemList.length===0){
            return;
        }
        const temp=systemList.filter((item,index)=>{
            if(index!==0){
                return item;
            }
        });
        // 
        setTimeout(()=>{
            systemList[0].show=false;
            setSystemList(temp);
        },time);
        // 
    },[systemList]);
    return {mode,list,time,systemList,setSystemList,setMode,setCheck,setTime,addNotification,addSystemNotification}
};
// 
export default useNotification;