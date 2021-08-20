import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SnackBar from 'react-native-snackbar-component'

import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'

import Footer from '../components/Footer'

export default function App({ route, navigation }) {

    const { service, product } = route.params;
    // console.log("prbsel", service, product)

    const [problems, setProblems] = useState([])

    const [input, setInput] = useState('');

    const [snackbar, setsnackbar] = useState(false)
    const [snackbarText, setsnackbarText] = useState("")

    const OPTIONS = [
        {
            item: 'Installation',
            id: 1,
        },
        {
            item: 'AMC',
            id: 2,
        },
        {
            item: 'Routine Service',
            id: 3,
        },
        {
            item: 'Not Working',
            id: 4,
        },
        {
            item: 'Water Overﬂow',
            id: 5,
        },
        {
            item: 'Water Taste Issue',
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
        },
        {
            item: 'Noise Problem',
            id: 13,
        }
    ]

    function onMultiChange() {
        return (item) => setProblems(xorBy(problems, [item], 'id'))
    }

    function onContinue() {
        if(problems.length == 0 && input == '') {
            setsnackbarText("Select or Enter Atleast 1 Problem")
            setsnackbar(true)
        }
        else {

            navigation.navigate('SelectDT', { service, product, problems, otherProblem: input })
        }
        // console.log({ Pid, Sid, problems, other: input })
        // console.log(problems, input)
    }


    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../assets/header.png')}
                style={{ width: '100%', height: '10%' }}
            />
            <SnackBar visible={snackbar}
                bottom={70}
                containerStyle={{ width: '90%', marginHorizontal: 20, borderRadius: 10 }}
                autoHidingTime={0}
                textMessage={snackbarText}
                actionHandler={() => setsnackbar(false)}
                actionText="OK"
                accentColor='#ff9933' />
            <Text style={{ fontSize: 20, fontWeight: '700' }}>Welcome to Orave Customer Care</Text>
            <Text style={{ fontSize: 30, textDecorationLine: 'underline' }}>Select Problems</Text>
                <SelectBox
                    label=""
                    options={OPTIONS}
                    selectedValues={problems}
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
            <View style={{ height: '10%' }}>

            </View>
            <Footer nav={navigation}/>
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
        width: '85%',
        height: 50,
        margin: 10,
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
