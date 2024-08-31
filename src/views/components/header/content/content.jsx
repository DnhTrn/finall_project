import React from "react";
import Search from "../search/search";
import Div from "../../div/div";
import Notification from "../notification/notification";
import User from "../user/user";

const Content=()=>{
    // 
    return (
        <Div justify="center" align="center" >
            <Search/>
            <Notification/>
            <User/>
        </Div>
    );
};
// 
export default React.memo(Content)