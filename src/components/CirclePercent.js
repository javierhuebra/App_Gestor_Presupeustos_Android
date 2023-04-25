import React, { useState, useEffect } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";


const CirclePercent = ({ percent }) => {

    
    
    const [color, setColor] = useState('blue')

    useEffect(()=>{

        percent>100 ? setColor('red') : setColor('blue')
        
    },[percent])
    
    
    return (
        <View style={styles.container} >

            <View style={{
                height: percent*3,
                width: percent*3,
                backgroundColor: color,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 200,
                opacity: 0.3
            }} >


            </View>

            <View style={styles.posText}>
                <Text style={[{ fontSize: 80 }, styles.text]}>{percent}%</Text>
                
            </View>

        </View >
    )
}

export default CirclePercent

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2CAAE8',
        height: 300,
        width: 300,

        justifyContent: 'center',
        alignItems: 'center',

        borderRadius: 200,
        borderColor: '#0982BE',
        borderWidth: 5

    },
    posText: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',

    },
    text: {
        fontWeight: '700',
        color: 'white'

    }

})