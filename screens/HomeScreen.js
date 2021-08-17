import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, Button, TextInput, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';


import Footer from '../components/Footer'

import * as Auth from '../api/auth';

export default function App({ route, navigation }) {

    // const { service, product, problems, otherProblem } = route.params;
    // const prevData = route.params;
    // console.log("Final", prevData)

    const [user,setUser] = useState('User')


    const checkUser = async () => {
        
        if (!user) {
            navigation.navigate('Login')
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
        // <ScrollView contentContainerStyle={styles.container}>
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../assets/header.png')}
                style={{ width: '100%', height: '10%', marginBottom: 15 }}
            />
            <Text style={{ fontSize: 22, fontWeight: '700', margin: 5 }}>Welcome to Orave Customer Care</Text>
            <View style={styles.register}>
                <Text style={{ fontSize: 25, margin: 5 }}>
                    Hello, {user}
                </Text>
            </View>
            <TouchableOpacity onPress={() => { navigation.navigate('ServiceOpt')}} style={styles.btnSave}>
                <Text style={{ fontSize: 20, color: 'white' }}>New Service Request</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('ProdRegister')}} style={styles.btnSave}>
                <Text style={{ fontSize: 20, color: 'white' }}>New Product Registration</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { }} style={styles.btnSave}>
                <Text style={{ fontSize: 20, color: 'white' }}>Previous Service Requests</Text>
            </TouchableOpacity>
            <View style={{height:'25%'}}>

            </View>
            <TouchableOpacity onPress={() => { AsyncStorage.clear();navigation.navigate('Login') }} style={styles.btnLogout}>
                <FontAwesome5 name="power-off" size={18} color="white" />
                <Text style={{ fontSize: 20, color: 'white' }}>Logout</Text>
            </TouchableOpacity>

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
    btnSave: {
        // margin: 50,
        width: '70%',
        //borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#43BE72'
    },
    btnLogout: {
        flexDirection:'row',
        justifyContent:'space-around',
        // margin: 50,
        width: '28%',
        //borderWidth: 1,
        padding: 7,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: 'red'
    },
});
