import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

interface SortByProps {
  onSortChange: (value: string | null) => void;
}

interface DropDownItem {
  label: string;
  value: string;
}

const data: DropDownItem[] = [
  { label: "Date", value: "date" },
  { label: "Artist", value: "artist" },
];
export default function SortBy({ onSortChange }: SortByProps) {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState<boolean>(false);


  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Sort By" : "..."}

        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}  
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
          onSortChange(item.value);
        }}
      />
       {value && (
                  <TouchableOpacity
                  onPress={()=> {
                      setValue(null);
                      onSortChange(null)
                  }}
                  style={styles.clearButton}
                  >
                      <Text style={styles.clearBtnText}>Clear</Text>
                  </TouchableOpacity>
              )
      
              }
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",

    padding: 6,
    borderColor: "#ccc",
    borderRadius: 10,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  clearButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 1,
  },
  clearBtnText: {
    color: "#979897"
  }
});
