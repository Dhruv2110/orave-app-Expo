import React from 'react';
import { Image, StyleSheet, Text,View, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Footer from '../../components/Footer'


export default function App({ route, navigation }) {

    return (
        // <ScrollView contentContainerStyle={styles.container}>
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../../assets/header.png')}
                style={{ width: '100%', height: '10%', marginBottom: 15 }}
            />
            <View style={styles.cardTitle}>
                <Text style={{fontSize:25, color:'black', textAlign:'center',margin:5,fontWeight:'bold'}}>ORAVE APPLIANCES INDIA</Text>
                <Text style={{ fontSize: 20, color: 'black', textAlign: 'center', margin: 5 }}>(An ISO 9001:2015 Certified)</Text>
            </View>
            <View style={styles.cardPhone}>
                <Text style={{ fontSize: 25, color: 'black', textAlign: 'center', fontStyle: 'italic', fontWeight: 'bold'}}>90345-24683</Text>
                <Text style={{ fontSize: 22, color: 'black', textAlign: 'center'}}>(National Sales)</Text>
                <View style={{height:20}}>

                </View>
                <Text style={{ fontSize: 25, color: 'black', textAlign: 'center', fontStyle: 'italic', fontWeight: 'bold'}}>90535-22333</Text>
                <Text style={{ fontSize: 22, color: 'black', textAlign: 'center'}}>(National Customer Care)</Text>
            </View>
            <View style={styles.cardWeb}>
                <View style={{flexDirection:'row'}}>
                    <Text style={{ fontSize: 20, fontStyle: 'italic', fontWeight:'bold' }}>Email:</Text>
                    <Text style={{ fontSize: 18 }}>oraveappliancesindia@gmail.com</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 20, fontStyle: 'italic', fontWeight: 'bold' }}>Website:</Text>
                    <Text style={{ fontSize: 18 }}>oraveappliancesindia.com</Text>
                </View>
            </View>
            <Footer nav={navigation} />
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
    cardTitle:{
        //borderWidth:1,
        backgroundColor:'white',
        borderRadius:10,
        height:100,
        width:'95%',
        elevation: 10,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 0 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
    },
    cardPhone:{
        padding:10,
        backgroundColor: 'white',
        borderRadius: 10,
        height: 180,
        width: '95%',
        elevation: 10,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 0 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
    },
    cardWeb: {
        //borderWidth:1,
        padding:10,
        backgroundColor: 'white',
        borderRadius: 10,
        height: 100,
        width: '95%',
        elevation: 10,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 0 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
    },
});
