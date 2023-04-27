

import { React, useState } from 'react';

import {
  ScrollView,
  StatusBar,
  StyleSheet,
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
import { Platform } from 'react-native';
import Filter from './src/components/Filter';

console.log('Versión de Android: ', Platform.Version);

const App = () => {

  const [isValidBudget, setIsValidBudget] = useState(false)
  const [budget, setBudget] = useState(0)
  const [bills, setBills] = useState([])
  const [modal, setModal] = useState(false)
  const [bill, setBill] = useState({})
  const [filter, setFilter] = useState('')
  const [filterBills, setFilterBills] = useState([])

  const handleNewBudget = (budget) => {
    if (Number(budget) > 0) {
      setIsValidBudget(true)
    } else {
      Alert.alert('Error', 'The budget cannot be 0 or negative')
    }
  }

  const handleBill = (bill) => {
    //console.log(Object.values(bill)) revisa los valores, si le pongo .keys evalua el nombre tipo key: value

    if ([bill.name, bill.category, bill.quantity].includes('')) {
      Alert.alert('Error',
        'You must select all the requirements of the form (Spent name, Spent amount and Spent category)',
        [{ text: 'ok' }])

      return
    }

    if (bill.id) {
      const updatedBills = bills.map(billState => billState.id === bill.id ? bill : billState)
      setBills(updatedBills)
    } else {
      //Añadir el nuevo gasto al state

      bill.id = generateId()

      bill.date = Date.now()

      setBills([...bills, bill])
    }

    setModal(!modal)

  }

  const deleteBill = id => {

    Alert.alert(
      'Do you want to eliminate this expense?',
      'A deleted expense cannot be recovered.',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, delete', onPress: () => {

            const updatedBills = bills.filter(


              billState => billState.id !== id

            )
            const updatedFilterBills = bills.filter(


              billState => billState.id !== id

            )


            /*  console.log('----Nuevo dbug-----')
             console.log('bills', bills)
             console.log('el id es ', id)
             console.log('updated bills', updatedBills) */

            setBills(updatedBills)
            setFilterBills(updatedFilterBills)
            setModal(!modal)
            setBill({})
          }
        }
      ]
    )

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
          <>
            <Filter 
              setFilter={setFilter}
              filter={filter}

              bills={bills}
              setFilterBills={setFilterBills}
            />

            <SpentList
              bills={bills}
              setModal={setModal}
              setBill={setBill}

              filter={filter}
              filterBills={filterBills}

              setFilter={setFilter}
            />
          </>
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
            bill={bill}
            setBill={setBill}
            deleteBill={deleteBill}

            setFilter={setFilter}
            filterBills={filterBills}
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
    minHeight: 400
  },
  image: {
    width: 70,
    height: 70,
  },
  contModal: {
    position: 'absolute',
    bottom: 40,
    right: 30,
    /* backgroundColor:'red' */

  }
});

export default App;
