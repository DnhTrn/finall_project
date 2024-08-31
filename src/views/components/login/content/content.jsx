import React from "react";
import Div from "../../div/div";
import Heading from "../heading/heading";
import Note from "../note/note";
import Form from "../form/form";

const Content=()=>{
    return (
        <Div column={true} position="absolute" top="0" 
        left="0" justify="start" align="baseline" width="60vw" height="100vh">
            <Heading/>
            <Note/>
            <Form/>
        </Div>
    );
};
// 
export default React.memo(Content);