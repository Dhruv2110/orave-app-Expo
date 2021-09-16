import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen'
import Login from './screens/Login'
import ServiceOption from './screens/ServiceOption'
import ProductSelection from './screens/ProductSelection'
import ProblemSelection from './screens/ProblemSelection'
import SelectDateTime from './screens/SelectDateTime'
import AccountRegister from './screens/AccountRegister'
import ProductRegister from './screens/ProductRegister'
import RequestHistory from './screens/RequestHistory'
import ROrent from './screens/ROrent'
import ROrentHistory from './screens/ROrentHistory'

import EHome from './screens/EnggScreens/EHome'
import ELogin from './screens/EnggScreens/ELogin'
import EServices from './screens/EnggScreens/EServices'
import EServiceDetail from './screens/EnggScreens/EServiceDetail'
import ERORent from './screens/EnggScreens/ERORent'


import AMCplans from './screens/FooterScreens/AMCplans'
import Contact from './screens/FooterScreens/Contact'


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="ServiceOpt" component={ServiceOption} options={{ headerShown: false }} />
        <Stack.Screen name="ProductSel" component={ProductSelection} options={{ headerShown: false }} />
        <Stack.Screen name="ProblemSel" component={ProblemSelection} options={{ headerShown: false }} />
        <Stack.Screen name="SelectDT" component={SelectDateTime} options={{ headerShown: false }} />
        <Stack.Screen name="AccRegister" component={AccountRegister} options={{ headerShown: false }} />
        <Stack.Screen name="ProdRegister" component={ProductRegister} options={{ headerShown: false }} />
        <Stack.Screen name="History" component={RequestHistory} options={{ headerShown: false }} />
        <Stack.Screen name="AMCplans" component={AMCplans} options={{ headerShown: false }} />
        <Stack.Screen name="Contact" component={Contact} options={{ headerShown: false }} />
        <Stack.Screen name="ROrent" component={ROrent} options={{ headerShown: false }} />
        <Stack.Screen name="ROrentHistory" component={ROrentHistory} options={{ headerShown: false }} />

        <Stack.Screen name="EHome" component={EHome} options={{ headerShown: false }} />
        <Stack.Screen name="ELogin" component={ELogin} options={{ headerShown: false }} />
        <Stack.Screen name="EServices" component={EServices} options={{ headerShown: false }} />
        <Stack.Screen name="EServiceDetail" component={EServiceDetail} options={{ headerShown: false }} />
        <Stack.Screen name="ERORent" component={ERORent} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;