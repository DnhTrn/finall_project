import { createContext, useContext } from "react";
import { createBrowserRouter, RouterProvider, useParams } from "react-router-dom";
import { paths } from "./paths/paths";
import { ConfirmService } from "../confirm/useConfirm";
// khai bao Context
const RouterContext=createContext();
// Khai bao custom hook
export const RouterService=()=>{
    // khai bao routes
    const routers=createBrowserRouter(paths);
    // ham lay path hien tai
    const getPath=()=>{
        const {path}=useParams();
        return path; 
    }
    // ham lay page hien tai
    const getPage=()=>{
        const {page}=useParams();
        return page;
    }
    // 
    return (
        <RouterContext.Provider value={{getPath,getPage}}>
            <ConfirmService>
                <RouterProvider router={routers}/>
            </ConfirmService>
        </RouterContext.Provider>
    )
};
// 
const useRouter=()=>useContext(RouterContext);
// 
export default useRouter;