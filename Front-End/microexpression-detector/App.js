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

const Stack = createStackNavigator();

const InsideStack = createStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="Main" component={Main} />
    </InsideStack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("user", user);
      setUser(user);
    });
  }, []); // Pass an empty dependency array to run the effect only once

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {user ? (
          <Stack.Screen
            name="Main"
            component={InsideLayout}
            options={{ headerShown: true }}
          />
        ) : (
          <>
            <Stack.Screen
              name="GetStarted"
              component={GetStarted}
              options={{ headerShown: true }}
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
