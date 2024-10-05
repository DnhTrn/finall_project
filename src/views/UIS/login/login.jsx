import React from "react";
import Div from "../../components/div/div";
import Grid from "../../components/grid/grid";
import useSettings from "../../../view-models/settingsVM/settingsVM";
import { motion } from 'framer-motion';
import Content from "../../components/login/content/content";
import Orther from "../../layout/orther/orther";

const Login=()=>{
    const {theme,language}=useSettings();
    return (
        <Grid background={theme.background.main} width="100vw" height="100vh" position="relative" columns="50vw 50vw" justift="center" align="center" >
            <span/>
            <Orther/>
            <motion.span style={{width:'100vw',height:'100vh',position:'absolute',top:0,left:0}} 
                animate={{background:`linear-gradient(to right, ${theme.shadow.layout.start}
                50vw, ${theme.shadow.layout.mid} 100vw, ${theme.shadow.layout.end} 100vw)`}}/>
            <Div animate={{color:theme.text.title.main}} whileHover={{color:theme.text.hover.second}} transition={{duration:0.5}} style={{
                fontWeight: "bolder",
                fontFamily: "cursive"
            }} position="absolute" size="40px" bottom="2vh" right="2vw" align='baseline'>
              {language.title.auth}  <span style={{fontSize:'12px'}} >{language.title.project}</span>
            </Div>
            <Content/>
            <img style={{
                    width: '100%',
                    height:"100vh",
                    objectFit: 'cover',
                    display: 'block',
                }} src={"/work.jpg"} />
        </Grid>
    );
};
// 
export default React.memo(Login);