import React,{useEffect} from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App({ nav }) {
    // useEffect(() => {
    //     console.log("in footer",nav.navigate)
    // }, [])
    const checkUser = async () => {
        const userId = await AsyncStorage.getItem('@userid')
        console.log(userId)
        if (userId == null) {
            nav.push('Login')
        }
        else {
            nav.push('Home')
        }
    }

    // useEffect(() => {
    //     checkUser()
    //     // console.log(navigation)
    // },[])

    const HomePress = async () => {
        const userId = await AsyncStorage.getItem('@userid')
        console.log(userId)
        if (userId == null) {
            nav.push('Login')
        }
        else {
            nav.push('Home')
        }
    }



    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={HomePress}>
                <Text style={{color: 'white',fontSize: 17}}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { }}>
                <Text style={{ color: 'white', fontSize: 17}}>Products</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { }}>
                <Text style={{ color: 'white', fontSize: 17}}>Parts</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { }}>
                <Text style={{ color: 'white', fontSize: 17}}>AMC Plans</Text>
            </TouchableOpacity >
            <TouchableOpacity onPress={() => { }}>
                <Text style={{ color: 'white', fontSize: 17}}>Contact Us</Text>
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
    }
});
