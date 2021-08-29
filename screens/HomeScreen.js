import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, Button, TextInput, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5, MaterialIcons, Ionicons, Entypo   } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';


import Footer from '../components/Footer'

import * as Auth from '../api/auth';

export default function App({ route, navigation }) {

    // const { service, product, problems, otherProblem } = route.params;
    // const prevData = route.params;
    // console.log("Final", prevData)

    const [user,setUser] = useState('User')


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
        // <ScrollView contentContainerStyle={styles.container}>
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../assets/header.png')}
                style={{ width: '100%', height: '10%'}}
            />
            <Text style={{ fontSize: 22, fontWeight: '700'}}>Welcome to Orave Customer Care</Text>
            <View style={styles.register}>
                <Text style={{ fontSize: 25}}>
                    Hello, {user}
                </Text>
            </View>
            <TouchableOpacity onPress={() => { navigation.navigate('ServiceOpt') }} style={{ ...styles.btnSave, backgroundColor:'#ff8080'}}>
                <MaterialIcons name="miscellaneous-services" size={26} color="white" />
                <Text style={{ fontSize: 20, color: 'white', alignSelf: 'flex-start', marginLeft:7 }}>New Service Request</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('History') }} style={{ ...styles.btnSave, backgroundColor:'#0099ff'}}>
                <FontAwesome5 name="list-alt" size={26} color="white" />
                <Text style={{ fontSize: 20, color: 'white', alignSelf: 'flex-start', marginLeft: 7 }}>View Previous Requests</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('ProdRegister') }} style={{ ...styles.btnSave, backgroundColor:'#00b33c'}}>
                <MaterialIcons name="electrical-services" size={26} color="white" />
                <Text style={{ fontSize: 20, color: 'white', alignSelf: 'flex-start', marginLeft: 7   }}>New Product Registration</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => { navigation.navigate('ROrent') }} style={{ ...styles.btnSave, backgroundColor:'#666699'}}>
                <Ionicons name="water" size={26} color="white" />
                <Text style={{ fontSize: 20, color: 'white', alignSelf: 'flex-start', marginLeft: 7   }}>RO on Rent</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('ROrentHistory') }} style={{ ...styles.btnSave, backgroundColor:'#996633'}}>
                <Entypo  name="water" size={26} color="white" />
                <Text style={{ fontSize: 20, color: 'white', alignSelf: 'flex-start', marginLeft: 7   }}>View RO Rent Requests</Text>
            </TouchableOpacity>
            <View style={{height:'5%'}}>

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
        flexDirection:'row',
        // margin: 50,
        width: '80%',
        //borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#43BE72',
        elevation: 20,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 0 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
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
        backgroundColor: 'red',
        elevation: 20,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 0 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
    },
});
