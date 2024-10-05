import React from "react";
import System from "../../components/notifications/system/system";
import Confirm from "../../components/confirm/confirm";
// cac thanh phan nhu confirm thong bao he thong, thong bao ung dung
const Orther=()=>{
    return (
        <>
        <System/>
        <Confirm/>
        </>
    );
};
//
export default React.memo(Orther);