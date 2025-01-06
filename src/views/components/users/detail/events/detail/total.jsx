import Div from "../../../../div/div.jsx";
import React from "react";
import Title from "../../../../title/title.jsx";
import Text from "../../../../text/text.jsx";
import CheckOut from "./checkout.jsx";

const Total=({check,data,members})=>{
    console.log(check);
    return (
        <Div width={'100%'} justify={'start'} align={'start'} column={true}>
            <Text size={'12px'} margin={'0'}>The total event is all off sub events has submit on this event.</Text>
            <Div width={'100%'} justify={'start'} align={'center'}>
                <Title size={'16px'} margin={'5px 0'}>Total user joined:</Title>
                <Text size={'14px'} weight={'600'} margin={'0 5px'}>{members}</Text>
                <Text size={'14px'} margin={0} >user had joined this event</Text>
            </Div>
            <Text size={'12px'} margin={'0'}>The total user joined is all of user joined sub events on this event.</Text>
            {check>90&&<CheckOut id={data?.id}/>}
        </Div>
    )
}
//
export default React.memo(Total);