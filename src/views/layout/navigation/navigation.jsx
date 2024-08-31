import React, { useEffect, useState }  from 'react';
import useSettings from '../../../models/settings/settings';
import Grid from '../../components/grid/grid';
import Logo from '../../components/navigation/logo/logo';
import Mid from '../../components/navigation/mid/mid';
import Bot from '../../components/navigation/bot/bot';
const Navigation=()=>{
    const {view,viewMode} = useSettings();
    const [show,setShow]=useState(false);
    useEffect(()=>{
        let timeout;
        if(viewMode){
            timeout = setTimeout(()=>{
                setShow(viewMode);
            },500)
        }else{
            setShow(viewMode);
        }
        return ()=>clearTimeout(timeout);
    },[viewMode]);
    return (
        <Grid initial={{width:view}} animate={{width:view}} 
        transition={{delay:!viewMode?0.3:0,duration:0.5}} justify="start" align="start"
        rows='10% 45% 25%' height="100vh" radius="0 15px 15px 0" position="fixed" top='0' left='0'>
            <Logo/>
            <Mid show={show}/>
            <Bot show={show}/>
        </Grid >
    );
};
// 
export default React.memo(Navigation);