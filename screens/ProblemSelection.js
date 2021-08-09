import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {

    const [color, setColor] = useState('white')

    const check = () => {
        if (color == 'yellow')
            setColor('white')
        else
            setColor('yellow')
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../assets/header.png')}
                style={{ width: '100%', height: '10%', marginBottom: 20 }}
            />
            <Text style={{ fontSize: 20, fontWeight: '700', margin: 10 }}>Welcome to Orave Customer Care</Text>
            <Text style={{ fontSize: 30, textDecorationLine: 'underline', margin: 10 }}>Select Service Option</Text>
            <View style={styles.btnContainer}>
                <View style={styles.row}>
                    <TouchableOpacity onPress={check} style={{ ...styles.test, backgroundColor: color }}>
                        <Text style={styles.btnText}>AMC</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={check} style={{ ...styles.test, backgroundColor: color }}>
                        <Text style={styles.btnText}>AMC</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={check} style={{ ...styles.test, backgroundColor: color }}>
                        <Text style={styles.btnText}>AMC</Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.row}>
                    <TouchableOpacity onPress={check} style={{ ...styles.test, backgroundColor: color }}>
                        <Text style={styles.btnText}>AMC</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={check} style={{ ...styles.test, backgroundColor: color }}>
                        <Text style={styles.btnText}>AMC</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={check} style={{ ...styles.test, backgroundColor: color }}>
                        <Text style={styles.btnText}>AMC</Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.row}>
                    <TouchableOpacity onPress={check} style={{ ...styles.test, backgroundColor: color }}>
                        <Text style={styles.btnText}>AMC</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={check} style={{ ...styles.test, backgroundColor: color }}>
                        <Text style={styles.btnText}>AMC</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={check} style={{ ...styles.test, backgroundColor: color }}>
                        <Text style={styles.btnText}>AMC</Text>
                    </TouchableOpacity>

                </View>

            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'space-between',
    },
    btnContainer: {
        alignContent: 'center',
        justifyContent: 'center'
    },
    test: {
        height: 100,
        width: 100,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        margin: 10
    },
    row: {
        flexDirection: 'row'
    },
    btnText: {
        color: 'black',
        fontSize: 20,
        alignSelf: 'center',
        textAlign: 'center'
    }

});
