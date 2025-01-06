import Div from "../../../../div/div.jsx";
import React, {useEffect, useState} from "react";
import useSettings from "../../../../../../view-models/settingsVM/settingsVM.jsx";
import Title from "../../../../title/title.jsx";
import EventVM from "../../../../../../view-models/eventVM/eventVM.jsx";
import DataTable from "./table/table.jsx";

const Members=({id})=>{
    const [members,setMembers]=useState(null);
    const {theme}=useSettings();
    const {getJoined}=EventVM();
    useEffect(() => {
        const fetch=async ()=>{
            try{
                const res=await getJoined(id);
                setMembers(res);
                console.log('joined:');
                console.log(res);
            }catch (e) {
                console.log(e);
            }
        }
        fetch();
    }, [id]);
    return (
        <Div width={'99%'} column={true}>
            <Title size={'16px'}>Joined list</Title>
            {!members&&<span style={{
                width:'100%',
                height:'50px',
                background:theme.background.layout,
                border:`1px solid ${theme.border.main}`,
                borderRadius:'20px',
            }}/>}
            {members&&<DataTable data={members}/>}
        </Div>
    )
}
//
export default React.memo(Members);