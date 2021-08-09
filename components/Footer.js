import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {



    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => { }}>
                <Text style={styles.text}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { }}>
                <Text style={styles.text}>Products</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { }}>
                <Text style={styles.text}>Parts</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { }}>
                <Text style={styles.text}>AMC Plans</Text>
            </TouchableOpacity >
            <TouchableOpacity onPress={() => { }}>
                <Text style={styles.text}>Contact Us</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        height: '7%',
        backgroundColor: '#973B45',
        // position: 'absolute',
        // bottom: 0,
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 10
    },
    text: {
        color: 'white',
        fontSize: 17,
        // margin: 3
    }
});
