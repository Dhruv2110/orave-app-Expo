import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App({ nav }) {


    return (
        <TouchableOpacity style={styles.container}>
            <Text style={styles.text}>Request ID : 1r43f334f</Text>
            <Text style={styles.text}>Request Date : 6/10/21</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'white',
        width: '95%',
        height: 70,
        //borderWidth:1,
        borderRadius:10,
        padding:5,
        margin:7,
        alignItems:'flex-start',
        justifyContent:'center',
        elevation: 7,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 0 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
    },
    text:{
        fontSize:15,
        margin:3
    },
});
