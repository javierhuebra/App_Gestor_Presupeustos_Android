import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import globalStyles
 from "../styles";
const NewBudget = ({
    budget, 
    setBudget, 
    handleNewBudget}) => {


    return (
        <View style={styles.containerBudget}>
            <Text style={styles.label}>Define Budget</Text>
            <TextInput
                style={styles.textEntry}
                keyboardType='numeric'
                placeholder='Add your Budget - Ej. $300,000'
                value= { budget.toString() }
                onChangeText={setBudget}
            />
            <Pressable 

            onPress={() => handleNewBudget(budget)}
            
            style={styles.btnAdd} >
                <Text style={styles.btnAddText}>Add Budget</Text>
            </Pressable>
        </View>
    )
}

export default NewBudget

const styles = StyleSheet.create({
    containerBudget: {
        ...globalStyles.container //se hace un global style a veces se usa
    },
    label:{
       textAlign:'center',
       fontSize:24,
       color:'#3b82f6',
       
    },
    textEntry: {
        marginTop: 30,
        backgroundColor:'#f5f5f5',
        padding: 10,
        borderRadius: 10,
        textAlign:'center',
        
    },
    btnAdd: {
        marginTop: 30,
        backgroundColor: '#1044A4',
        padding: 10,
        borderRadius: 10
    },
    btnAddText: {
        color: '#FFF',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
})