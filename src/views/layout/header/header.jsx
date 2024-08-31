import React from "react";
import Div from "../../components/div/div";
import PathName from "../../components/header/PathName/PathName";
import Content from "../../components/header/content/content";

const Header=()=>{
    return (
        <Div width="95%" justify="space-between" align="center" padding="15px 2.5%">
            <PathName/>
            <Content/>
        </Div>
    );
};
// 
export default React.memo(Header);