import { Outlet } from 'react-router-dom'
import useSettings from '../../models/settings/settings'
import Grid from '../components/grid/grid';
import Navigation from './navigation/navigation';
import { motion } from 'framer-motion';
import Div from '../components/div/div';
import Header from './header/header';
import Confirm from '../components/confirm/confirm';
import React from 'react';

function App() {
  const {view,theme,viewMode}=useSettings();
  return (
    <Grid initial={{gridTemplateColumns:`${view} calc(100vw - ${view})`,background:theme.background.layout}} 
    animate={{gridTemplateColumns:`${view} calc(100vw - ${view})`,background:theme.background.layout}} 
    transition={{delay:!viewMode?0.3:0,duration:0.5}}
    justify="center" align="center" minHeight="100vh">
      <Confirm/>
      <Navigation/>
      <motion.span/>
      <Div column={true}  
      initial={{width:`calc( 100vw- ${view} - 20px)`, height:'calc(100vh - 20px )',background:theme.background.main}} 
      animate={{width:`calc( 100vw- ${view} - 20px )`}} margin="10px"  radius="25px" >
        <Header/>
        <motion.div initial={{width:`calc( 100vw- ${view} - 20px)`,height:'calc(100vh - 100px )',
          background:theme.background.main,overflowY: 'auto',margin:'0 10px 15px 30px',borderRadius: '10px'}} 
          animate={{width:`calc( 100vw- ${view} - 20px )`}} margin="10px"  radius="25px" column={true} >
          <Outlet/>
          <Div height="100vh" width="10px" background="blue"/>
        </motion.div>
        
      </Div>
    </Grid>
  )
}

export default React.memo(App);
