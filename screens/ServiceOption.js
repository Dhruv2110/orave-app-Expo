import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Footer from '../components/Footer'

import * as Auth from '../api/test';

export default function App({ navigation }) {


    const [user, setUser] = useState('User')


    const checkUser = async () => {
        const userId = await AsyncStorage.getItem('@userid')
        // console.log(userId)
        if (userId == null) {
            navigation.push('Login')
        }
        else {
            const userName = await AsyncStorage.getItem('@name')
            setUser(userName)
        }
    }

    useEffect(() => {
        checkUser()
        // console.log(navigation)
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../assets/header.png')}
                style={{ width: '100%', height: '10%', marginBottom: 20 }}
            />
            <View>
                <Text style={{ fontSize: 25 }}>
                    Hello, {user}
                </Text>
            </View>
            <Text style={{ fontSize: 30, textDecorationLine: 'underline', margin: 20 }}>Select Service Option</Text>
            <View style={styles.btnContainer}>
                <View style={styles.btncol}>
                    <TouchableOpacity onPress={() => { navigation.navigate('ProductSel', { service: 'Installation' }) }} style={{ ...styles.button, backgroundColor: 'skyblue' }}>
                        <Text style={styles.btnText}>INSTALLATION</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('ProductSel', { service: 'Preventive Regular Maintenance' }) }} style={{ ...styles.button, backgroundColor: 'lightgreen' }}>
                        <Text style={styles.btnText}>Preventive Regular
                            Maintenance</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btncol}>
                    <TouchableOpacity onPress={() => { navigation.navigate('ProductSel', { service: 'Repair' }) }} style={{ ...styles.button, backgroundColor: 'yellow' }}>
                        <Text style={styles.btnText}>Repair</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('ProductSel', { service: 'AMC' }) }} style={{ ...styles.button, backgroundColor: 'lightgray' }}>
                        <Text style={styles.btnText}>
                            AMC{"\n"}<Text style={{ fontSize: 15 }}>(Annual Maintenance Contract)</Text>
                        </Text>
                    </TouchableOpacity>
                </View>


            </View>
            <View style={{height:'10%'}}>

            </View>
            {/* <TouchableOpacity style={styles.btnNewProduct} >
                <Text style={{ alignSelf: 'center', fontSize: 17 }}>Register for New Product Warranty</Text>
            </TouchableOpacity> */}
            <Footer nav={navigation}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'space-evenly'
        justifyContent: 'space-between',
    },
    btnContainer: {
        alignContent: 'center',
        justifyContent: 'center'
    },
    btncol: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    button: {
        height: 150,
        width: '42%',
        margin: 10,
        justifyContent: 'center',
        borderRadius: 20,
        elevation: 15,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 0 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
    },
    btnText: {
        color: 'black',
        fontSize: 20,
        alignSelf: 'center',
        textAlign: 'center'
    },
    btnNewProduct: {
        height: '7%',
        width: '80%',
        borderWidth: 2,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 50,
        // position: 'absolute',
        // bottom: 40,
        justifyContent: 'center',
    }

});
