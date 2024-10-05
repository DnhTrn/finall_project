import React, { useEffect, useRef, useState } from "react";
import Title from "../../../title/title"
import Content from "../content/content"
import Div from "../../../div/div";
import useSettings from "../../../../../view-models/settingsVM/settingsVM";
import State from "../state/state";
import setUp_ClickOutSide from "../../../../handle/click/clickOutsite/clickOutsite";

const Screen=({show,setShow})=>{
    // 
    const {theme,language}=useSettings();
    const [value,setValue]=useState('all');
    // 
    const notificationRef=useRef();
    // 
    useEffect(()=>{
        setUp_ClickOutSide(show,notificationRef,setShow);
    },[show]);
    // 
    return <Div position='absolute'border={`2px solid ${theme.border.main}`} ref={notificationRef}
    radius="15px" shadow={theme.shadow.main} index="100000" column={true} justify="start" align="center"
    initial={{top:'50px',left:'-170px',width:'350px',opacity:0,height:0,background:theme.background.main}}
    animate={{minHeight:'350px',opacity:1}} exit={{minHeight:0,opacity:0,transition:{delay:0.3}}}  >
        <Title initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,transition:{delay:0}}} transition={{delay:0.3}} >{language.title.notifications}</Title>
        <State value={value} setValue={setValue} />
        <Content/>
    </Div>
}
// 
export default React.memo(Screen);