import React, {useEffect, useState} from "react";
import Div from "../../../../div/div.jsx";
import useSettings from "../../../../../../view-models/settingsVM/settingsVM.jsx";
import EventVM from "../../../../../../view-models/eventVM/eventVM.jsx";
import Main from "./main.jsx";
import Info from "../info.jsx";
import Title from "../../../../title/title.jsx";
import Club from "./club.jsx";
import Members from "./members.jsx";
import Total from "./total.jsx";

const Detail=({id})=>{
    const {theme}=useSettings();
    const [data,setData]=useState(null);
    const {getSub}=EventVM();
    useEffect(()=>{
        const fetch=async ()=>{
            try{
                setData(null);
                console.log(id);
                const {status,event,members}=await getSub(id);
                if(status){
                    setData({...event,members});
                    console.log(event);
                }
            }catch (e) {
                console.log(e);
            }
        }
        fetch();
    },[id])
    return (
        <Div justify={'start'} height={'450px'} padding={'0 10px'} width={'100%'} align={'start'} column={true}>
            <Title size={'16px'} >Sub event information</Title>
            {!data && <span style={{
                width: '100%',
                height: '350px',
                background: theme.background.layout,
                border: `1px solid ${theme.border.main}`,
                borderRadius: '5px',
            }}/>}
            {data&&<Div style={{overflowY:'scroll'}}  width={'100%'} justify={'start'} align={'start'} column={true}>
                <Main data={data}/>
                <Total data={data} check={data?.progress.per??0} members={data?.members??0} />
                <Club id={data?.club_id}/>
                <Members id={data?.id}/>
            </Div>}
        </Div>
    )
}
//
export default React.memo(Detail);