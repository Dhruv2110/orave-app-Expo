import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Dimensions, Text, TextInput, View, ScrollView,Button, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SnackBar from 'react-native-snackbar-component';
import Spinner from 'react-native-loading-spinner-overlay';
import { Picker } from '@react-native-picker/picker';
import { BarCodeScanner } from 'expo-barcode-scanner';
import BarcodeMask from 'react-native-barcode-mask';

import { FontAwesome5 } from '@expo/vector-icons';

import Footer from '../components/Footer'

import * as Product from '../api/service';


const DWP = [
    { name: 'ALKAPURE (OAI-IWP-AKP01-12MW)', value: 'ALKAPURE-AKP01' },
    { name: 'ALKAPURE (OAI-IWP-AKP02-12MW)', value: 'ALKAPURE-AKP02' },
    { name: 'ALKAPURE (OAI-IWP-AKP03-12MW)', value: 'ALKAPURE-AKP03' },
    { name: 'GRAND+ (OAI-ROWP-GRN01-12MW)', value: 'GRAND+-GRN01' },
    { name: 'GRAND+ (OAI-ROWP-GRN02-12MW)', value: 'GRAND+-GRN02' },
    { name: 'GRAND+ (OAI-ROWP-GRN03-12MW)', value: 'GRAND+-GRN03' },
    { name: 'AMAZE (OAI-ROWP-AMZ01-12MW)', value: 'AMAZE-AMZ01' },
    { name: 'AMAZE (OAI-ROWP-AMZ02-12MW)', value: 'AMAZE-AMZ02' },
    { name: 'AMAZE (OAI-ROWP-AMZ03-12MW)', value: 'AMAZE-AMZ03' },
    { name: 'SUPERB (OAI-ROWP-SUP01-18MW)', value: 'SUPERB-SUP01' },
    { name: 'SUPERB (OAI-ROWP-SUP02-24MW)', value: 'SUPERB-SUP02' },
    { name: 'CLASSIC (OAI-ROWP-CLS01-12MW)', value: 'CLASSIC-CLS01' },
    { name: 'CLASSIC (OAI-ROWP-CLS02-12MW)', value: 'CLASSIC-CLS02' },
    { name: 'CLASSIC (OAI-ROWP-CLS03-12MW)', value: 'CLASSIC-CLS03' },
    { name: 'CLASSIC (OAI-ROWP-CLS04-12MW)', value: 'CLASSIC-CLS04' },
    { name: 'ULTIMAA (OAI-ROWP-ULT01-18MW)', value: 'ULTIMAA-ULT01' },
    { name: 'ULTIMAA (OAI-ROWP-ULT02-24MW)', value: 'ULTIMAA-ULT02' },
    { name: 'ULTIMAA (OAI-ROWP-ULT03-12MW)', value: 'ULTIMAA-ULT03' },
    { name: 'ULTIMAA (OAI-ROWP-ULT04-24MW)', value: 'ULTIMAA-ULT04' },
    { name: 'ULTIMAA (OAI-ROWP-ULT05-12MW)', value: 'ULTIMAA-ULT05' },
    { name: 'RADIX', value: 'RADIX' },
    { name: 'PRIMERA (OAI-ROWP-PRM01-12MW)', value: 'PRIMERA-PRM01' },
    { name: 'PRIMERA (OAI-ROWP-PRM02-12MW)', value: 'PRIMERA-PRM02' },
    { name: 'PRIMERA (OAI-ROWP-PRM03-12MW)', value: 'PRIMERA-PRM03' },
]
const CWP = [
    { name: 'IND.CLASSIC 25 (OAI-RCWP-IND.CLS25)', value: 'IND.CLASSIC 25-CLS25' },
    { name: 'IND.CLASSIC 50 (OAI-RCWP-IND.CLS50)', value: 'IND.CLASSIC 50-CLS50' },
    { name: 'IND.CLASSIC 100 (OAI-RCWP-IND.CLS100)', value: 'IND.CLASSIC 100-CLS100' },
    { name: 'SMARTPURE 25 (OAI-RCWP-SMP25)', value: 'SMARTPURE 25-SMP25' },
    { name: 'SMARTPURE 50 (OAI-RCWP-SMP50)', value: 'SMARTPURE 50-SMP50' },
    { name: 'SMARTPURE 100 (OAI-RCWP-SMP100)', value: 'SMARTPURE 100-SMP100' },
]
const CH = [
    { name: 'AVIATOR (OAI-KA-ECH-AVT01)', value: 'AVIATOR-AVT01' },
    { name: 'PILOT DJ (OAI-KA-ECH-PTJ01)', value: 'PILOT DJ-PTJ01' },
    { name: 'PILOT DJ (OAI-KA-ECH-PTJ02)', value: 'PILOT DJ-PTJ02' },
    { name: 'PILOT TOUCH (OAI-KA-ECH-PTM01)', value: 'PILOT TOUCH-PTM01' },
    { name: 'PILOT TOUCH (OAI-KA-ECH-PTM02)', value: 'PILOT TOUCH-PTM02' },
    { name: 'SENTUM (OAI-KA-ECH-STM01)', value: 'SENTUM-STM01' },
    { name: 'SENTUM SENSOR (OAI-KA-ECH-STM02)', value: 'SENTUM SENSOR-STM02' },
    { name: 'SENTUM SENSOR (OAI-KA-ECH-STM03)', value: 'SENTUM SENSOR-STM03' },
    { name: 'MIRACLE (OAI-KA-ECH-MIR01)', value: 'MIRACLE-MIR01' },
    { name: 'MIRACLE SENSOR (OAI-KA-ECH-MIR02)', value: 'ULTIMAA-MIR02' },
    { name: 'DYNMO (OAI-KA-ECH-DYM01)', value: 'DYNMO-DYM01' },
    { name: 'DYNMO (OAI-KA-ECH-DYM03)', value: 'DYNMO-DYM03' },
    { name: 'DYNMO DELUX (OAI-KA-ECH-DYM02)', value: 'DYNMO DELUX-DYM02' },
    { name: 'DYNMO DELUX (OAI-KA-ECH-DYM04)', value: 'DYNMO DELUX-DYM04' },
    { name: 'LUMA (OAI-KA-ECH-LUM01)', value: 'LUMA-LUM01' },
]
const EG = [
    { name: 'HEARTH (OAI-EG-15L)', value: 'HEARTH-15L' },
    { name: 'HEARTH (OAI-EG-25L)', value: 'HEARTH-25L' },
    { name: 'HEARTH (OAI-EG-35L)', value: 'HEARTH-35L' },
    { name: 'INSTAHOT (OAI-EG-1L)', value: 'INSTAHOT-1L' },
    { name: 'INSTAHOT (OAI-EG-3L)', value: 'INSTAHOT-3L' },
    { name: 'GLAZE (OAI-EG-P-6L)', value: 'GLAZE-P-6L' },
    { name: 'GLAZE (OAI-EG-P-10L)', value: 'GLAZE-P-10L' },
    { name: 'GLAZE (OAI-EG-P-15L)', value: 'GLAZE-P-15L' },
    { name: 'GLAZE (OAI-EG-P-25L)', value: 'GLAZE-P-25L' },
]

