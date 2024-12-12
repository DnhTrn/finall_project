import {StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import {EvilIcons, MaterialIcons} from "@expo/vector-icons";
import React from "react";
import useSettings from "@/contexts/settings/settings";

/**
 *
 * @param set set search value
 * @param handle function when change value search
 * @constructor
 */
const Search=({value,set,handle}:any)=>{
    // @ts-ignore
    const {theme}=useSettings();
    return (
        <View style={[{borderColor:theme.border.main},style.input_zone]} >
            <TextInput value={value} onChangeText={set} onEndEditing={handle} style={style.input} placeholder={'Input member id'}/>
            {!value&&<EvilIcons style={{color: theme.icon.th3}} name={'search'} size={24}/>}
            {value&&<TouchableOpacity onPress={()=>set('')}>
                <MaterialIcons name={'clear'} size={19} style={{color: theme.icon.th3}} />
            </TouchableOpacity>}
        </View>
    )
}
//
export default React.memo(Search);
//
const style=StyleSheet.create({
    input_zone:{
        flexDirection:'row',
        borderStyle:'solid',
        borderWidth:1,
        paddingHorizontal:10,
        paddingVertical:5,
        borderRadius:15,
        marginBottom:10,
        justifyContent:'space-between',
        alignItems:'center'
    },
    input:{
        width:'90%',
        paddingHorizontal:10,
    },
})