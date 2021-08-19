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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;