import {StyleSheet, Text, View} from "react-native";
import {LineChart} from "react-native-chart-kit";
import React, {useEffect, useState} from "react";
import useSettings from "@/contexts/settings/settings";
import {WINDOW_WIDTH} from "@gorhom/bottom-sheet";
import EventVM from "@/app/viewModels/eventVM/eventVM";
import useData from "@/contexts/datas/data";

const Line=()=>{
    const {theme}=useSettings();
    const {data}=useData();
    const [value,setValue]=useState({label:[],data:[0]});
    const {lineChart}=EventVM();
    useEffect(() => {
        const fetch=async ()=>{
            try{
                const {status,value:response}=await lineChart(data?.club?.id)
                if(!status)return;
                setValue(response);
                console.log('response:');
                console.log(response);
            }catch (e) {
                console.log('UI: '+e)
            }
        }
        fetch()
    }, []);
    return (
        <View style={{flex:1,width:'100%',paddingTop:10}}>
            <Text style={style.inputTitle}>Total number of events over the years.</Text>
            <LineChart
                style={{width:'100%',
                    marginVertical: 8,
                    borderRadius: 16,}}
                data={{
                    labels: value.label,
                    datasets: [{ data: value.data.length>0?value.data:[0]}],
                }}
                width={WINDOW_WIDTH -30} // từ Dimensions.get('window').width
                height={220}
                yAxisLabel=""
                yAxisSuffix=" events"
                chartConfig={{
                    backgroundColor: '#ffffff',
                    backgroundGradientFrom: '#4f78ac',
                    backgroundGradientTo: '#4f78ac',
                    decimalPlaces: 0, // Số chữ số thập phân
                    color: (opacity) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity ) => 'white',
                }}
            />
            <Text style={style.noteText}>Events counted over the years include both internal events and events participating in main events. (Events participating in the main event need to be approved.)</Text>
        </View>
    )
}
export default React.memo(Line);
const style=StyleSheet.create({
    inputTitle:{
        color:'black',
        fontSize:14,
        fontWeight:'bold',
    },
    noteText:{
        fontSize:12,
        color:'gray',
        marginTop:5
    }
})