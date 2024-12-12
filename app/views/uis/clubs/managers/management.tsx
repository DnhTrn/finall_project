import {View} from "react-native";
import React from "react";
import ManagerScreen from "@/app/viewModels/viewVM/clubs/managerScreen";

const Management=()=>{
    return (
        <View style={{flex:1}}>
            <ManagerScreen/>
        </View>
    )
}
//
export default React.memo(Management);