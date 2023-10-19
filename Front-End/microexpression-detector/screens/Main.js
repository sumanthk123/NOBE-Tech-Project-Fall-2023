import React from "react";
import { View, Text, Button } from "react-native";


function Main({ navigation }) {
  return (
    <View>
      <Text>Main Page</Text>
      {/* Other content for the "Main" page goes here... */}
      <Button
        title="Back to Get Started"
        onPress={() => {
          navigation.navigate("GetStarted"); // Navigate to the "GetStarted" screen
        }}
      />
    </View>
  );
}

export default Main;
