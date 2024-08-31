import { useState } from "react";

const getShorts=()=>{
    // 
    const [data,setData]=useState(null);
    const [isLoad,setIsLoad]=useState(true);
    const [error,setError]=useState(false);
    // 
    // 
    return {data,isLoad,error}
};
// 
export default getShorts;