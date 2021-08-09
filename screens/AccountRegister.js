import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, Button, TextInput, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Footer from '../components/Footer'

export default function App() {

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


    const onSave = () => {

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
            <Text style={{ textAlign: 'center' }}>(If you already have an account with us,please  login at the login page.)</Text>
            <View style={{ width: '90%', margin: 5 }}>
                <Text style={{ color: 'blue', fontSize: 17 }}>Your Personal Details:</Text>
                <TextInput
                    style={styles.input}
                    value={fname}
                    onChangeText={setFname}
                    placeholder="*First Name"
                />
                <TextInput
                    style={styles.input}
                    value={lname}
                    onChangeText={setLname}
                    placeholder="*Last Name"
                />
                <TextInput
                    style={styles.input}
                    value={mobile}
                    onChangeText={setMobile}
                    placeholder="*Mobile Number"
                />
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="*E-mail"
                />
                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        style={styles.input2}
                        value={state}
                        onChangeText={setState}
                        placeholder="*State"
                    />
                    <TextInput
                        style={styles.input2}
                        value={district}
                        onChangeText={setDistrict}
                        placeholder="*District"
                    />
                    <TextInput
                        style={styles.input2}
                        value={zip}
                        onChangeText={setZip}
                        placeholder="*Zip Code"
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

            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={onCancel} style={styles.btnCancel}>
                    <Text style={{ fontSize: 22, color: 'red' }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onSave} style={styles.btnSave}>
                    <Text style={{ fontSize: 22, color: 'white' }}>Save</Text>
                </TouchableOpacity>
            </View>
            <Footer />
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
        width: '30%',
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
