import React, { useEffect, useRef, useState } from "react";
import useSettings from "../../../../models/settings/settings";
import { Icon, listIcons } from "../../../../assets/icons/icons";
import Div from "../../div/div";
import { AnimatePresence } from "framer-motion";
import Input from "../../input/input";

const Search=()=>{
    // lay theme hien tai
    const {theme,language}=useSettings();
    // thiet lap trang thai cua thanh search voi false la dang thu gon va true la hien thi day du
    const [search,setSearch]=useState(false);
    // thiet lap trang thai cua the input voi true se them vao dom
    const [isInput,setInput]=useState(false);
    // xu dung ref de bat su kien the input duoc them vao dom
    const inputRef=useRef();
    // khi search thay doi se cap nhap lai isInput tuong ung
    useEffect(()=>{
        let timeout;
        if(search){
            timeout=setTimeout(()=>setInput(true),500);
        }else{
            setInput(false);
        }
        return ()=>clearTimeout(timeout);
    },[search]);
    // thiet lap trang thai focus khi the input duoc them vao dom
    useEffect(() => {
        if (isInput&&inputRef.current) {
          inputRef.current.focus();
        }
      }, [isInput]);
    //   
    return (
        <Div justify="start" align="center" border={`2px solid ${theme.border.main}`} radius="25px" cursor="pointer" position="relative"
            onClick={()=>setSearch(true)} 
            initial={{width:'30px',height:'30px',color:theme.text.content.main}}
            animate={{width:search?'350px':'30px',height:'30px',color:search?theme.text.content.main:theme.text.content.th3}}
            transition={{width:{delay:search?0:0.5}}} >
                <AnimatePresence>
                    {
                        !!isInput&&<Input background={theme.background.main} ref={inputRef} margin="0 0 0 10px" width="295px" 
                        color={theme.text.content.main} border="none" outline="none"
                        onBlur={()=>setSearch(false)} placeholder={language.content.header.search}
                        initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} />
                    }
                </AnimatePresence>
            <Div initial={{position:'absolute',top:'7px',right:'7px'}} animate={{right:search?'12px':'7px'}} transition={{delay:search?0:0.5}} >
                <Icon icon={listIcons.header.search}/>
            </Div>
            
        </Div>
    ); 
};
// 
export default React.memo(Search);