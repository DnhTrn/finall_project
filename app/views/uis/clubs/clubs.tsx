import React from "react";
import {View} from "react-native";
import ClubScreen from "@/app/viewModels/viewVM/clubs/clubScreen";
import Add from "@/app/components/club/add/add";

const Clubs=()=>{
    return (
        <View style={{flex:1}}>
            <ClubScreen/>
            <Add/>
        </View>
    )
}
//
export default React.memo(Clubs);