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

export const getAllServicesEngg = async (credentials) => {
    // console.log("in api", credentials)

    return await API({
        method: 'POST',
        url: '/getAllServicesEngg',
        data: credentials,
        headers: {
            'Content-Type': 'application/json'
        }
    })

}

export const getServiceDetail = async (credentials) => {
    // console.log("in api", credentials)

    return await API({
        method: 'POST',
        url: '/getServiceDetail',
        data: credentials,
        headers: {
            'Content-Type': 'application/json'
        }
    })

}

export const updateServiceDetail = async (credentials) => {
    // console.log("in api", credentials)

    return await API({
        method: 'POST',
        url: '/updateServiceDetail',
        data: credentials,
        headers: {
            'Content-Type': 'application/json'
        }
    })

}

export const addRoRent = async (credentials) => {
    // console.log("in api", credentials)

    return await API({
        method: 'POST',
        url: '/addRoRent',
        data: credentials,
        headers: {
            'Content-Type': 'application/json'
        }
    })

}

export const getAllRoRent = async (credentials) => {
    // console.log("in api", credentials)

    return await API({
        method: 'POST',
        url: '/getAllRoRent',
        data: credentials,
        headers: {
            'Content-Type': 'application/json'
        }
    })

}
