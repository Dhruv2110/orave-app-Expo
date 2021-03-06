import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, Button, TextInput, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SnackBar from 'react-native-snackbar-component';
import Spinner from 'react-native-loading-spinner-overlay';

import Footer from '../components/Footer'

import * as Auth from '../api/auth';

export default function App({ route, navigation }) {

    // const { service, product, problems, otherProblem } = route.params;
    // const prevData = route.params;
    // console.log("Final", prevData)
    const [loading, setLoading] = useState(false)

    const [snackbar, setsnackbar] = useState(false)
    const [snackbarText, setsnackbarText] = useState("")

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    useEffect(() => {

        const localStorage = async () => {

            console.log("After Save ID", await AsyncStorage.getItem('@userid'))
            console.log("After Save Email", await AsyncStorage.getItem('@email'))
            console.log("After Save Name", await AsyncStorage.getItem('@name'))
        }
        const checkUser = async () => {
            const userId = await AsyncStorage.getItem('@userid')
            const EnggId = await AsyncStorage.getItem('@EnggUserid')
            // console.log(userId)
            if (userId) {
                navigation.push('Home')
            }
            else if(EnggId) {
                navigation.push('EHome')
            }
        }

        checkUser()
    },[])



    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    const onSave = () => {

        if (!validateEmail(email)) {
            // Alert.alert(
            //     "",
            //     "Enter Valid Email Address",
            //     [
            //         { text: "OK", onPress: () => console.log("OK Pressed") }
            //     ]
            // );
            setsnackbarText("Enter Valid Email")
            setsnackbar(true)
        }

        else if(!password) {
            setsnackbarText("Enter Password")
            setsnackbar(true)
        }
        else {
            setLoading(true)
            var data = { email: email.toLowerCase(), password }
            // console.log(data)
            Auth.login({ data })
                .then(async (res) => {
                    // console.log(res.data)
                    if(res.data.code == -2)
                    {
                        setLoading(false)
                        setsnackbarText("Wrong Password")
                        setsnackbar(true)
                        // console.log("Password Mismatch")
                    }
                    else if (res.data.code == -1) {
                        setLoading(false)
                        setsnackbarText("User Not Registered")
                        setsnackbar(true)
                        // console.log("Email Not Found")
                    }
                    else if (res.data.code == 1) {
                        await AsyncStorage.setItem('@userid', res.data.user.id)
                        await AsyncStorage.setItem('@email', res.data.user.email)
                        await AsyncStorage.setItem('@name', res.data.user.name)
                        setLoading(false)
                        navigation.navigate('Home')
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
        }

        // console.log("After Save ID", await AsyncStorage.getItem('@userid'))
        // console.log("After Save Email", await AsyncStorage.getItem('@email'))
        // console.log("After Save Name", await AsyncStorage.getItem('@name'))

    }
    const onRegister = () => {
        navigation.navigate('AccRegister')
    }
    const onEngg = () => {
        navigation.navigate('ELogin')
    }

    useEffect(() => {
        // console.log(date.toLocaleDateString())
    }, [])

    return (
        // <ScrollView contentContainerStyle={styles.container}>
        <SafeAreaView style={styles.container}>
            <Spinner
                visible={loading}
                textContent={'Signing In...'}
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
                style={{ width: '100%', height: '10%', marginBottom: 15 }}
            />
            <Text style={{ fontSize: 20, fontWeight: '700', margin: 5 }}>Welcome to Orave Customer Care</Text>
            <View style={styles.register}>
                <Text style={{ fontSize: 25, margin: 5,fontWeight:'bold' }}>
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
                    secureTextEntry={true}
                    
                />
            </View>
            <TouchableOpacity onPress={onSave} style={styles.btnSave}>
                <Text style={{ fontSize: 22, color: 'white' }}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onRegister} style={styles.btnCancel}>
                <Text style={{ fontSize: 17, color: 'blue',fontWeight:'bold' }}>
                    (Don't Have an Account, Click Here to Register)
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onEngg} style={styles.btnEngg}>
                <Text style={{ fontSize: 25,color:'black' }}>
                    Engineer Login {'>>>'}
                </Text>
            </TouchableOpacity>
            <View style={{ height: '30%' }}>

            </View>
            <Footer nav={navigation}/>
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
    btnEngg: {

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
