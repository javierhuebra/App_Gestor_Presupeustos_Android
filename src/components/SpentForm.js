import React, { useEffect, useState } from "react";
import { Pressable, View, Text, StyleSheet, SafeAreaView, TextInput } from "react-native";

import { Picker } from "@react-native-picker/picker";
import globalStyles from "../styles";

const SpentForm = ({
    setModal,
    handleBill,
    setBill,
    bill,
    deleteBill,
    setFilter,
    filterBills }) => {

    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [category, setCategory] = useState('')
    const [id, setId] = useState('')
    const [date, setDate] = useState('')

    useEffect(() => {
        if (bill?.name) {
            setName(bill.name)
            setQuantity(bill.quantity)
            setCategory(bill.category)
            setId(bill.id)
            setDate(bill.date)
        } else {
            /* console.log("no hay nada") */
        }
    }, [bill])
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerBtnCancel}>
                <Pressable
                    onPress={() => {

                        setModal(false)
                        setBill({})

                    }}
                    style={[styles.cancelBtn, styles.btnCancelar]}
                >
                    <Text style={styles.cancelBtnText}>Cancel</Text>
                </Pressable>

                {bill?.name &&
                    <Pressable
                        style={[styles.cancelBtn, styles.btnDelete]}
                        onPress={() => {
                            deleteBill(id)
                            setFilter('')
                            }
                        }
                    >
                        <Text style={[styles.cancelBtnText]}>Delete</Text>
                    </Pressable>}
            </View>

            <View style={styles.form}>

                <Text style={styles.title}>{bill?.name ? 'Edit Spent' : 'New Spent'}</Text>


                <View style={styles.camp}>
                    <Text style={styles.label}>Spent Name</Text>
                    <TextInput
                        placeholder="Spent Name, ej. Food"
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                <View style={styles.camp}>
                    <Text style={styles.label}>Spent Amount</Text>
                    <TextInput
                        placeholder="Spent Amount, ej. $350"
                        keyboardType="numeric"
                        style={styles.input}

                        value={quantity}
                        onChangeText={setQuantity}
                    />
                </View>

                <View style={styles.camp}>
                    <Text style={styles.label}>Spent Category</Text>
                    <Picker
                        style={styles.input}
                        selectedValue={category}
                        onValueChange={(itemValue) => {
                            setCategory(itemValue)
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

                <Pressable
                    style={styles.submitBtn}
                    onPress={() => {

                        handleBill({ name, quantity, category, id, date })
                        setBill({})
                        setFilter('')
                    }
                    }

                >
                    <Text style={styles.submitBtnText}>{bill?.name ? 'Edit Spent' : 'Add Spent'}</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default SpentForm

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1E40AF',
        flex: 1,
        /* justifyContent:'center' */
    },

    form: {
        ...globalStyles.container,

    },
    camp: {
        marginVertical: 10
    },
    title: {
        textAlign: 'center',
        fontSize: 28,
        marginBottom: 40,
        color: '#64748B'
    },
    label: {
        color: '#64748B',
        textTransform: 'uppercase',
        fontSize: 16,
        fontWeight: 'bold'
    },
    input: {
        backgroundColor: '#F5F5F5',
        padding: 10,
        borderRadius: 10,
        marginTop: 10
    },
    submitBtnText: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    submitBtn: {
        backgroundColor: '#3B82F6',
        padding: 10,
        marginTop: 20
    },
    cancelBtn: {
        backgroundColor: '#DB2777',
        paddingVertical: 20,

        paddingHorizontal: 65,



    },
    cancelBtnText: {
        color: '#FFF',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        textAlign: 'center'
    },

    containerBtnCancel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,

        marginTop: 20,
    },

    btnDelete: {
        backgroundColor: 'red'
    }


})