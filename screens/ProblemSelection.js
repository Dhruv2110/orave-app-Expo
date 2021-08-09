import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'

import Footer from '../components/Footer'

export default function App() {

    const [selectedTeams, setSelectedTeams] = useState([])

    const [input, setInput] = useState(null);

    const OPTIONS = [
        {
            item: 'AMC',
            id: 1,
        },
        {
            item: 'Routine Service',
            id: 2,
        },
        {
            item: 'Not Working',
            id: 3,
        },
        {
            item: 'Water Overﬂow',
            id: 4,
        },
        {
            item: 'Water Taste Issue',
            id: 5,
        },
        {
            item: 'Noise Problem',
            id: 6,
        },
        {
            item: 'MOTOR PROBLEM',
            id: 7,
        },
        {
            item: 'TOUCH NOT WORKING',
            id: 8,
        },
        {
            item: 'HEATING PROBLEM',
            id: 9,
        },
        {
            item: 'SUCTION ISSUE',
            id: 10,
        },
        {
            item: 'LEAKAGE ISSUE',
            id: 11,
        },
        {
            item: 'BROKEN ISSUE',
            id: 12,
        }
    ]

    function onMultiChange() {
        return (item) => setSelectedTeams(xorBy(selectedTeams, [item], 'id'))
    }

    function onContinue() {
        console.log(selectedTeams, input)
    }

    // function onInputChange() {
    //     setInput()
    // }

    // useEffect(() => {
    //     console.log(selectedTeams)
    //     console.log(input)
    // }, [selectedTeams, input])

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../assets/header.png')}
                style={{ width: '100%', height: '10%', marginBottom: 20 }}
            />
            <Text style={{ fontSize: 20, fontWeight: '700', margin: 10 }}>Welcome to Orave Customer Care</Text>
            <Text style={{ fontSize: 30, textDecorationLine: 'underline', margin: 10 }}>Select Problems</Text>

            <SelectBox
                label=""
                options={OPTIONS}
                selectedValues={selectedTeams}
                onMultiSelect={onMultiChange()}
                onTapClose={onMultiChange()}
                isMulti
                width='90%'
                hideInputFilter={true}
            />

            <TextInput
                style={styles.input}
                value={input}
                onChangeText={setInput}
                placeholder="Specify, If other"
            />
            <TouchableOpacity onPress={onContinue} style={styles.btnCont}>
                <Text style={{ fontSize: 20 }}>Continue {'>>'}</Text>
            </TouchableOpacity>
            <Footer />
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    input: {
        width: '80%',
        height: 50,
        margin: 30,
        borderWidth: 1,
        padding: 10,
        borderRadius: 7
    },
    btnCont: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    },
});
