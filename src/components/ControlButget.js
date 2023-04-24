import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import globalStyles from "../styles";

import { formatQuant } from "../helpers";

const ControlBudget = ({ budget, bills }) => {

    const [aviable, setAviable] = useState(0)
    const [spent, setSpent] = useState(0)

    

    useEffect(() => {
        const totalSpent = bills.reduce((total, spen) => Number(spen.quantity) + total, 0) //Metodos de arrays de javascript para sumar todo lo de un arreglo de objetos o arreglo normal
        const totalAviable = budget - totalSpent

        setSpent(totalSpent)
        setAviable(totalAviable)

        console.log(totalSpent)
        
    },[bills])

    return (
        <View style={styles.container}>
            <View style={styles.centerGraph}>
                <Image
                    style={styles.image}
                    source={require('../img/grafico.jpg')}
                />

            </View>
            <View style={styles.contText}>

                <Text style={styles.value}>
                    <Text style={styles.label}>Budget: </Text>
                    {formatQuant(budget)}
                </Text>



                <Text style={styles.value}>
                    <Text style={styles.label}>Available: </Text>
                    {formatQuant(aviable)}
                </Text>



                <Text style={styles.value}>
                    <Text style={styles.label}>Spent: </Text>
                    {formatQuant(spent)}
                </Text>

            </View>
        </View>
    )
}

export default ControlBudget

const styles = StyleSheet.create({
    container: {
        ...globalStyles.container, //se hace un global style a veces se usa
        
    },
    centerGraph: {
        alignItems: 'center'
    },
    image: {
        width: 250,
        height: 250
    },
    contText: {
        marginTop: 50
    },
    value: {
        fontSize: 24,
        color:'black',
        textAlign:'center'
    },
    label: {
        fontWeight: '700',
        color: '#3b82f6'
    }
})