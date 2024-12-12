import React, {useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

const Radio=({title,des,setState,defaultValue,options}:any)=>{
    const [selected, setSelected] = useState(defaultValue);

    const handleSelect = (value:any) => {
        setSelected(value);
        setState(value);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.inputTitle}>{title}:</Text>
            <View style={styles.list}>
                {options.map((option:any, index:any) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.radioContainer}
                        onPress={() => handleSelect(option.value)}
                    >
                        <View style={styles.outerCircle}>
                            {selected === option.value && <View style={styles.innerCircle} />}
                        </View>
                        <Text style={styles.label}>{option.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <Text style={styles.noteText}>{des}</Text>
        </View>
    );
}
//
const styles=StyleSheet.create({
    container: {
        flexDirection: 'column',
        marginBottom:10,
    },
    list:{
      flexDirection:'row',
      justifyContent:'flex-start',
      alignItems:'center'
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        marginHorizontal: 5,
    },
    outerCircle: {
        width: 20,
        height: 20,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#4082FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    innerCircle: {
        width: 10,
        height: 10,
        borderRadius: 6,
        backgroundColor: '#4082FF',
    },
    label: {
        fontSize: 14,
    },
    inputTitle:{
        color:'black',
        fontSize:14,
        marginBottom:5,
        fontWeight:'bold',
    },
    noteText:{
        fontSize:12,
        color:'gray',
        marginTop:5
    }
})
//
export  default     React.memo(Radio);