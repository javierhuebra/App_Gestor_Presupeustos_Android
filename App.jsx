

import { React, useState, useEffect } from 'react';

import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Alert,
  Pressable,
  Image,
  Modal,
  Text,
  Linking
} from 'react-native';


import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [modalInfo, setModalInfo] = useState(false)

  useEffect(() => {
    const obtainBudgetStorage = async () => {
      try {
        const budgetStorage = await AsyncStorage.getItem
          ('planner_budget') ?? 0 //esta bueno el operador para constatar que no sea null
        console.log('tenes ', budgetStorage)

        if (budgetStorage > 0) {
          setBudget(budgetStorage)
          setIsValidBudget(true)
          /* console.log(isValidBudget) */
        }


      } catch (error) {
        console.log(error)
      }

    }
    obtainBudgetStorage()
  }, [])

  useEffect(() => {
    if (isValidBudget) {
      const saveBudgetStorage = async () => {
        try {
          await AsyncStorage.setItem('planner_budget', budget)
          /* console.log('tengo alguito') */
        } catch (error) {
          console.log(error)
        }
      }
      saveBudgetStorage();
    }



  }, [isValidBudget])

  useEffect(() => {
    obtainBillsStorage = async () => {
      try {
        const billsStorage = await AsyncStorage.getItem
          ('planner_bills')

        setBills(billsStorage ? JSON.parse(billsStorage) : [])
        console.log('gastos en storage', billsStorage)
      } catch (error) {
        console.log(error)
      }
    }
    obtainBillsStorage()
  }, [])

  useEffect(() => {
    const saveBillsStorage = async () => {
      try {
        await AsyncStorage.setItem('planner_bills', JSON.stringify
          (bills))
      } catch (error) {
        console.log(error)
      }
    }
    saveBillsStorage();
  }, [bills])

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

  const resetApp = () => {
    Alert.alert(
      'Do you want to reset the app?',
      'This will eliminate budget and expenses',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, delete', onPress: async () => {
            try {
              await AsyncStorage.clear()
              setIsValidBudget(false)
              setBudget(0)
              setBills([])
            } catch (error) {
              console.log(error)
            }
          }
        }
      ]
    )
  }

  const handleLink = () => {
    Linking.openURL('https://www.linkedin.com/in/javieremanuelhuebra/');
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
              resetApp={resetApp}
            />

          )
            :
            (
              <NewBudget
                handleNewBudget={handleNewBudget}
                budget={budget}
                setBudget={setBudget}
              />


            )}

        </View>

        {!isValidBudget && <>
          <Pressable
            onPress={() => setModalInfo(true)}
            style={styles.btnInfo}
          >
            <Text style={styles.btnInfoText}>Info</Text>
          </Pressable>

          <View style={styles.contImgLogoApp}>
          <Image
            source={require('./src/img/logoapp.png')}
            style={styles.imgLogoApp}
            
          />
          </View>

          {<Modal
            visible={modalInfo}
            animationType='fade'
            transparent={true}
          >
            <View style={styles.infoContainer}>
              <View style={styles.infoCard}>
                <Text style={styles.infoText}>Gracias por descargar esta app ♥</Text>
                <Text style={styles.infoText}>Version: 1.0 </Text>
                <Text style={styles.infoText}>Nombre: Expense Planner (Planner)</Text>
                <Text style={styles.infoText}>Creado por Javier Huebra 28/04/2023</Text>
                
                <Pressable
                  onPress={() => handleLink()}
                  style={styles.btnLink}
                >
                  <Text style={styles.btnLinkText}>Linkedin</Text>
                </Pressable>
                <Pressable
                  onPress={() => setModalInfo(false)}
                  style={styles.btnCerrar}
                >
                  <Text style={styles.btnCerrarText}>Cerrar</Text>
                </Pressable>
              </View>
            </View>
          </Modal>}
        </>}


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

  },
  infoContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoText: {
    color: 'yellowgreen',
    
    padding: 5

  },
  btnCerrar:{
  backgroundColor: 'yellowgreen',
  marginTop:25,
  padding: 10
  },
  btnCerrarText:{
    textAlign:'center',
    
  },
  infoCard:{
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  btnInfo:{
    backgroundColor:'#37AF78',
    margin:5
  },
  btnInfoText:{
    color: '#FFF',
    margin: 5,
    textAlign: 'center'
  },
  btnLink:{
    backgroundColor: 'rgb(10,102,194)',
    padding: 5,
    marginHorizontal: 45
  },
  btnLinkText:{
    color: '#FFF',
    textAlign: 'center',
    fontWeight:'bold'
  },
  imgLogoApp:{
    width: 400,
    height: 400
  },
  contImgLogoApp:{
    
    alignItems:'center'
  }
});

export default App;
