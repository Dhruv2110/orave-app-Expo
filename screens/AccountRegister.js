import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, Pressable, TextInput, View, ScrollView, TouchableOpacity, Alert, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import SnackBar from 'react-native-snackbar-component'
import Spinner from 'react-native-loading-spinner-overlay';

import Footer from '../components/Footer'

import * as Auth from '../api/auth';

export default function App({ route, navigation }) {

    // const { service, product, problems, otherProblem } = route.params;
    // const prevData = route.params;
    // console.log("Final", prevData)
    const [loading, setLoading] = useState(false)
    const [snackbar, setsnackbar] = useState(false)
    const [snackbarText, setsnackbarText] = useState("")
    
    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState("");

    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [mobile, setMobile] = useState('')
    const [email, setEmail] = useState('')

    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');
    const [zip, setZip] = useState('');

    const [address, setAddress] = useState('');
    const [landmark, setLandmark] = useState('');
    const [password, setPassword] = useState('');
    const [cnfPassword, setCnfPassword] = useState('');

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const validateMobile = (mobile) => {

    }

    const onSave = async () => {

        // console.log("In save")
        if (fname == '' || lname == '' || mobile == '' || state == '' || district == '' || zip == '' || address == '' || landmark == '' || password == '') {
            setsnackbarText("Enter All Fields")
            setsnackbar(true)
        }
        else if (password != cnfPassword) {
            setsnackbarText("Password Mismatch")
            setsnackbar(true)
        }
        else if (!validateEmail(email)) {
            setsnackbarText("Enter Valid Email")
            setsnackbar(true)
        }
        else if(mobile.length != 10) {
            setsnackbarText("Mobile No. Must Be of 10 Digit")
            setsnackbar(true)
        }
        else if(zip.length != 6) {
            setsnackbarText("Pincode Must Be of 6 Digit")
            setsnackbar(true)
        }
        else {
            setLoading(true)
            var data = { fname, lname, mobile, email: email.toLowerCase(), state, district, zip,address, landmark, password }
            // console.log(date, timeSlot)
            await Auth.signup({ data })
                .then(async (res) => {
                    console.log(res.data)
                    if (res.data.code == -1) {
                        setLoading(false)
                        setsnackbarText("Email Already Exists")
                        setsnackbar(true)
                        // console.log("Email Not Found")
                    }
                    else if (res.data.code == -2) {
                        setLoading(false)
                        setsnackbarText("Mobile No. Already Exists")
                        setsnackbar(true)
                        // console.log("Email Not Found")
                    }
                    else if (res.data.code == 1) {
                        setLoading(false)
                        // setsnackbarText("Registered Successfully.Please Login")
                        // setsnackbar(true)
                        setModalVisible(true)
                        // navigation.navigate('Login')
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
                    setsnackbarText("Please Try Again")
                    setsnackbar(true)
                })
        }

    }
    const onCancel = () => {
        navigation.navigate('Login')
    }

    const onSnackBarOK = () => {
        setsnackbar(false)
        // navigation.navigate('Login')
    }

    useEffect(() => {
        // console.log(date.toLocaleDateString())
    }, [])

    return (
        // <ScrollView contentContainerStyle={styles.container}>
        <SafeAreaView style={styles.container}>
            <Spinner
                visible={loading}
                textContent={'Please Wait...'}
                textStyle={{ color: '#FFF' }}
            />
            <SnackBar visible={snackbar}
                bottom={70}
                containerStyle={{ width: '90%', marginHorizontal: 20, borderRadius: 10 }}
                autoHidingTime={0}
                textMessage={snackbarText}
                actionHandler={onSnackBarOK}
                actionText="OK"
                accentColor='#ff9933' />
            <Image
                source={require('../assets/header.png')}
                style={{ width: '100%', height: '10%', marginBottom: 15 }}
            />
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
                        <Text style={styles.modalHeading}>Registration Successfull</Text>
                        <Text style={styles.modalContent}>Please Login.</Text>
                        <Pressable
                            style={styles.buttonM}
                            onPress={
                                () => {
                                    setModalVisible(!modalVisible);
                                    navigation.navigate('Login')
                                }}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Text style={{ fontSize: 20, fontWeight: '700', margin: 5 }}>Welcome to Orave Customer Care</Text>
            <View style={styles.register}>
                <Text style={{ fontSize: 25, margin: 5 }}>
                    Register Account
                </Text>
            </View>
            <Text style={{ textAlign: 'center' }}>(If you already have an account with us,please login at the login page.)</Text>
            <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                <View style={{ width: '95%', margin: 5 }}>
                    <Text style={{ color: 'blue', fontSize: 17 }}>Your Personal Details:</Text>

                    <View style={{ flexDirection: 'row' }}>
                        <TextInput
                            style={{...styles.input2,width:'47%',marginLeft:5}}
                            value={fname}
                            onChangeText={e => setFname(e.trim())}
                            placeholder="*First Name"
                        />
                        <TextInput
                            style={{ ...styles.input2, width: '47%'}}
                            value={lname}
                            onChangeText={e => setLname(e.trim())}
                            placeholder="*Last Name"
                        />
                    </View>
                    <TextInput
                        style={styles.input}
                        value={mobile}
                        onChangeText={e => setMobile(e.trim())}
                        placeholder="*Mobile Number"
                        keyboardType='numeric'
                        maxLength={10}
                    />
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={e => setEmail(e.trim())}
                        placeholder="*E-mail"
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.dropdown}>
                            <Picker
                                selectedValue={state}
                                onValueChange={(itemValue, itemIndex) =>
                                    setState(itemValue)}
                                style={{ backgroundColor: 'black', width: 180, height: 50, color: 'grey' }}
                            >
                                <Picker.Item label="*Select State" value="0" />
                                <Picker.Item label="Andhra Pradesh" value="Andhra Pradesh" />
                                <Picker.Item label="Andaman and Nicobar" value="Andaman and Nicobar" />
                                <Picker.Item label="Arunachal Pradesh" value="Arunachal Pradesh" />
                                <Picker.Item label="Assam" value="Assam" />
                                <Picker.Item label="Bihar" value="Bihar" />
                                <Picker.Item label="Chhattisgarh" value="Chhattisgarh" />
                                <Picker.Item label="Chandigarh" value="Chandigarh" />
                                <Picker.Item label="Daman and Diu" value="Daman and Diu" />
                                <Picker.Item label="Delhi" value="Delhi" />
                                <Picker.Item label="Goa" value="Goa" />
                                <Picker.Item label="Gujarat" value="Gujarat" />
                                <Picker.Item label="Haryana" value="Haryana" />
                                <Picker.Item label="Himachal Pradesh" value="Himachal Pradesh" />
                                <Picker.Item label="Jammu and Kashmir" value="Jammu and Kashmir" />
                                <Picker.Item label="Jharkhand" value="Jharkhand" />
                                <Picker.Item label="Karnataka" value="Karnataka" />
                                <Picker.Item label="Kerala" value="Kerala" />
                                <Picker.Item label="Ladakh" value="Ladakh" />
                                <Picker.Item label="Lakshadweep" value="Lakshadweep" />
                                <Picker.Item label="Madhya Pradesh" value="Madhya Pradesh" />
                                <Picker.Item label="Maharashtra" value="Maharashtra" />
                                <Picker.Item label="Manipur" value="Manipur" />
                                <Picker.Item label="Meghalaya" value="Meghalaya" />
                                <Picker.Item label="Mizoram" value="Mizoram" />
                                <Picker.Item label="Nagaland" value="Nagaland" />
                                <Picker.Item label="Odisha" value="Odisha" />
                                <Picker.Item label="Puducherry" value="Puducherry" />
                                <Picker.Item label="Punjab" value="Punjab" />
                                <Picker.Item label="Rajasthan" value="Rajasthan" />
                                <Picker.Item label="Sikkim" value="Sikkim" />
                                <Picker.Item label="Tamil Nadu" value="Tamil Nadu" />
                                <Picker.Item label="Telangana" value="Telangana" />
                                <Picker.Item label="Tripura" value="Tripura" />
                                <Picker.Item label="Uttar Pradesh" value="Uttar Pradesh" />
                                <Picker.Item label="Uttarakhand" value="Uttarakhand" />
                                <Picker.Item label="West Bengal" value="West Bengal" />
                            </Picker>
                        </View>
                        <TextInput
                            style={styles.input2}
                            value={district}
                            onChangeText={e => setDistrict(e.trim())}
                            placeholder="*District"
                        />
                        <TextInput
                            style={styles.input2}
                            value={zip}
                            keyboardType='numeric'
                            onChangeText={setZip}
                            placeholder="*Zip Code"
                            maxLength={6}
                        />
                    </View>
                    <TextInput
                        style={styles.input}
                        value={address}
                        onChangeText={e => setAddress(e.trim())}
                        placeholder="*Address"
                    />
                    <TextInput
                        style={styles.input}
                        value={landmark}
                        onChangeText={e => setLandmark(e.trim())}
                        placeholder="*Landmark"
                    />
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={e => setPassword(e.trim())}
                        placeholder="*Password"
                        secureTextEntry={true}
                    />
                    <TextInput
                        style={styles.input}
                        value={cnfPassword}
                        onChangeText={e => setCnfPassword(e.trim())}
                        placeholder="*Confirm Password"
                        secureTextEntry={true}
                    />

                </View>
            
                
                <TouchableOpacity onPress={onSave} style={styles.btnSave}>
                    <Text style={{ fontSize: 20, color: 'white' }}>Submit</Text>
                </TouchableOpacity>
            <TouchableOpacity onPress={onCancel} style={styles.btnLogin}>
                <Text style={{ fontSize: 15, color: 'blue' }}>Click Here to Login</Text>
            </TouchableOpacity>
            <View style={{height:50}}>

            </View>
            </ScrollView>
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
    register: {
        // margin: 5,
    },

    input: {
        width: '96%',
        height: 40,
        margin: 5,
        borderWidth: 1,
        padding: 5,
        borderRadius: 7
    },
    input2: {
        width: '31%',
        height: 40,
        margin: 3,
        borderWidth: 1,
        padding: 5,
        borderRadius: 7
    },
    dropdown: {
        // fontSize: 10,
        width: '31%',
        height: 40,
        marginLeft: 5,
        margin: 3,
        borderWidth: 1,
        borderRadius: 7,
        justifyContent: 'center'
    },
    btnContainer: {
        width: '95%',
        flexDirection: 'row',
        // alignContent: 'space-between'
        justifyContent: 'space-evenly'
    },
    btnLogin: {
        width: '40%',
        // margin: 50,
        padding: 5,
        alignItems: 'center',
        borderColor: 'red'
    },
    btnSave: {
        // margin: 50,
        width: '35%',
        //borderWidth: 1,
        padding: 5,
        borderRadius: 30,
        alignItems: 'center',
        backgroundColor: '#43BE72'
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
