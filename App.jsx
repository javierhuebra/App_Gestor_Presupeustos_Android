

import { React, useState } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert,
  Pressable,
  Image,
  Modal
} from 'react-native';

import Header from './src/components/Header';
import NewBudget from './src/components/NewBudget';
import ControlBudget from './src/components/ControlButget';
import SpentForm from './src/components/SpentForm';

import { generateId } from './src/helpers'
import SpentList from './src/components/SpentList';

const App = () => {

  const [isValidBudget, setIsValidBudget] = useState(false)
  const [budget, setBudget] = useState(0)
  const [bills, setBills] = useState([])
  const [modal, setModal] = useState(false)


  const handleNewBudget = (budget) => {
    if (Number(budget) > 0) {
      setIsValidBudget(true)
    } else {
      Alert.alert('Error', 'The budget cannot be 0 or negative')
    }
  }

  const handleBill = (bill) => {
    //console.log(Object.values(bill)) revisa los valores, si le pongo .keys evalua el nombre tipo key: value

    if (Object.values(bill).includes('')) {
      Alert.alert('Error',
        'You must select all the requirements of the form (Spent name, Spent amount and Spent category)',
        [{ text: 'ok' }])

      return
    }

    //Añadir el nuevo gasto al state

    bill.id = generateId()

    bill.date = Date.now()

    setBills([...bills, bill])

    setModal(!modal)

  }

  return (
    <View style={styles.containerBud}>
      <StatusBar
        backgroundColor='#3b82f6'
        /* hidden={false}  */
        barStyle='light-content'
      /* animated={true} */
      /* showHideTransition='fade' */
      />

      <ScrollView>

        <View style={styles.header}>

          <Header />

          {isValidBudget ? (

            <ControlBudget
              budget={budget}
              bills={bills}
            />

          )
            :
            (<NewBudget
              handleNewBudget={handleNewBudget}
              budget={budget}
              setBudget={setBudget}
            />)}

        </View>

        {isValidBudget && (
          <SpentList
            bills={bills}
          />
        )}

      </ScrollView>
      {modal && (
        <Modal
          animationType='slide'
          visible={modal}
        >
          <SpentForm
            setModal={setModal}
            handleBill={handleBill}
          />

        </Modal>
      )}

      {isValidBudget && (
        <Pressable
          onPress={() => setModal(!modal)}
          style={styles.contModal}
        >
          <Image
            source={require('./src/img/nuevo-gasto.png')}
            style={styles.image}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerBud: {
    backgroundColor: '#F5F5F5',
    flex: 1,

  },
  header: {
    backgroundColor: '#3b82f6',
    paddingTop: 20,
    minHeight:400
  },
  image: {
    width: 60,
    height: 60,
  },
  contModal: {
    position: 'absolute',
    bottom: 40,
    right: 30,

  }
});

export default App;
