import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Footer from '../components/Footer'

export default function App({ route, navigation }) {

    const { service } = route.params;

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

    const click = (id) => {
        navigation.navigate('ProblemSel', { service, product: id })
    }


    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../assets/header.png')}
                style={{ width: '100%', height: '10%'}}
            />
            <View>
                <Text style={{ fontSize: 25 ,margin:5}}>
                    Hello, {user}
                </Text>
            </View>
            <Text style={{ fontSize: 30, textDecorationLine: 'underline',margin:5 }}>Select Product</Text>
            <View style={styles.btnContainer}>
                <View style={styles.btnRow}>
                    <TouchableOpacity onPress={() => click('DOMESTIC WATER PURIFIER')} style={{ ...styles.button, backgroundColor: '#EC258F' }}>
                        <Text style={styles.btnText}>DOMESTIC WATER PURIFIER</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => click('COMMERCIAL WATER PURIFIER')} style={{ ...styles.button, backgroundColor: '#C7C4E2' }}>
                        <Text style={styles.btnText}>COMMERCIAL WATER PURIFIER</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnRow}>
                    <TouchableOpacity onPress={() => click('CHIMNEY HOOD')} style={{ ...styles.button, backgroundColor: '#83706A' }}>
                        <Text style={{ ...styles.btnText, color: 'white' }}>CHIMNEY HOOD</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => click('ELECTRIC GEYSER')} style={{ ...styles.button, backgroundColor: '#606061' }}>
                        <Text style={{ ...styles.btnText, color: 'white' }}>
                            ELECTRIC GEYSER
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnRow}>
                    <TouchableOpacity onPress={() => click('LPG STOVES')} style={{ ...styles.button, backgroundColor: '#83906A' }}>
                        <Text style={{ ...styles.btnText, color: 'white' }}>LPG STOVES</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
            <Footer nav={navigation}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    btnContainer: {
        // borderWidth:1,
        height:'50%',
        alignItems:'center',
        // alignContent: 'center',
        justifyContent: 'flex-start'
    },
    btnRow: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    button: {
        height: 100,
        width: '42%',
        margin: 10,
        padding: 5,
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
    }

});
