import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import {Dropdown} from 'react-native-element-dropdown'
import { StyleSheet } from "react-native";

interface SortByProps {
  onSortChange: (value: string | null) => void;
  // resetTrigger?: boolean;
}

interface DropDownItem {
  label: string;
  value: string;
}

const data : DropDownItem[] = [
  {label: "Date", value: 'date'},
  {label: "Artist", value: 'artist'}
]
export default function SortBy({onSortChange, resetTrigger} : SortByProps) {

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  // const renderLabel = () => {
  //   if (value || isFocus) {
  //     return (<Text></Text>);
  //   }
  //   return null;
  // };

  // useEffect(()=> {
  //   setValue(null);
  //   setIsFocus(false);
  // }, [resetTrigger])

  return (
    <View
      style={styles.container}
    >
    
    <Dropdown 
    style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
    data={data} 
    labelField="label"
    valueField="value"
    placeholder="Sort By"
    value={value}
    onFocus={()=> setIsFocus(true)}
    onBlur={()=> {setIsFocus(false)}}
    onChange={item => {
      setValue(item.value);
      setIsFocus(false)
      onSortChange(item.value)
    }
  }
    />
    </View>
  );
}

const styles= StyleSheet.create({
  container:{
        borderWidth: 1,
        backgroundColor: "#edede9",
        padding: 6,
        borderColor: "#ccc",
        width: 100,
        paddingLeft: 10,
        borderRadius: 4,
        alignContent: 'center',
    
      },
      dropdown: {
        height: 10,
      }
})