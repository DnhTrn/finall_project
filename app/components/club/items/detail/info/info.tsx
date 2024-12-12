import {ScrollView, Text, View} from "react-native";
import React from "react";
import InforContent from "@/app/components/club/items/detail/info/inforContent";
import useData from "@/contexts/datas/data";

const Info=()=>{
    return (
        <ScrollView style={{flex:1}}>
            <InforContent/>
        </ScrollView>
    )
}
//
export default React.memo(Info);