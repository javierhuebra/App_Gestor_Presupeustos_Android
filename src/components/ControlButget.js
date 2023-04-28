import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import globalStyles from "../styles";

import { formatQuant } from "../helpers";

import CirclePercent from "./CirclePercent";


const ControlBudget = ({ budget, bills, resetApp }) => {

    const [aviable, setAviable] = useState(0)
    const [spent, setSpent] = useState(0)
    const [percent, setPercent] = useState(0)


    useEffect(() => {
        /* console.log('use effect') */
        const totalSpent = bills.reduce((total, spen) => Number(spen.quantity) + total, 0) //Metodos de arrays de javascript para sumar todo lo de un arreglo de objetos o arreglo normal
        const totalAviable = budget - totalSpent

        const newPercent = ((budget - totalAviable) / budget) * 100

        setSpent(totalSpent)
        setAviable(totalAviable)
        setPercent(Math.trunc(newPercent))
        /*  console.log(newPercent)  */

    }, [bills])

    return (
        <View style={styles.container}>
            <View style={styles.centerGraph}>

                <CirclePercent
                    percent={percent}
                />
                {percent > 100 && <Text style={styles.overBudget}>Over Budget</Text>}

            </View>
            <View style={styles.contText}>

                <Pressable
                    style={styles.btn}
                    onPress={() => resetApp()}
                >
                    <Text style={styles.btnText}>Restart App</Text>
                </Pressable>

                <Text style={styles.value}>
                    <Text style={styles.label}>Budget: </Text>
                    {formatQuant(budget)}
                </Text>

                <Text style={styles.value}>
                    <Text style={styles.label}>Spent: </Text>
                    {formatQuant(spent)}
                </Text>

                <Text style={[styles.value, percent > 100 && styles.overBudget]}>
                    <Text style={styles.label}>Available: </Text>
                    {formatQuant(aviable)}
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
        marginTop: 20
    },
    value: {
        fontSize: 24,
        color: 'black',
        textAlign: 'center'
    },
    label: {
        fontWeight: '700',
        color: '#3b82f6'
    },
    overBudget: {
        color: 'red',
        fontSize: 24,
        marginTop: 0,
        fontWeight: '700'
    },
    btn: {
        backgroundColor: '#DB2777',
        padding: 10,
        marginBottom: 40,
        borderRadius: 5
    },
    btnText: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }

})