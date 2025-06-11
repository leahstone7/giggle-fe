import { getAllEvents } from "@/utils/api";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

interface FilterBtnProps {
  onLocationChange: (location: string | null) => void;
}

interface EventLocation {
  value: string;
  label: string;
}

export default function FilterBtn({ onLocationChange }: FilterBtnProps) {
  const [location, setLocation] = useState<EventLocation[]>([]);
  const [filterValue, setFilterValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  useEffect(() => {
    getAllEvents()
      .then((events) => {
        const count = Object.keys(events).length;
        let locationArray: EventLocation[] = [];
        const uniqueVlaues = new Set<string>();
        for (let i = 0; i < count; i++) {
          const location = events[i].event_location;
          if (!uniqueVlaues.has(location)) {
            uniqueVlaues.add(location);
            locationArray.push({
              value: location,
              label: location,
            });
          }
        }
        setLocation(locationArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={location}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Filter by location" : "..."}
        value={filterValue}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setFilterValue(item.value);
          setIsFocus(false);
          onLocationChange(item.value);
        }}
      />
      {filterValue && (
        <TouchableOpacity
          onPress={() => {
            setFilterValue(null);
            onLocationChange(null);
          }}
          style={styles.clearButton}
        >
          <Text style={styles.clearBtnText}>Clear</Text>
        </TouchableOpacity>
      )}
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
    position: "absolute",
    right: 10,
    top: 10,
    zIndex: 1,
  },
  clearBtnText: {
    color: "#979897",
  },
});
