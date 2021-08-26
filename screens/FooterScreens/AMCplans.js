import React from 'react';
import { Image, StyleSheet, Text, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Footer from '../../components/Footer'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function App({ route, navigation }) {

    return (
        // <ScrollView contentContainerStyle={styles.container}>
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../../assets/header.png')}
                style={{ width: '100%', height: '10%', marginBottom: 15 }}
            />
            <ScrollView horizontal contentContainerStyle={{ alignItems: 'center' }}>
            <Image
                source={require('../../assets/AMCplans.jpeg')}
                style={styles.image}
            />
            </ScrollView>
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
    image: {
        flex: 1,
        // width: 370,
        height: '100%',
        // aspectRatio: 1.5,
        // resizeMode: 'cover'
    }
});
