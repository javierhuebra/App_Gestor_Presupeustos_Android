import React from "react"
import { View, StyleSheet, Text } from "react-native"
import Bill from "./Bill"


const SpentList = ({ bills, setModal, setBill, filter, filterBills, setFilter }) => {


    return (
        <View style={styles.containerList}>
            <Text style={styles.title}>Spent List</Text>

            {filter ? filterBills.map(bill => (
                <Bill
                    key={bill.id}
                    bill={bill}
                    setModal={setModal}
                    setBill={setBill}
                />
            )) : bills.map(bill => (
                <Bill
                    key={bill.id}
                    bill={bill}
                    setModal={setModal}
                    setBill={setBill}
                />
            ))}

            {
                (bills.length === 0) && (
                    <Text style={styles.noBill}>No hay gastos</Text>
                )
            }

            {
                (filterBills.length === 0 && bills.length !== 0 && filter !== '') && (
                 <Text style={styles.noBill}>There are expenses but not in this category</Text>
            
                   )
            }



        </View>
    )
}
export default SpentList

const styles = StyleSheet.create({
    containerList: {
        marginTop: 30,
        marginBottom: 70
    },

    title: {
        color: '#64748B',
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '700',
        marginTop: 20
    },
    noBill: {
        color: '#64748B',
        marginTop: 20,
        textAlign: 'center',
        fontSize: 20,
        opacity: 0.5,
        marginHorizontal: 100
    }
})