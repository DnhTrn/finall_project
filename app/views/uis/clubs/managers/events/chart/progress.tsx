import {StyleSheet, Text, View} from "react-native";
import {ProgressChart} from "react-native-chart-kit";
import {WINDOW_WIDTH} from "@gorhom/bottom-sheet";
import React, {useEffect, useState} from "react";
import useSettings from "@/contexts/settings/settings";
import EventVM from "@/app/viewModels/eventVM/eventVM";
import {data} from "@remix-run/router";

const Progress=({event}:any)=>{
    console.log(event?.id,event?.club_id,event.pre_id!=null);
    const {theme}=useSettings();
    const [value,setValue]=useState({value:{labels:[],data:[0,0,0]},count:0});
    const {checkout}=EventVM();
    useEffect(() => {
        const fetch=async ()=>{
            try{
                const {status,value,count}=await checkout(event.id,event?.club_id,event.pre_id!=null);
                if(!status)return;
                setValue({value, count});
                console.log(value);
            }catch (e) {
                console.log('Ui: '+e);
            }
        }
        fetch();
    }, []);
    return (
        <View style={style.container}>
            <Text>Event summary</Text>
            <Text>Total members joined: {value.count??0}</Text>
            <Text style={[{color:theme.text.second},style.des]}>The total number of participants is calculated from the time the event opens for participation until the event is completed and closed.</Text>
            <ProgressChart data={value.value} width={WINDOW_WIDTH-32}
           height={250}
           strokeWidth={22}
           radius={32}
           chartConfig={{
               backgroundColor: '#ffffff',
               backgroundGradientFrom: '#ffffff',
               backgroundGradientTo: '#ffffff',
               color: (opacity ) => `rgba(38, 83, 162, ${opacity})`,
               strokeWidth: 0.5,  // Độ dày của viền
               barPercentage: 0.2,
               linejoinType:'miter',
           }}
           hideLegend={false}/>
            {event.pre_id!=null&&<Text style={[{color: theme.text.second}, style.des]}>The statistics include atten which is the proportion
                of participants who checked in to the event, club which is the proportion of club members who
                participated, and other which is the proportion whose participants were not members of the club.</Text>}
            {event.pre_id==null&&<Text style={[{color: theme.text.second}, style.des]}>The statistics include atten which is the proportion
                of participants who checked in to the event, club which is the proportion of club members who
                participated.</Text>}
        </View>
    )
}
const style=StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        marginVertical:5,
        alignSelf:'flex-start'
    },
    des:{
        fontSize:12
    }
})
//
export default React.memo(Progress)