import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, Button, TextInput, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Picker } from '@react-native-picker/picker';

import Footer from '../components/Footer'

import * as Auth from '../api/auth';

export default function App({ route, navigation }) {

    // const { service, product, problems, otherProblem } = route.params;
    // const prevData = route.params;
    // console.log("Final", prevData)

    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [mobile, setMobile] = useState('')
    const [email, setEmail] = useState('')

    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');
    const [zip, setZip] = useState('');

    const [landmark, setLandmark] = useState('');
    const [password, setPassword] = useState('');
    const [cnfPassword, setCnfPassword] = useState('');

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const validateMobile = (mobile) => {

    }

    const onSave = () => {

        if (!validateEmail(email)) {
            Alert.alert(
                "",
                "Enter Valid Email Address",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
        }

        else {
            var data = { fname, lname, mobile, email, state, district, zip, landmark, password }
            // console.log(date, timeSlot)
            Auth.signup({ data })
                .then(res => console.log(res.data))
                .catch(err => console.log(err))
        }

    }
    const onCancel = () => {

    }

    useEffect(() => {
        // console.log(date.toLocaleDateString())
    }, [])

    return (
        // <ScrollView contentContainerStyle={styles.container}>
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../assets/header.png')}
                style={{ width: '100%', height: '10%', marginBottom: 15 }}
            />
            <Text style={{ fontSize: 20, fontWeight: '700', margin: 5 }}>Welcome to Orave Customer Care</Text>
            <View style={styles.register}>
                <Text style={{ fontSize: 25, margin: 5 }}>
                    Register Account
                </Text>
            </View>
            <Text style={{ textAlign: 'center' }}>(If you already have an account with us,please login at the login page.)</Text>
            <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                <View style={{ width: '95%', margin: 5 }}>
                    <Text style={{ color: 'blue', fontSize: 17 }}>Your Personal Details:</Text>

                    <TextInput
                        style={styles.input}
                        value={fname}
                        onChangeText={e => setFname(e.trim())}
                        placeholder="*First Name"
                    />
                    <TextInput
                        style={styles.input}
                        value={lname}
                        onChangeText={e => setLname(e.trim())}
                        placeholder="*Last Name"
                    />
                    <TextInput
                        style={styles.input}
                        value={mobile}
                        onChangeText={e => setMobile(e.trim())}
                        placeholder="*Mobile Number"
                        keyboardType='numeric'
                        maxLength={10}
                    />
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={e => setEmail(e.trim())}
                        placeholder="*E-mail"
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.dropdown}>
                            <Picker
                                selectedValue={state}
                                onValueChange={(itemValue, itemIndex) =>
                                    setState(itemValue)}
                                style={{ backgroundColor: 'black', width: 180, height: 50, color: 'grey' }}
                            >
                                <Picker.Item label="*Select State" value="0" />
                                <Picker.Item label="Andhra Pradesh" value="Andhra Pradesh" />
                                <Picker.Item label="Andaman and Nicobar" value="Andaman and Nicobar" />
                                <Picker.Item label="Arunachal Pradesh" value="Arunachal Pradesh" />
                                <Picker.Item label="Assam" value="Assam" />
                                <Picker.Item label="Bihar" value="Bihar" />
                                <Picker.Item label="Chhattisgarh" value="Chhattisgarh" />
                                <Picker.Item label="Chandigarh" value="Chandigarh" />
                                <Picker.Item label="Daman and Diu" value="Daman and Diu" />
                                <Picker.Item label="Delhi" value="Delhi" />
                                <Picker.Item label="Goa" value="Goa" />
                                <Picker.Item label="Gujarat" value="Gujarat" />
                                <Picker.Item label="Haryana" value="Haryana" />
                                <Picker.Item label="Himachal Pradesh" value="Himachal Pradesh" />
                                <Picker.Item label="Jammu and Kashmir" value="Jammu and Kashmir" />
                                <Picker.Item label="Jharkhand" value="Jharkhand" />
                                <Picker.Item label="Karnataka" value="Karnataka" />
                                <Picker.Item label="Kerala" value="Kerala" />
                                <Picker.Item label="Ladakh" value="Ladakh" />
                                <Picker.Item label="Lakshadweep" value="Lakshadweep" />
                                <Picker.Item label="Madhya Pradesh" value="Madhya Pradesh" />
                                <Picker.Item label="Maharashtra" value="Maharashtra" />
                                <Picker.Item label="Manipur" value="Manipur" />
                                <Picker.Item label="Meghalaya" value="Meghalaya" />
                                <Picker.Item label="Mizoram" value="Mizoram" />
                                <Picker.Item label="Nagaland" value="Nagaland" />
                                <Picker.Item label="Odisha" value="Odisha" />
                                <Picker.Item label="Puducherry" value="Puducherry" />
                                <Picker.Item label="Punjab" value="Punjab" />
                                <Picker.Item label="Rajasthan" value="Rajasthan" />
                                <Picker.Item label="Sikkim" value="Sikkim" />
                                <Picker.Item label="Tamil Nadu" value="Tamil Nadu" />
                                <Picker.Item label="Telangana" value="Telangana" />
                                <Picker.Item label="Tripura" value="Tripura" />
                                <Picker.Item label="Uttar Pradesh" value="Uttar Pradesh" />
                                <Picker.Item label="Uttarakhand" value="Uttarakhand" />
                                <Picker.Item label="West Bengal" value="West Bengal" />
                            </Picker>
                        </View>
                        <TextInput
                            style={styles.input2}
                            value={district}
                            onChangeText={setDistrict}
                            placeholder="*District"
                        />
                        <TextInput
                            style={styles.input2}
                            value={zip}
                            keyboardType='numeric'
                            onChangeText={setZip}
                            placeholder="*Zip Code"
                            maxLength={6}
                        />
                    </View>
                    <TextInput
                        style={styles.input}
                        value={landmark}
                        onChangeText={setLandmark}
                        placeholder="*Landmark"
                    />
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="*Password"
                    />
                    <TextInput
                        style={styles.input}
                        value={cnfPassword}
                        onChangeText={setCnfPassword}
                        placeholder="*Confirm Password"
                    />

                </View>
            </ScrollView>
            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={onCancel} style={styles.btnCancel}>
                    <Text style={{ fontSize: 22, color: 'red' }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onSave} style={styles.btnSave}>
                    <Text style={{ fontSize: 22, color: 'white' }}>Submit</Text>
                </TouchableOpacity>
            </View>
            <Footer nav={navigation} />
        </SafeAreaView>
        //{/* </ScrollView > */ }
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
        // margin: 5,
    },

    input: {
        width: '96%',
        height: 40,
        margin: 5,
        borderWidth: 1,
        padding: 5,
        borderRadius: 7
    },
    input2: {
        width: '31%',
        height: 40,
        margin: 3,
        borderWidth: 1,
        padding: 5,
        borderRadius: 7
    },
    dropdown: {
        // fontSize: 10,
        width: '31%',
        height: 40,
        marginLeft: 5,
        margin: 3,
        borderWidth: 1,
        borderRadius: 7,
        justifyContent: 'center'
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
