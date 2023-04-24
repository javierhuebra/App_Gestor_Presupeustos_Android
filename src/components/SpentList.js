import React from "react"
import { View, StyleSheet, Text } from "react-native"
import Bill from "./Bill"


const SpentList = ({ bills }) => {
    return (
        <View style={styles.containerList}>
            <Text style={styles.title}>Spent List</Text>

            {bills.length === 0 ?
                <Text style={styles.noBill}>No hay gastos</Text>
                :
                bills.map(bill => (
                    <Bill
                        key={bill.id}
                        bill={bill}
                    />
                )
            
            )}
        </View>
    )
}
export default SpentList

const styles = StyleSheet.create({
    containerList: {
        marginTop: 70,
        marginBottom: 100
    },

    title: {
        color: '#64748B',
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '700',
        marginTop: 20
    },
    noBill:{
        color:'#64748B',
        marginTop: 20,
        textAlign: 'center',
        fontSize:20,
        opacity: 0.5
    }
})