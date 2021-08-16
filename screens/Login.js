import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, Button, TextInput, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


import Footer from '../components/Footer'

import * as Auth from '../api/auth';

export default function App({ route, navigation }) {

    // const { service, product, problems, otherProblem } = route.params;
    // const prevData = route.params;
    // console.log("Final", prevData)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
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
            var data = { email, password }
            console.log(data)
            Auth.login({ data })
                .then(res => console.log(res.data))
                .catch(err => console.log(err))
        }

    }
    const onRegister = () => {
        navigation.navigate('AccRegister')
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
                    LOGIN
                </Text>
            </View>
            <View style={{ width: '95%', margin: 5 }}>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={e => setEmail(e.trim())}
                    placeholder="*Email"
                />
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={e => setPassword(e.trim())}
                    placeholder="*Password"
                />
            </View>
            <TouchableOpacity onPress={onSave} style={styles.btnSave}>
                <Text style={{ fontSize: 22, color: 'white' }}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onRegister} style={styles.btnCancel}>
                <Text style={{ fontSize: 15, color: 'blue' }}>
                    (Don't Have an Account, Click Here to Register)
                </Text>
            </TouchableOpacity>
            <View style={{ height: '30%' }}>

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
    btnContainer: {
        width: '95%',
        flexDirection: 'row',
        // alignContent: 'space-between'
        justifyContent: 'space-evenly'
    },
    btnCancel: {

        padding: 10,
        alignItems: 'center',
    },
    btnSave: {
        // margin: 50,
        width: '70%',
        //borderWidth: 1,
        padding: 10,
        borderRadius: 30,
        alignItems: 'center',
        backgroundColor: '#43BE72'
    },
});
