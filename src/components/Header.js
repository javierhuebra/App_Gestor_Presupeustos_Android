import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Header = () =>{
    return(
        <View>
            <Text style={styles.text}>expense planner</Text>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({

text:{
    color:'#FFF',
    textAlign:'center',
    textTransform:'uppercase',
    fontSize:35,
    fontWeight:'bold'
}
})