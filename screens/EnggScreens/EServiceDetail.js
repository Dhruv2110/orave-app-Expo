import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TextInput, Pressable, View, ScrollView, TouchableOpacity, Alert, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';

import AsyncStorage from '@react-native-async-storage/async-storage';


import * as Service from '../../api/service';
import { forEach } from 'lodash';

export default function App({ route, navigation }) {


    const [user, setUser] = useState('User')
    const [userId, setUserId] = useState(null)

    const [status, setStatus] = useState('')
    const [remarks, setRemarks] = useState('')

    const {id} = route.params;
    const [data,setData] = useState([{}])
    const [reqDate,setReqDate] = useState('')

    useEffect(() => {
        checkUser()

        async function checkUser() {
            await Service.getServiceDetail({ data: id })
                .then((res) => {
                    // console.log(res.data.items);
                    const result = res.data.items
                    // setData(prev => ([...prev, ...result]));
                    setData(result)
                    var reDate = result[0].createdAt
                    setReqDate(result[0].createdAt)
                })
                .catch(err => console.log(err))
        }
    },[])

    // useEffect(() =>{
    //      console.log(data);
    // },[data])

    const onSave = async () => {
        var items = {
            id,
            status,
            remarks,
        }
        await Service.updateServiceDetail({ data: items })
            .then((res) => {
                // console.log(res.data);
            })
            .catch(err => console.log(err))
    }

    return (
        <>

        <SafeAreaView style={styles.container}>
                <Image
                    source={require('../../assets/header.png')}
                    style={{ width: '100%', height: '10%'}}
                />
                <View style={styles.register}>
                    <Text style={{ fontSize: 25, margin: 10, alignSelf: 'center'}}>
                        Service Request Detail
                    </Text>

                </View>
                <View>

                    <Text style={styles.text}>Request ID :
                        <Text style={{ fontWeight: 'bold' }}> {data[0].ServiceRequestNo}</Text>
                    </Text>
                    <Text style={styles.text}>Request Date :
                        <Text style={{ fontWeight: 'bold' }}> {reqDate.slice(0,10)}</Text>
                    </Text>
                    <Text style={styles.text}>Service Type :
                        <Text style={{ fontWeight: 'bold' }}> {data[0].service}</Text>
                    </Text>
                    <Text style={styles.text}>Product :
                        <Text style={{ fontWeight: 'bold' }}> {data[0].product}</Text>
                    </Text>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={styles.text}>Set Status :
                        </Text>
                        <View style={styles.dropdown}>
                            <Picker
                                selectedValue={status}
                                onValueChange={(itemValue, itemIndex) =>
                                    setStatus(itemValue)}
                                style={{ backgroundColor: 'black', width: 500, height: 50, color: 'grey' }}
                            >
                                <Picker.Item label="-- Set Status --" value="0" />
                                <Picker.Item label="Completed" value="Completed" />
                                <Picker.Item label="Incomplete" value="Incomplete" />
                            </Picker>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.text}>Remarks : 
                        </Text>
                        <TextInput
                            style={styles.input}
                            value={remarks}
                            onChangeText={setRemarks}
                            placeholder="Enter Remarks"
                        />

                    </View>

                </View>
                <TouchableOpacity onPress={onSave} style={styles.btnSave}>
                    <Text style={{ fontSize: 22, color: 'white' }}>Submit</Text>
                </TouchableOpacity>

        </SafeAreaView>
                {/* <Footer nav={navigation} /> */}

        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        //alignContent: 'stretch',
        //alignItems:'center',
        justifyContent: 'flex-start'
    },
    dropdown: {
        // fontSize: 10,
        width: '60%',
        height: 40,
        marginLeft: 5,
        margin: 7,
        borderWidth: 1,
        borderRadius: 7,
        justifyContent: 'center'
    },
    text: {
        fontSize: 15,
        margin: 5,
    },
    input: {
        width: '60%',
        height: 40,
        marginLeft: 5,
        margin: 7,
        borderWidth: 1,
        padding: 5,
        borderRadius: 7
    },
    btnSave: {
        alignSelf:'center',
        margin: 20,
        width: '40%',
        //borderWidth: 1,
        padding: 10,
        borderRadius: 30,
        alignItems: 'center',
        backgroundColor: '#43BE72'
    },
});
