import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SnackBar from 'react-native-snackbar-component';
import Spinner from 'react-native-loading-spinner-overlay';
import { Picker } from '@react-native-picker/picker';

import Footer from '../components/Footer'

import * as Product from '../api/service';


const DWP = [
    { name: 'ALKAPURE', value: 'ALKAPURE' },
    { name: 'GRAND+', value: 'GRAND+' },
    { name: 'AMAZE', value: 'AMAZE' },
    { name: 'SUPERB', value: 'SUPERB' },
    { name: 'CLASSIC', value: 'CLASSIC' },
    { name: 'ULTIMAA', value: 'ULTIMAA' },
    { name: 'RADIX', value: 'RADIX' },
    { name: 'PRIMERA', value: 'PRIMERA' },
]
const CWP = [
    { name: 'IND.CLASSIC 25', value: 'IND.CLASSIC 25' },
    { name: 'IND.CLASSIC 50', value: 'IND.CLASSIC 50' },
    { name: 'IND.CLASSIC 100', value: 'IND.CLASSIC 100' },
    { name: 'SMARTPURE 25', value: 'SMARTPURE 25' },
    { name: 'SMARTPURE 50', value: 'SMARTPURE 50' },
]
const CH = [
    { name: 'AVIATOR', value: 'AVIATOR' },
    { name: 'PILOT DJ', value: 'PILOT DJ' },
    { name: 'PILOT TOUCH', value: 'PILOT TOUCH' },
    { name: 'SENTUM', value: 'SENTUM' },
    { name: 'MIRACLE', value: 'MIRACLE' },
    { name: 'MIRACLE SENSOR', value: 'ULTIMAA' },
    { name: 'SENTUM SENSOR', value: 'SENTUM SENSOR' },
    { name: 'DYNMO', value: 'DYNMO' },
    { name: 'DYNMO DELUX', value: 'DYNMO DELUX' },
    { name: 'LUMA', value: 'LUMA' },
]
const EG = [
    { name: 'HEARTH', value: 'HEARTH' },
    { name: 'INSTAHOT', value: 'INSTAHOT' },
    { name: 'GLAZE', value: 'GLAZE' },
]

