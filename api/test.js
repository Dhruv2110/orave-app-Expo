import API from '../utils/api'
import AsyncStorage from '@react-native-async-storage/async-storage';


export const test = async (credentials) => {
    console.log("in api", credentials)

    return await API({
        method: 'POST',
        url: '/',
        data: credentials,
        headers: {
            'Content-Type': 'application/json'
        }
    })

}