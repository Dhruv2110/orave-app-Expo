import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, RefreshControl, Pressable, View, ScrollView, TouchableOpacity, Alert, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';


// import Footer from '../components/Footer'
// import ListCard from '../components/ListCard'


import * as Service from '../../api/service';
import { forEach } from 'lodash';

export default function App({ route, navigation }) {


    const [user, setUser] = useState('User')
    const [userId, setUserId] = useState(null)


    const [refreshing, setRefreshing] = useState(false);

    const [data,setData] = useState([])

    const checkUser = async () => {
        const userId = await AsyncStorage.getItem('@enggUserid')
        // console.log(userId)
        setUserId(userId)
        //const getHistory = async () => {
            await Service.getAllServicesEngg({ data: userId })
                .then((res) => {
                    // console.log(res.data);
                    const result = res.data.items
                    setData(result)
                    // console.log("Items:",res.data.items)

                })
                .catch(err => console.log(err))
        //}
        if (userId == null) {
            navigation.push('ELogin')
        }
        else {
            const userName = await AsyncStorage.getItem('@enggName')
            setUser(userName)
        }
    }



    useEffect(() => {
        checkUser()
        //getHistory()
        // console.log(navigation)
    }, [])

    const onRefresh = () => {
        setRefreshing(true);
        checkUser()
        setRefreshing(false);
    };

    const ListCard = ({ ID, reqDate, service, product}) => {
        //console.log(data)
        var date = new Date(reqDate)
        var newDate = date.toLocaleDateString().toString()

        return (
            <TouchableOpacity onPress={() => cardPress(ID)} style={styles.listContainer}>
                <Text style={styles.text}>Request ID : 
                    <Text style={{fontWeight:'bold'}}> {ID}</Text>
                </Text>
                <Text style={styles.text}>Request Date : 
                    <Text style={{ fontWeight: 'bold' }}> {newDate}</Text>
                </Text>
                <Text style={styles.text}>Service Type : 
                    <Text style={{fontWeight:'bold'}}> {service}</Text>
                </Text>
                <Text style={styles.text}>Product : 
                    <Text style={{ fontWeight: 'bold' }}> {product}</Text>
                </Text>
            </TouchableOpacity>
        );
    }

    const cardPress = (ID) => {

        navigation.navigate('EServiceDetail',{id:ID})
    }

    return (
        // <ScrollView contentContainerStyle={styles.container}>
        <>

        <SafeAreaView style={styles.container}>
                <Image
                    source={require('../../assets/header.png')}
                    style={{ width: '100%', height: '10%'}}
                />
                <View style={styles.register}>
                    <Text style={{ fontSize: 25, margin: 10, alignSelf: 'center'}}>
                        Service Requests
                    </Text>
                    <Text style={{ fontSize: 15, fontStyle: 'italic',textAlign:'center' }}>(Pull to refresh)</Text>

                </View>
                <ScrollView style={styles.scroll} refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>
                    
                    {data.map((item) => 
                        <ListCard 
                            key={item._id} 
                            ID={item.ServiceRequestNo} 
                            reqDate={item.createdAt} 
                            service={item.service} 
                            product={item.product}
                        />)}
                    {/* <ListCard />
                    <ListCard />
                    <ListCard /> */}
                    <View style={{height:70}}></View>

                </ScrollView>

        </SafeAreaView>
                {/* <Footer nav={navigation} /> */}

        </>
        //{/* </ScrollView > */ }
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        //alignContent: 'stretch',
        //alignItems:'center',
        justifyContent: 'space-between'
    },
    scroll:{
        flex:1,
        alignSelf:'center',
        width:'95%',
        // height:'20%',
        //borderWidth:2,
        margin:7,
        //padding:10
        //alignItems:'stretch'
        //justifyContent:'space-around'
    },
    listContainer: {
        backgroundColor: 'white',
        width: '95%',
        height: 120,
        //borderWidth:1,
        borderRadius: 10,
        padding: 5,
        margin: 7,
        alignItems: 'flex-start',
        justifyContent: 'center',
        elevation: 7,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 0 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
    },
    text: {
        fontSize: 15,
        margin: 3,
    },


    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        // width:'100%'
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 30,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.30,
        shadowRadius: 4,
        elevation: 5
    },
    buttonM: {
        borderRadius: 20,
        padding: 15,
        elevation: 2,
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#4169E1',
        backgroundColor: "#FFFFFF",
    },
    textStyle: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalHeading: {
        marginBottom: 20,
        fontWeight: "bold",
        fontSize: 15
    },
    modalContent: {
    },
});
