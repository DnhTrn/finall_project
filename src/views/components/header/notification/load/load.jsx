import React from "react";
import Div from "../../../div/div";
import Skeleton from "./skeleton/skeleton";
const Load=()=>{
    // 
    return (
        <Div height='85%' column={true} justify="space-around" align="center">
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
        </Div>
    );
};
export default React.memo(Load);