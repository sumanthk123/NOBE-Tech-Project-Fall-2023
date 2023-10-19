// GetStarted.js
import React from "react";
import { View, Text, Button } from "react-native";

function GetStarted({ navigation }) {
  return (
    <View>
      <Text>Welcome to our app! Click the button below to get started.</Text>
      <Button
        title="Get Started"
        onPress={() => {
          navigation.navigate("Login"); // Navigate to the Login page
        }}
      />
    </View>
  );
}

export default GetStarted;
