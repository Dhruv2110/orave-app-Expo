import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Footer from '../components/Footer'

export default function App({ route, navigation }) {

    const { Sid } = route.params;
    console.log(route.params)
    console.log(Sid)

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../assets/header.png')}
                style={{ width: '100%', height: '10%', marginBottom: 20 }}
            />
            <Text style={{ fontSize: 20, fontWeight: '700', margin: 10 }}>Welcome to Orave Customer Care</Text>
            <Text style={{ fontSize: 30, textDecorationLine: 'underline', margin: 20 }}>Select Product</Text>
            <View style={styles.btnContainer}>
                <View style={styles.btncol}>
                    <TouchableOpacity style={{ ...styles.button, backgroundColor: '#EC258F' }}>
                        <Text style={styles.btnText}>DOMESTIC WATER PURIFIER</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ ...styles.button, backgroundColor: '#C7C4E2' }}>
                        <Text style={styles.btnText}>COMMERCIAL WATER PURIFIER</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btncol}>
                    <TouchableOpacity style={{ ...styles.button, backgroundColor: '#83706A' }}>
                        <Text style={{ ...styles.btnText, color: 'white' }}>CHIMNEY HOOD</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ ...styles.button, backgroundColor: '#606061' }}>
                        <Text style={{ ...styles.btnText, color: 'white' }}>
                            ELECTRIC GEYSER
                        </Text>
                    </TouchableOpacity>
                </View>


            </View>
            <Footer />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
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
