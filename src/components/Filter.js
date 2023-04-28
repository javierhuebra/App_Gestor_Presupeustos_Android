import React, { useEffect } from "react"

import { View, Text, StyleSheet } from "react-native"
import { Picker } from "@react-native-picker/picker"
import globalStyles from "../styles"


const Filter = ({filter, setFilter, bills, setFilterBills}) => {

useEffect(() => {
    if(filter === ''){
        setFilterBills([])
    }else{
        const filterBills = bills.filter( bill => bill.category === filter)
        setFilterBills(filterBills)

        console.log(filterBills)
        console.log("filter", filter)

    }
},[filter])

    return (
        <View style={styles.container}>
            <Text style={styles.label} >Filter Spent</Text>
            <Picker
                        style={styles.input}
                        selectedValue={filter}

                        onValueChange={(value) => {
                            setFilter(value)
                        }}
                        
                    >
                        <Picker.Item label="-- Select --" value="" />
                        <Picker.Item label="Saving" value="saving" />
                        <Picker.Item label="House" value="house" />
                        <Picker.Item label="Food" value="food" />
                        <Picker.Item label="Miscellaneous expenses" value="miscllaneous" />
                        <Picker.Item label="Health" value="health" />
                        <Picker.Item label="Leisure" value="leisure" />
                        <Picker.Item label="Subscriptions" value="subscriptions" />
                    </Picker>
        </View>
    )
}

export default Filter

const styles = StyleSheet.create({
    container:{
        ...globalStyles.container,
        transform: [{translateY: 0}],
        marginTop: 80,
        
    },
    label:{
        fontSize: 22,
        fontWeight: '900',
        color: '#64748B',
        marginBottom: 10
    },
    input:{
        backgroundColor: '#F5F5F5',
    }
})