export default function App({navigation}) {

    const [loading, setLoading] = useState(false)
    const [snackbar, setsnackbar] = useState(false)
    const [snackbarText, setsnackbarText] = useState("")

    const [product, setProduct] = useState('')
    const [model, setModel] = useState(0)
    const [modelList, setModelList] = useState([])
    const [serialNo, setSerialNo] = useState('')
    const [billNo, setBillNo] = useState('')

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (product == 'DOMESTIC WATER PURIFIER') {
            setModel(0)
            setModelList([])
            setModelList(DWP)
        }
        else if (product == 'COMMERCIAL WATER PURIFIER') {
            setModel(0)
            setModelList([])
            setModelList(CWP)
        }
        else if (product == 'CHIMNEY HOOD') {
            setModel(0)
            setModelList([])
            setModelList(CH)
        }
        else if (product == 'ELECTRIC GEYSER') {
            setModel(0)
            setModelList([])
            setModelList(EG)
        }
        else {
            setModel(0)
            setModelList([])
        }
    },[product])


    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const check = () => {
        // console.log(product,model)
        if (product == 0) {
            setsnackbarText("Select Product")
            setsnackbar(true)
        }
        else if (model == 0) {
            setsnackbarText("Select Model")
            setsnackbar(true)
        }
        else if (serialNo == '') {
            setsnackbarText("Enter Serial No.")
            setsnackbar(true)
        }
        else {}
    }

    const onSave = async () => {


        if (product == 0) {
            setsnackbarText("Select Product")
            setsnackbar(true)
        }
        else if (model == 0) {
            setsnackbarText("Select Model")
            setsnackbar(true)
        }
        else if (serialNo == '') {
            setsnackbarText("Enter Serial No.")
            setsnackbar(true)
        }
        else {
            setLoading(true)
            const userId = await AsyncStorage.getItem('@userid')
            var data = { userId, product, model, serialNo, billNo, ProdInstDate: date.toLocaleDateString().toString() }
            // console.log(date, timeSlot)
            await Product.addProduct({ data })
                .then(async (res) => {
                    console.log(res.data)
                    if (res.data.code == 1) {
                        setLoading(false)
                        setsnackbarText("Product Registered Successfully")
                        setsnackbar(true)
                    }
                    else if (res.data.code == -2) {
                        setLoading(false)
                        setsnackbarText("Serial No Already Exists")
                        setsnackbar(true)
                    }
                    else if (res.data.code == -3) {
                        setLoading(false)
                        setsnackbarText("Bill No Already Exists")
                        setsnackbar(true)
                    }
                    else {
                        setLoading(false)
                        setsnackbarText("Please Try Again")
                        setsnackbar(true)
                        // console.log("Try Again")
                    }
                })
                .catch(err => {
                    setLoading(false)
                    setsnackbarText("Some Error")
                    setsnackbar(true)
                })
        }
        
    }
    const onCancel = () => {
        navigation.navigate('Home')
    }

    useEffect(() => {
        // console.log(date.toLocaleDateString())
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../assets/header.png')}
                style={{ width: '100%', height: '10%', marginBottom: 20 }}
            />
            <Spinner
                visible={loading}
                textContent={'Please Wait...'}
                textStyle={{ color: '#FFF' }}
            />
            <SnackBar visible={snackbar}
                bottom={30}
                containerStyle={{ width: '90%', marginHorizontal: 20, borderRadius: 10 }}
                autoHidingTime={0}
                textMessage={snackbarText}
                actionHandler={() => setsnackbar(false)}
                actionText="OK"
                accentColor='#ff9933' />
            
            <Text style={{ fontSize: 20, fontWeight: '700', margin: 10 }}>Welcome to Orave Customer Care</Text>
            <View style={styles.register}>
                <Text style={{ fontSize: 20, margin: 10 }}>
                    Register for New Product Warranty
                </Text>
            </View>
            <View style={{ width: '90%', margin: 10 }}>
                <Text style={{ fontSize: 17 }}>Register Product:</Text>
                {/* <TextInput
                    style={styles.input}
                    value={product}
                    onChangeText={setProduct}
                    placeholder="*Select Product"
                /> */}
                <View style={styles.dropdown}>
                    <Picker
                        selectedValue={product}
                        onValueChange={(itemValue, itemIndex) =>
                            setProduct(itemValue)}
                        style={{ backgroundColor: 'black', width: 500, height: 50, color: 'grey' }}
                    >
                        <Picker.Item label="*Select Product" value="0" />
                        <Picker.Item label="DOMESTIC WATER PURIFIER" value="DOMESTIC WATER PURIFIER" />
                        <Picker.Item label="COMMERCIAL WATER PURIFIER" value="COMMERCIAL WATER PURIFIER" />
                        <Picker.Item label="CHIMNEY HOOD" value="CHIMNEY HOOD" />
                        <Picker.Item label="ELECTRIC GEYSER" value="ELECTRIC GEYSER" />
                    </Picker>
                </View>
                <View style={styles.dropdown}>
                    <Picker
                        selectedValue={model}
                        onValueChange={(itemValue, itemIndex) =>
                            setModel(itemValue)}
                        style={{ backgroundColor: 'black', width: 500, height: 50, color: 'grey' }}
                    >
                        <Picker.Item label="*Select Model" value="0" />
                        {modelList.map(item => (<Picker.Item label={item.name} value={item.value} />))}
                    </Picker>
                </View>
                {/* <TextInput
                    style={styles.input}
                    value={model}
                    onChangeText={setModel}
                    placeholder="*Select Model"
                /> */}
                <TextInput
                    style={styles.input}
                    value={serialNo}
                    onChangeText={setSerialNo}
                    placeholder="*Select Serial Number"
                />
                <TextInput
                    style={styles.input}
                    value={billNo}
                    onChangeText={setBillNo}
                    placeholder="Select Bill Number"
                />
                <Text style={{ fontSize: 17 }}>*Date of Installation:</Text>
                <TouchableOpacity style={styles.Calender} onPress={showDatepicker}>
                    <Text style={{ fontSize: 20 }}>{date.toLocaleDateString().toString()}</Text>
                </TouchableOpacity>
                {show && (<DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
                )}
            </View>

            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={onCancel} style={styles.btnCancel}>
                    <Text style={{ fontSize: 22, color: 'red' }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onSave} style={styles.btnSave}>
                    <Text style={{ fontSize: 22, color: 'white' }}>Submit</Text>
                </TouchableOpacity>
            </View>
            <Footer nav={navigation}/>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between'
        // justifyContent: 'flex-start',
    },
    register: {
        borderWidth: 1,
        margin: 10,
        borderRadius: 5
    },
    dropdown: {
        // fontSize: 10,
        width: '80%',
        height: 40,
        marginLeft: 5,
        margin: 3,
        borderWidth: 1,
        borderRadius: 7,
        justifyContent: 'center'
    },
    input: {
        width: '80%',
        height: 40,
        margin: 5,
        borderWidth: 1,
        padding: 5,
        borderRadius: 7
    },
    dateContainer: {
        width: "90%",
        height: 40,
        margin: 10,
        marginBottom: 50,
    },
    dateText: {
        fontSize: 25,
        textAlign: 'left'
    },
    Calender: {
        borderWidth: 1,
        width: '30%',
        height: 40,
        padding: 5,
        margin: 5,
        borderRadius: 5,
        //borderColor: '#43A7D3',
    },
    btnContainer: {
        width: '95%',
        flexDirection: 'row',
        // alignContent: 'space-between'
        justifyContent: 'space-evenly'
    },
    btnCancel: {
        width: '40%',
        // margin: 50,
        borderWidth: 1,
        padding: 10,
        borderRadius: 30,
        alignItems: 'center',
        borderColor: 'red'
    },
    btnSave: {
        // margin: 50,
        width: '40%',
        //borderWidth: 1,
        padding: 10,
        borderRadius: 30,
        alignItems: 'center',
        backgroundColor: '#43BE72'
    },
});
