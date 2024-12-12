import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import Home from "@/app/views/uis/home/home";
import EventContent from "@/app/views/uis/event/detail/content";
import EventMember from "@/app/views/uis/event/detail/members";
import React from "react";

const Tab=createMaterialTopTabNavigator();
const EventScreen=()=>{
    return (
        <Tab.Navigator initialRouteName={'event-content'} screenOptions={{lazy:true}}>
            <Tab.Screen options={{title:'Content'}} name="event-content" component={EventContent} />
            <Tab.Screen options={{title:'Members'}} name="event-members" component={EventMember} />
        </Tab.Navigator>
    )
}
//
export default React.memo(EventScreen)