const finderWidth = 280;
const finderHeight = 270;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const viewMinX = (width - finderWidth) / 2;
const viewMinY = (height - finderHeight) / 2;

export default function App({navigation}) {

    const [barCodeState, setBarCodeState] = useState({
        hasCameraPermissions: null,
        scanned: false,
        scannedData: '',
        buttonState: 'normal',
    })
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

    // const [hasPermission, setHasPermission] = useState(null);
    // const [scanned, setScanned] = useState(false);

    // PRODUCT BINDING
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


    const getCameraPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setBarCodeState({
            hasCameraPermissions: status === 'granted',
            buttonState: 'clicked',
            scanned: false,
        });
    };

    const handleBarCodeScanned = async ({ type, data }) => {
        setBarCodeState({
            scanned: true,
            scannedData: data,
            buttonState: 'normal',
        });
    };

    if (barCodeState.hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (barCodeState.hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    if (barCodeState.buttonState === 'clicked' && barCodeState.hasCameraPermissions) {
        return (
            // <BarCodeScanner
            //     onBarCodeScanned={barCodeState.scanned ? undefined : handleBarCodeScanned}
            //     style={StyleSheet.absoluteFillObject}
            <View style={{flex: 1}}>
                <BarCodeScanner
                    onBarCodeScanned={barCodeState.scanned ? undefined : handleBarCodeScanned}
                    style={[StyleSheet.absoluteFillObject, styles.containerBarCode]}
                >

                <BarcodeMask edgeColor = "#62B1F6" showAnimatedLine />
                    {/* <Button title="Scan Again" onPress={() => {}} /> */}
                </BarCodeScanner>
            </View>
        );}
    else if (barCodeState.buttonState === 'normal') {
    return (
        
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../assets/header.png')}
                style={{ width: '100%', height: '10%', marginBottom: 10 }}
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
            <View style={{ width: '95%', margin: 10 }}>
                <Text style={{ fontSize: 17,marginVertical:7,marginLeft:5 ,color:'blue'}}>Register Product:</Text>
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
                        {modelList.map((item,index) => (<Picker.Item key={index} label={item.name} value={item.value} />))}
                    </Picker>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <TextInput
                        style={{...styles.input,width:'58%',fontSize:15}}
                        value={barCodeState.scannedData}
                        // onChangeText={setSerialNo}
                        placeholder="*Select Serial Number"
                        editable={false}
                    />
                    <TouchableOpacity onPress={getCameraPermissions} style={styles.btnScan}>
                        <FontAwesome5 name="camera" size={20} color="red" style={{margin:5}} />
                        <Text style={{ fontSize: 14, color: 'black' }}>Scan</Text>
                    </TouchableOpacity>
                </View>

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
}
const styles = StyleSheet.create({
    containerBarCode: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'space-between'
        justifyContent: 'flex-start',
    },
    register: {
        borderWidth: 1,
        margin: 5,
        borderRadius: 5
    },
    dropdown: {
        // fontSize: 10,
        width: '80%',
        height: 40,
        marginLeft: 5,
        margin: 7,
        borderWidth: 1,
        borderRadius: 7,
        justifyContent: 'center'
    },
    input: {
        width: '80%',
        height: 40,
        marginLeft: 5,
        margin: 7,
        borderWidth: 1,
        padding: 5,
        borderRadius: 7,
        // fontSize:15
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
    barCode: {
        // flex: 1,
        // flexDirection: 'column',
        // justifyContent: 'center',
    },
    btnContainer: {
        // position:'absolute',
        // bottom:'10%',
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
    btnScan: {
        width: '20%',
        height: 40,
        // margin: 50,
        borderWidth: 1,
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
        flexDirection:'row'
    },
});
