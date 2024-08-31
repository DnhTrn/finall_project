import { Link } from "react-router-dom";
import { Icon, listIcons } from "../../../../assets/icons/icons";
import React, { useState } from "react";
import Text from "../../text/text";
import Div from "../../div/div";
import useSettings from "../../../../models/settings/settings";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
const Page=({show,text,selected})=>{
    const {theme,language,viewMode,page}=useSettings();
    const [titleShow,setTitleShow]=useState(false);
    return (
        <Link style={{textDecoration: 'none',margin:"5px 0"}} to={text} >
            <Div padding="8px 10px 8px 15px" align="center" radius="15px"
             position="relative" index="1000"
             initial={{color:selected?theme.text.content.second:theme.text.content.main,
                        background:selected?theme.background.second:theme.background.layout,
                        width:page
                    }}
             animate={{width:page,color:selected?theme.text.content.second:theme.text.content.main,
                background:selected?theme.background.second:theme.background.layout}} 
                transition={{background:{duration:0.3,delay:0},color:{duration:0.3,delay:0},delay:!viewMode?0.3:0,duration:0.5}}
             whileHover={{color:theme.text.content.second,x:'10px',
                background:selected?theme.background.hover.th3:theme.background.hover.second,transition:{duration:0.2}}} 
             whileTap={{padding:"8px 20px 8px 25px"}}
             onMouseEnter={()=>setTitleShow(true)} onMouseLeave={()=>setTitleShow(false)}>
                <Icon icon={listIcons.navigation[text]} />
                <AnimatePresence>
                    {
                        !!show&&<Text initial={{opacity:0}} animate={{opacity:1,x:['-30%',0]}} exit={{opacity:0,transition:{duration:0.3}}}
                        transition={{duration:0.3}}
                         margin="0 0 0 15px" size="12px" >{language.content.nav[text]}</Text>
                    }
                </AnimatePresence>
                <AnimatePresence>
                    {
                        !!titleShow&&!!!show&& <motion.span 
                            initial={{position:'absolute',color:theme.text.title.main,fontSize:'12px',whiteSpace:'nowrap',zIndex:1,top:'5px',left:0,opacity:0}}
                            animate={{left:'70px',opacity:1}}
                            exit={{opacity:0,left:0,transition:{left:{delay:0.15},duration:0.3}}}
                            transition={{opacity:{delay:0.15},duration:0.3}}
                        >{language.content.nav[text]}</motion.span>
                    }
                </AnimatePresence>
            </Div>
        </Link>
    );
}
// 
export default React.memo(Page);