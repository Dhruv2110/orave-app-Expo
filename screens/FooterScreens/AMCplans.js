import React from 'react';
import { Image, StyleSheet, View,Text, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SliderBox } from "react-native-image-slider-box";

import Footer from '../../components/Footer'


export default function App({ route, navigation }) {

    const images =  [
        require('../../assets/AMC1.jpeg'),
        require('../../assets/AMC2.jpeg'),
        require('../../assets/AMC3.jpeg'),
        require('../../assets/AMC4.jpeg'),
        require('../../assets/AMC5.jpeg'),
        require('../../assets/AMC6.jpeg'),
      ]

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../../assets/header.png')}
                style={{ width: '100%', height: '10%' }}
            />
            <SliderBox 
                images={images}
                sliderBoxHeight={'90%'}
                // resizeMethod='resize'
                resizeMode='contain'
                autoplay
                circleLoop
             />
            <Footer nav={navigation}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
});
