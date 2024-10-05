import React, { useEffect, useState } from "react";
import useSettings from "../../../../view-models/settingsVM/settingsVM";
import Div from "../../div/div";
import Title from "../../title/title";
import Text from "../../text/text";
const Heading=()=>{
    // 
    const {language,langList,theme,themeList,changeLanguage,changeTheme}=useSettings();
    // 
    const [checkTheme,setCheckTheme]=useState(false);
    const [checkLanguage,setCheckLanguage]=useState(false);
    // 
    const [showTheme,setShowTheme]=useState(false);
    const [showLanguage,setShowLanguage]=useState(false);
    // 
    useEffect(()=>{
        let timeout;
        if(checkTheme){
            timeout=setTimeout(()=>{
                setShowTheme(true);
            },300);
        }else{
            setShowTheme(false);
        }
        return ()=>clearTimeout(timeout);
    },[checkTheme])
    // 
    useEffect(()=>{
        let timeout;
        if(checkLanguage){
            timeout=setTimeout(()=>{
                setShowLanguage(true);
            },300);
        }else{
            setShowLanguage(false);
        }
        return ()=>clearTimeout(timeout);
    },[checkLanguage])
    return (
        <Div margin="10px 0 30px 30px" width="100%" height="60px" justify='start' align='baseline'>
            <Title animate={{color:theme.text.title.main}} weight='bold' cursor='pointer' margin="0 25px 0 0">{language.title.name}</Title>
            <Text animate={{color:theme.text.content.th3}} whileHover={{color:theme.text.hover.main}} size='14px' weight='bold' cursor='pointer' margin="0 25px" >{language.title.help}</Text>
            <Div initial={{background:theme.background.main,height:0,color:theme.text.content.th3,padding:'0 25px'}} 
                animate={{background:theme.background.main,color:theme.text.content.th3}}
                whileHover={{height:themeList.length*30+'px',padding:'10px 25px',
                    background:theme.background.hover.main,color:theme.text.hover.th4}}
                    transition={{height:{delay:0.1}}}
                width="50px" justify="start" align='baseline' radius='15px' margin="0 15px"
                onMouseEnter={()=>setCheckTheme(true)} column={true} onMouseLeave={()=>setCheckTheme(false)}>
                <Text size='14px' weight='bold' cursor='pointer' margin="0" >{language.themes[themeList[0]]}</Text>
                {!!showTheme&&themeList.map((code,index)=>{
                    if(index!==0){
                        return(
                            <Text key={index} initial={{opacity:0,color:theme.text.content.second}} animate={{opacity:1}}
                            whileHover={{color:theme.text.hover.th4}} onClick={()=>changeTheme()}
                            size='14px' weight='bold' cursor='pointer' margin="15px 0 0 0">{language.themes[code]}</Text>
                        );
                    }
                })}
            </Div>
            <Div initial={{background:theme.background.main,height:0,color:theme.text.content.th3,padding:'0 25px'}} 
                animate={{background:theme.background.main,color:theme.text.content.th3}} 
                whileHover={{height:themeList.length*30+'px',padding:'10px 25px',background:theme.background.hover.main,color:theme.text.hover.th4}} 
                transition={{height:{delay:0.1}}}
                justify="start" align='center' radius='15px' margin="0 15px" width="125px"
            onMouseEnter={()=>setCheckLanguage(true)} column={true} onMouseLeave={()=>setCheckLanguage(false)}>
                <Text size='14px' weight='bold' cursor='pointer' margin="0" >{language.language[langList[0]]}</Text>
                {!!showLanguage&&langList.map((lang,index)=>{
                    if(index!==0){
                        return(
                            <Text  key={index} initial={{opacity:0,color:theme.text.content.second}} animate={{opacity:1}}
                            whileHover={{color:theme.text.hover.th4}} onClick={()=>changeLanguage(lang)}
                            size='14px' weight='bold' cursor='pointer' margin="15px 0 0 0">{language.language[lang]}</Text>
                        );
                    }
                })}
            </Div>
        </Div>
    );
};
// 
export default React.memo(Heading)