import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ServiceOption from './screens/ServiceOption'
import ProductSelection from './screens/ProductSelection'
import ProblemSelection from './screens/ProblemSelection'
import SelectDateTime from './screens/SelectDateTime'
import AccountRegister from './screens/AccountRegister'


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Home" component={ServiceOption} options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="Home" component={ProductSelection} options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="Home" component={ProblemSelection} options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="Home" component={SelectDateTime} options={{ headerShown: false }} /> */}
        <Stack.Screen name="Home" component={AccountRegister} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;