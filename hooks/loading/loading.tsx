import {useState} from "react";

const useLoading:any =()=>{
    const [load,setLoad]=useState(false);
    return {load,setLoad};
}
//
export default useLoading;