import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Login";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { FIREBASE_AUTH } from "./firebaseConfig";
import Main from "./screens/Main";
import GetStarted from "./screens/GetStarted";
import React from "react";
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

const Stack = createStackNavigator();

const InsideStack = createStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="Main" component={Main} options={{ headerShown: false }}/>
    </InsideStack.Navigator>
  );
}

export default function App() {
  let [fontsLoaded] = useFonts({
    'Recursive': require('/Users/arjunkulkarni/Desktop/lie-detector/NOBE-Tech-Project-Fall-2023/Front-End/microexpression-detector/assets/fonts/Recursive-SemiBold.ttf'),
  })

  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("user", user);
      setUser(user);
    });
  }, []); // Pass an empty dependency array to run the effect only once

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        {user ? (
          <Stack.Screen
            name="Main"
            component={InsideLayout}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="GetStarted"
              component={GetStarted}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
  }
