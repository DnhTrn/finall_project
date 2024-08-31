import getFulls from "./customs/getFull/getFull";
import getShorts from "./customs/getShort/getShort";

const useNotifications=()=>{
    const useGetShorts=()=>getShorts();
    const useGetFulls=()=>getFulls();
    // 
    return {useGetShorts,useGetFulls};
}
// 
export default useNotifications;
 //