import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, Button, TextInput, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import DateTimePicker from '@react-native-community/datetimepicker';
import RadioButtonRN from 'radio-buttons-react-native';

export default function App() {


    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [timeSlot, setTimeSlot] = useState(0)

    const colors = [
        {
            label: '9:00 - 12:00',
            id: 1
        },
        {
            label: '12:00 - 3:00',
            id: 2
        },
        {
            label: '3:00 - 6:00',
            id: 3
        }
    ];

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    function onContinue() {
        console.log(date.toLocaleDateString().toString(), timeSlot)
    }
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };


    useEffect(() => {
        console.log(date.toLocaleDateString())
    }, [date])

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../assets/header.png')}
                style={{ width: '100%', height: '10%', marginBottom: 20 }}
            />
            <Text style={{ fontSize: 20, fontWeight: '700', margin: 10 }}>Welcome to Orave Customer Care</Text>
            <Text style={{ fontSize: 30, textDecorationLine: 'underline', margin: 10 }}>Select Date and Time</Text>
            <View style={styles.dateContainer}>
                <Text style={styles.dateText}>Select Date:</Text>
                {/* <Button onPress={showDatepicker} title="Show date picker!" /> */}
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
            <View style={styles.timeContainer}>
                <Text style={styles.dateText}>Select Time Slot:</Text>
                {/* <Button onPress={showDatepicker} title="Show date picker!" /> */}
                {/* <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.timeSlot} onPress={showDatepicker}>
                        <Text style={{ fontSize: 15 }}>9:00 - 12:00</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.timeSlot} onPress={showDatepicker}>
                        <Text style={{ fontSize: 15 }}>12:00 - 3:00</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.timeSlot} onPress={showDatepicker}>
                        <Text style={{ fontSize: 15 }}>3:00 - 6:00</Text>
                    </TouchableOpacity>
                </View> */}
                <RadioButtonRN
                    data={colors}
                    selectedBtn={(e) => setTimeSlot(e.id)}
                    circleSize={16}
                />
            </View>

            <TouchableOpacity onPress={onContinue} style={styles.btnCont}>
                <Text style={{ fontSize: 20 }}>Continue {'>>'}</Text>
            </TouchableOpacity>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'flex-start',
    },

    dateContainer: {
        width: "90%",
        height: 40,
        margin: 10,
        marginBottom: 50,
    },
    timeContainer: {
        width: "90%",
        // height: 50,
        margin: 10,
        marginBottom: 50
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
        borderColor: '#43A7D3',
    },
    timeSlot: {
        // width: '30%',
        // height: 40,
        // borderWidth: 1,
        // padding: 10,
        // margin: 5,
        // borderRadius: 5,
        // alignItems: 'center',
        // justifyContent: 'center'
    },

    btnCont: {
        // margin: 50,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    },
});
