import API from '../utils/api'
import AsyncStorage from '@react-native-async-storage/async-storage';


export const signup = async (credentials) => {
    // console.log("in api", credentials)

    return await API({
        method: 'POST',
        url: '/signup',
        data: credentials,
        headers: {
            'Content-Type': 'application/json'
        }
    })

}

export const login = async (credentials) => {
    // console.log("in api", credentials)

    return await API({
        method: 'POST',
        url: '/login',
        data: credentials,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const enggLogin = async (credentials) => {
    // console.log("in api", credentials)

    return await API({
        method: 'POST',
        url: '/enggLogin',
        data: credentials,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
