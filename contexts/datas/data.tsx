import {createContext, useContext, useState} from "react";
// @ts-ignore
const DataContext:Context =createContext();
export const DataService=({children}:any)=>{
    const [data,setData]=useState({});
    return (
        <DataContext.Provider value={{data, setData}}>
            {children}
        </DataContext.Provider>
    )
}
const useData:any=()=>useContext(DataContext);
export default useData;