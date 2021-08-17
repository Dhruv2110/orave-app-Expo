import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, Button, TextInput, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Footer from '../components/Footer'

import * as Service from '../api/service';

export default function App({navigation}) {

    const [product, setProduct] = useState('')
    const [model, setModel] = useState('')
    const [serialNo, setSerialNo] = useState('')
    const [billNo, setBillNo] = useState('')

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);


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
        const userId = await AsyncStorage.getItem('@userid')
        var data = { userId, product, model, serialNo, billNo, ProdInstDate: date.toLocaleDateString().toString() }
        // console.log(date, timeSlot)
        Service.addProduct({ data })
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }
    const onCancel = () => {

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
            <Text style={{ fontSize: 20, fontWeight: '700', margin: 10 }}>Welcome to Orave Customer Care</Text>
            <View style={styles.register}>
                <Text style={{ fontSize: 20, margin: 10 }}>
                    Register for New Product Warranty
                </Text>
            </View>
            <View style={{ width: '90%', margin: 10 }}>
                <Text style={{ fontSize: 17 }}>Register Product:</Text>
                <TextInput
                    style={styles.input}
                    value={product}
                    onChangeText={setProduct}
                    placeholder="*Select Product"
                />
                <TextInput
                    style={styles.input}
                    value={model}
                    onChangeText={setModel}
                    placeholder="*Select Model"
                />
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
                    placeholder="*Select Bill Number"
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
