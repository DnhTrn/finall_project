import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import DateInput from "@/app/components/orthers/date/date";
import useData from "@/contexts/datas/data";
import EventVM from "@/app/viewModels/eventVM/eventVM";

const Bar = () => {
    const [date,setDate] =useState(new Date());
    const [setup,setSetup]=useState(true);
    const {data}=useData();
    const [value,setValue]=useState({label:[],data:[0]});
    const {barChart}=EventVM();
    useEffect(() => {
        const currentDate = new Date(); // Lấy ngày hiện tại
        const lastYearDate = new Date();
        lastYearDate.setFullYear(currentDate.getFullYear() - 1);
        setDate(lastYearDate);
        setSetup(false);
    }, []);
    //
    useEffect(() => {
        const fetch=async ()=>{
            try{
                console.log('date ui log:');
                console.log(date);
                const {status,value:response}=await barChart(date,data?.club?.id)
                if(!status)return;
                setValue(response);
                console.log('response');
                console.log(response);
            }catch (e) {
                console.log('UI: '+e)
            }
        }
        console.log(date);
        if(!setup){
            fetch()
        }
    }, [date]);
    const screenWidth = Dimensions.get('window').width;
    return (
        <View style={styles.container}>
            <Text style={styles.inputTitle}>Event participation chart</Text>
            <View style={styles.wrap}>
                <Text style={styles.noteText}>Select start date.</Text>
                <DateInput value={date} set={setDate}/>
            </View>
            <BarChart
                style={styles.chart}
                data={{
                    labels: value.label,
                    datasets: [
                        {
                            data: value.data.length>0?value.data:[0],
                        },
                    ],
                }}
                showBarTops={true}
                showValuesOnTopOfBars={true}
                width={screenWidth - 32} // Trừ đi padding của View ngoài
                height={220}
                yAxisLabel="Events"
                yAxisSuffix=" users"
                chartConfig={{
                    backgroundColor: '#ffffff',
                    backgroundGradientFrom: '#4f78ac',
                    backgroundGradientTo: '#4f78ac',
                    decimalPlaces: 0, // Số chữ số thập phân
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                    propsForDots: {
                        r: '2',
                        strokeWidth: '2',
                        stroke: '#ffa726',
                    },
                }}
                verticalLabelRotation={0}
            />
            <Text style={styles.noteText}>Statistics chart from selected time until current date. The events listed include both internal and participating events and main events.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
    },
    wrap:{
      width:'100%',
      flexDirection:"row",
      justifyContent:'flex-start',
      alignItems:'center'
    },
    inputTitle:{
        color:'black',
        width:'100%',
        marginBottom:5,
        fontSize:14,
        fontWeight:'bold',
    },
    noteText:{
        fontSize:12,
        color:'gray',
        marginTop:5
    }
});

export default React.memo(Bar);
