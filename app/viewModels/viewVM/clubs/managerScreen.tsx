
import React from "react";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import useSettings from "@/contexts/settings/settings";
import member from "@/app/views/uis/clubs/managers/member/member";
import events from "@/app/views/uis/clubs/managers/events/events";
import club from "@/app/views/uis/clubs/managers/club/club";

const Tab=createMaterialTopTabNavigator();
//
const ManagementScreen=()=>{
    //@ts-ignore
    const {theme}=useSettings();
    return (
        <Tab.Navigator initialRouteName={'club-management-member'} screenOptions={{
            lazy:true,
            tabBarActiveTintColor: theme.icon.main,
            tabBarInactiveTintColor: theme.icon.second,
            tabBarIndicatorStyle: { backgroundColor: theme.icon.main }, // Đặt màu sắc của thanh hiển thị tab đang chọn
            tabBarLabelStyle: { fontSize: 12 }, // Tuỳ chỉnh font size của nhãn
            // Không khai báo tabBarIcon để chỉ hiển thị nhãn (label) mà không có icon
        }}>
            <Tab.Screen name={'club-management-member'} options={{title:'Member'}} component={member}/>
            <Tab.Screen name={'club-management-event'} options={{title:'Events'}} component={events}/>
            <Tab.Screen name={'club-management-club'} options={{title:'Club'}} component={club}/>
        </Tab.Navigator>
    );
}
// /
export default React.memo(ManagementScreen);