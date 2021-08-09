import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, Button, TextInput, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {


    function onContinue() {
        // console.log(date.toLocaleDateString().toString(), timeSlot)
    }

    useEffect(() => {
        // console.log(date.toLocaleDateString())
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../assets/header.png')}
                style={{ width: '100%', height: '10%', marginBottom: 20 }}
            />
            <Text style={{ fontSize: 20, fontWeight: '700', margin: 10 }}>Welcome to Orave Customer Care</Text>
            <Text style={{ fontSize: 30, textDecorationLine: 'underline', margin: 10 }}>Select Date and Time</Text>

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


    btnCont: {
        // margin: 50,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    },
});
