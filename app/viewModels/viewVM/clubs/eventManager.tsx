import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import Overview from "@/app/views/uis/clubs/managers/events/content/overview";
import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import List from "@/app/views/uis/clubs/managers/events/content/list";
import EventRegister from "@/app/views/uis/clubs/managers/events/content/register";

const Tab=createBottomTabNavigator()
const EventManager=()=>{
    return (
        // @ts-ignore
        <Tab.Navigator initialRouteName="event-overview" screenOptions={{lazy:true,headerShown:false,tabBarIcon:()=>{},tabBarLabelStyle:{fontSize:14}}}>
            <Tab.Screen name={'event-overview'} options={{title:'Overview'}} component={Overview} />
            <Tab.Screen name={'event-list'} options={{title:'Events'}} component={List} />
            <Tab.Screen name={'event-register'} options={{title:'Register'}} component={EventRegister} />
        </Tab.Navigator>
    )
}
export default React.memo(EventManager);