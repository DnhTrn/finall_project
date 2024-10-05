import React, { createContext, useContext } from "react";
import { paths } from "../../models/paths/paths";
import { createBrowserRouter, RouterProvider, useParams } from "react-router-dom";
import { ConfirmService } from '../confirm/useConfirm';
import { SettingServices } from "../settingsVM/settingsVM";

// 
const RouteContext=createContext();
const RouteService=()=>{
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
    return (
        <RouteContext.Provider value={{getPath,getPage}}>
            <SettingServices>
                <ConfirmService>
                    <RouterProvider router={routers}/>
                </ConfirmService>
            </SettingServices>
        </RouteContext.Provider>
    )
}
export const useRouter=()=>useContext(RouteContext);
// 
export default RouteService;