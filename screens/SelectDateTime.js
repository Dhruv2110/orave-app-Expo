import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, Button, TextInput, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import SnackBar from 'react-native-snackbar-component';
import RadioButtonRN from 'radio-buttons-react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import Footer from '../components/Footer'

import * as Service from '../api/service';

export default function App({ route, navigation }) {

    const { service, product, problems, otherProblem } = route.params;
    // const prevData = route.params;
    // console.log("timesel", prevData)

    const [loading, setLoading] = useState(false)

    const [snackbar, setsnackbar] = useState(false)
    const [snackbarText, setsnackbarText] = useState("")

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

    const onSubmit = () => {
        const getDay = date.getDay()
        console.log(getDay)
        if(getDay == 0 || getDay == 6) {
            setsnackbarText("Not available on Saturday and Sunday")
            setsnackbar(true)
        }
        else {
            Alert.alert(
                "Are your sure?",
                "Are you sure you want to submit service request?",
                [
                    // The "Yes" button
                    {
                        text: "Yes",
                        onPress: () => {
                            onContinue();
                        },
                    },
                    // The "No" button
                    // Does nothing but dismiss the dialog when tapped
                    {
                        text: "No",
                    },
                ]
            );
        }
        
    }

    async function onContinue() {
        
        setLoading(true)
        const userId = await AsyncStorage.getItem('@userid')
        var data = { userId,service, product, problems, otherProblem, InstDate: date.toLocaleDateString().toString(), timeSlot }
        // console.log(date, timeSlot)
        Service.addService({ data })
            .then(async (res) => {
                console.log(res.data)
                if (res.data.code == -3) {
                    setLoading(false)
                    setsnackbarText("Submitted Successfully.Email Not Sent")
                    setsnackbar(true)
                    // console.log("Email Not Found")
                }
                else if (res.data.code == 1) {
                    setLoading(false)
                    setsnackbarText("Submitted Successfully.Email Sent")
                    setsnackbar(true)
                    // navigation.navigate('Login')
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
                setsnackbarText("Please Try Again")
                setsnackbar(true)
            })
        // navigation.navigate('AccRegister', { service, product, problems, otherProblem, InstDate: date.toLocaleDateString().toString(), timeSlot })
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };


    useEffect(() => {
        // console.log(date.toLocaleDateString())
    }, [date])

    return (
        <SafeAreaView style={styles.container}>
            <Spinner
                visible={loading}
                textContent={'Please Wait...'}
                textStyle={{ color: '#FFF' }}
            />
            <SnackBar visible={snackbar}
                bottom={70}
                containerStyle={{ width: '90%', marginHorizontal: 20, borderRadius: 10 }}
                autoHidingTime={0}
                textMessage={snackbarText}
                actionHandler={() => setsnackbar(false)}
                actionText="OK"
                accentColor='#ff9933' />
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
                <RadioButtonRN
                    data={colors}
                    selectedBtn={(e) => setTimeSlot(e.label)}
                    circleSize={16}
                />
            </View>

            <TouchableOpacity onPress={onSubmit} style={styles.btnCont}>
                <Text style={{ fontSize: 20 }}>Submit</Text>
            </TouchableOpacity>
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
