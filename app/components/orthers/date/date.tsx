import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const DateInput = ({set,value}:any) => {

    const onChange = (event:any, selectedDate:any) => {
        const currentDate = selectedDate || value;
        set(currentDate); // Cập nhật ngày
    };

    return (
        <View style={styles.container}>
            <DateTimePicker
                style={styles.date}
                value={value}
                mode={'date'} // Chỉ chọn ngày
                display="default" // Giao diện mặc định
                onChange={onChange}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:'100%',
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    inputTitle:{
        color:'black',
        fontSize:14,
        fontWeight:'bold',
        marginBottom:5
    },
    date:{
        width:'100%',
    },
    noteText:{
        fontSize:12,
        color:'gray',
        marginTop:5
    }
});

export default DateInput;
