import React from "react"
import { View, StyleSheet, Text, Image, Pressable } from "react-native"

import globalStyles from "../styles"
import { formatQuant } from "../helpers"
import { formatDate } from "../helpers"

const dictionaryIcons = {
    saving: require('../img/icono_ahorro.png'),
    food: require('../img/icono_comida.png'),
    house: require('../img/icono_casa.png'),
    miscllaneous: require('../img/icono_gastos.png'),
    leisure: require('../img/icono_ocio.png'),
    health: require('../img/icono_salud.png'),
    subscriptions: require('../img/icono_suscripciones.png'),
}

const Bill = ({ bill, setModal, setBill }) => {

    const { name, date, quantity, category } = bill

    const handleActions = () => {
        setModal(true)
        setBill(bill)
        
    }
    return (
        <Pressable
            onPress={handleActions}
        >
            <View style={styles.containerBill}>

                <View style={styles.content}>
                    <View style={styles.contentainerImage}>
                        <Image
                            source={dictionaryIcons[category]}
                            style={styles.image}
                        />

                        <View style={styles.contentainerText}>
                            <Text style={styles.category}>{category}</Text>
                            <Text style={styles.name}>{name}</Text>
                            <Text style={styles.date}>{formatDate(date)}</Text>
                        </View>

                    </View>


                    <Text style={styles.quantity}>{formatQuant(quantity)}</Text>

                </View>

            </View>
        </Pressable>
    )
}
export default Bill

const styles = StyleSheet.create({
    containerBill: {
        ...globalStyles.container,
        marginBottom: 10
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    contentainerImage: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1

    },
    image: {
        width: 80,
        height: 80,
        marginRight: 20
    },
    contentainerText: {
        flex: 1,

    },
    category: {
        color: '#94A3B8',
        fontSize: 16,
        fontWeight: '700',
        textTransform: 'uppercase',
        marginBottom: 5
    },
    name: {
        fontSize: 22,
        color: '#64748B'
    },
    quantity: {
        fontSize: 20,
        fontWeight: '700'
    },
    date: {
        fontWeight: '700',
        color: '#DB2777'
    }


})