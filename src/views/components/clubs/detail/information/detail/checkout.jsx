import React, {useEffect, useState} from "react";
import useSettings from "../../../../../../view-models/settingsVM/settingsVM.jsx";
import EventVM from "../../../../../../view-models/eventVM/eventVM.jsx";
import Div from "../../../../div/div.jsx";
import Title from "../../../../title/title.jsx";
import Text from "../../../../text/text.jsx";
import BasicBars from "../../../../orthers/chart/chart.jsx";

const CheckOut=({id})=>{
    const [data,setData]=useState(null);
    const {theme}=useSettings();
    const {subCheckout}=EventVM();
    //
    useEffect(()=>{
        const fetch=async ()=>{
            try{
                const {joined,percent,checkin}=await subCheckout(id);
                setData({joined,percent,checkin});
            }catch (e) {
                console.log('UI: '+e);
            }
        }
        fetch();
    },[])
    return(
        <Div width={'100%'} margin={'10px 0'}>
            {!data&&<span style={{
                width: '100%',
                height: '50px',
                background: theme.background.layout,
                border: `1px solid ${theme.border.main}`,
                borderRadius: '10px',
            }}/>}
            {
                data&&<Div width={'100%'} justify={'start'} align={'start'} column={true} padding={'10px 0'}
                           style={{borderTop:`1px solid ${theme.border.main}`}}>
                    <Div width={'100%'} justify={'start'} align={'start'} >
                        <Div width={'100%'} justify={'start'} align={'start'} column={true}>
                            <Div width={'100%'} justify={'start'} align={'start'} column={true}>
                                <Div width={'100%'} justify={'start'} align={'center'} margin={"5px 0"}>
                                    <Title size={'14px'} margin={'0 5px 0 0'}>Total checked in:</Title>
                                    <Text size={'12px'} weight={'600'} margin={'0'}>{data?.percent}%</Text>
                                </Div>
                                <Text size={'12px'} margin={0} >of Users participating in this event checked in.</Text>
                                <Text size={'10px'} margin={'0'}>The total user joined is all of user joined sub events on this event.</Text>
                            </Div>
                            <Div width={'100%'} justify={'start'} align={'center'} column={true}>
                            <BasicBars unit={'User'} title={'Attendance rate chart'}
                                       groups={'Parameters are recorded from the start of the event until the event is completed and registration/participation closes.'}
                                       des={'The chart depicts the difference between the percentage of participating users who have checked in and have not checked in'} item={data.checkin}/>
                            </Div>
                        </Div>
                    </Div>
                </Div>
            }
        </Div>
    )
}
//
export default React.memo(CheckOut);