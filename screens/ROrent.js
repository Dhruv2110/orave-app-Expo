import React,{useState} from 'react';
import { Image, StyleSheet, Text, View, Alert, Modal, Pressable , TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component'
import AsyncStorage from '@react-native-async-storage/async-storage';
import SnackBar from 'react-native-snackbar-component';
import Spinner from 'react-native-loading-spinner-overlay';

import Footer from '../components/Footer'

import * as RoRent from '../api/service';

export default function App({ route, navigation }) {


    const [loading, setLoading] = useState(false)
    const [snackbar, setsnackbar] = useState(false)
    const [snackbarText, setsnackbarText] = useState("")

    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState("Hello");

    const [table, setTable] = useState('')

    const tableData = {
        tableHead: ['Subscription Period', 'Silver(RO+UF+TDS Regulator)', 'Gold(RO+UV+UF+TDS Regulator)', 'Platinum(RO+UV+UF+Alkaline+TDS Regulator)'],
        tableTitle: ['1 Month', '3 Months', '6 Months', '12 Months'],
        tableData: [
            ['500/mo', '550/mo', '600/mo'],
            ['450/mo', '500/mo', '550/mo'],
            ['400/mo', '450/mo', '500/mo'],
            ['350/mo', '400/mo', '450/mo']
        ]
    }
    
    const onSave = async () => {
        Alert.alert(
            "Are your sure?",
            "Are you sure you want to submit service request?",
            [
                // The "Yes" button
                {
                    text: "Yes",
                    onPress: () => {
                        onContinue();
                    },
                },
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                    text: "No",
                },
            ]
        );
    
    }

    const onContinue = async () => {
        setLoading(true)
        const userId = await AsyncStorage.getItem('@userid')
        var data = { userId }
        console.log(userId)
        await RoRent.addRoRent({ data })
            .then(async (res) => {
                // console.log(res.data)
                if (res.data.code == 1) {
                    setLoading(false)
                    setModalVisible(true)
                }
                else {
                    setLoading(false)
                    setsnackbarText("Please Try Again")
                    setsnackbar(true)
                    // console.log("Try Again")
                }
            })
            .catch(err => {
                setLoading(false)
                setsnackbarText("Some Error Occured.")
                setsnackbar(true)
            })
    }

    return (
        // <ScrollView contentContainerStyle={styles.container}>
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../assets/header.png')}
                style={{ width: '100%', height: '10%', marginBottom: 15 }}
            />
            <Spinner
                visible={loading}
                textContent={'Please Wait...'}
                textStyle={{ color: '#FFF' }}
            />
            <SnackBar visible={snackbar}
                bottom={30}
                containerStyle={{ width: '90%', marginHorizontal: 20, borderRadius: 10 }}
                autoHidingTime={0}
                textMessage={snackbarText}
                actionHandler={() => setsnackbar(false)}
                actionText="OK"
                accentColor='#ff9933' />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    // Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalHeading}>Request Registered Successfully</Text>
                        <Text style={styles.modalContent}>Please Check Request History for Request ID.</Text>
                        <Pressable
                            style={styles.buttonM}
                            onPress={
                                () => {
                                    setModalVisible(!modalVisible);
                                    navigation.navigate('Home')
                                }}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <View style={{borderWidth:1,alignSelf:'center',padding:5,borderRadius:5}}>
                <Text style={{ fontSize: 20, fontWeight: '700', textAlign: 'center'}}> RO on Rent </Text>
            </View>
            <View style={styles.tblcontainer}>
                <Table borderStyle={{ borderWidth: 1 }}>
                    <Row data={tableData.tableHead} flexArr={[1, 1, 1, 1]} style={styles.head} textStyle={styles.text} />
                    <TableWrapper style={styles.wrapper}>
                        <Col data={tableData.tableTitle} style={styles.title} heightArr={[30, 30]} textStyle={styles.text} />
                        <Rows data={tableData.tableData} flexArr={[1, 1, 1]} style={styles.row} textStyle={styles.text} />
                    </TableWrapper>
                </Table>
                <View style={{margin:10}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontWeight:'bold'}}>Security Deposit: </Text>
                        <Text>2000/- Refundable interest Free.</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontWeight: 'bold' }}>Lock-in Period: </Text>
                        <Text>6 Months</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={onSave} style={styles.btnLogout}>
                    <Text style={{ fontSize: 20, color: 'white' }}>Click Here to Book</Text>
                </TouchableOpacity>
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
        // alignItems: 'center',
        justifyContent: 'space-between'
        // justifyContent: 'flex-start',
    },
    tblcontainer: { flex: 1, padding: 5, paddingTop: 20, backgroundColor: '#fff' },
    head: { height: 80, backgroundColor: 'yellow',alignSelf:'center' },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: { height: 30 },
    text: { textAlign: 'center' },
    btnLogout: {
        alignSelf:'center',
        // alignItems:'center',
        // alignContent:'center',
        // justifyContent: 'center',
        margin: 50,
        width: 200,
        //borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#43BE72',
        elevation: 20,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 0 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
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
        marginBottom: 10,
        fontSize: 15
    },

});