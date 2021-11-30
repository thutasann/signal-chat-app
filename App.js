import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';


import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AddChat from './screens/AddChat';
import ChatScreen from './screens/Chat';



const Stack = createNativeStackNavigator();

const globalScreenOptions = {
  headerStyle: {backgroundColor: '#2C68ED'},
  headerTitleStyle: {color: 'white'},
  headerTintColor: "white",
};

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light"/>
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen 
          name="Login"
          component={LoginScreen} />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="AddChat"
          component={AddChat}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

//  "react-native-safe-area-context": "3.3.2",
// "react-native-screens": "~3.8.0",