import { AnimatePresence } from "framer-motion";
import Div from "../div/div";
import React, { useEffect, useRef } from "react";
import useSettings from "../../../view-models/settingsVM/settingsVM";
import Title from "../title/title";
import setUp_ClickOutSide from "../../handle/click/clickOutsite/clickOutsite";
import Text from "../text/text";
import useConfirm from "../../../view-models/confirm/useConfirm";

const Confirm=()=>{
    const {state,title,note,close,confirm}=useConfirm();
    const {theme,language}=useSettings();
    // 
    const confirmRef=useRef();
    useEffect(()=>{
        setUp_ClickOutSide(state,confirmRef,close);
    },[state])
    return (
        <AnimatePresence>
            {!!state&&<Div position='fixed'  border={`1px solid ${theme.border.main}`}
            index="10000000000" radius="10px" column={true} ref={confirmRef} shadow={theme.shadow.second}
            initial={{opacity:0, width:'24%',background:theme.background.main,top:'-50%',left:'38%'}}
            animate={{opacity:1,top:'25%'}} exit={{opacity:0,top:'-50%'}}>
                <Div width="90%" column={true} padding="5px 5%" >
                    <Title color={theme.text.title.main} margin="0" initial={{borderBottom:`1px solid ${theme.border.main}`}} >{language.title.confirm[title]}</Title>
                    <Text color={theme.text.content.th3} size="12px" margin='1px 0 0 0'>{language.content.confirm.title}</Text>
                    <Text color={theme.text.content.main} margin='5px 0 10px 0'>{language.messages.confirm[note]}</Text>
                </Div>
                <Div justify="end" align="center" width="90%" background={theme.background.layout} radius='0 0 10px 10px' padding="15px 5%" >
                    <Div border={`1px solid ${theme.border.main}`} margin='0 10px 0 0' radius="15px" cursor="pointer" padding="5px 10px"
                    initial={{background:theme.background.button.th4,color:theme.text.content.second}} 
                    whileHover={{padding:"5px 15px",background:theme.background.button.second}}
                    onClick={()=>close()} >{language.content.confirm.buttons.cancel}</Div>
                    <Div border={`1px solid ${theme.border.main}`} radius="15px" cursor="pointer" padding="5px 10px"
                    initial={{background:theme.background.button.main,color:theme.text.content.second}} 
                    whileHover={{padding:"5px 15px"}} onClick={()=>confirm()} >{language.content.confirm.buttons.confirm}</Div>
                </Div>
                </Div>}
        </AnimatePresence>
    );
};
// 
export default React.memo(Confirm);