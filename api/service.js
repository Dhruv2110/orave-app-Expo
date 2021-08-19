import API from '../utils/api'
import AsyncStorage from '@react-native-async-storage/async-storage';


export const addService = async (credentials) => {
    // console.log("in api", credentials)

    return await API({
        method: 'POST',
        url: '/addService',
        data: credentials,
        headers: {
            'Content-Type': 'application/json'
        }
    })

}

export const addProduct = async (credentials) => {
    // console.log("in api", credentials)

    return await API({
        method: 'POST',
        url: '/addProduct',
        data: credentials,
        headers: {
            'Content-Type': 'application/json'
        }
    })

}

export const getAllServices = async (credentials) => {
    // console.log("in api", credentials)

    return await API({
        method: 'POST',
        url: '/getAllServices',
        data: credentials,
        headers: {
            'Content-Type': 'application/json'
        }
    })

}