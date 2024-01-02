// Profile.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, TouchableOpacity } from "@react-navigation/native";

const Info = () => {
  const navigation = useNavigation();
  

  return (
    <View style={{ width: '100%', height: '100%', position: 'relative' }}>
      <View style={{ width: 427, height: 844, left: 0, top: 0, position: 'absolute', backgroundColor: '#88C6FF' }} />
      <View style={{ width: 360, height: 725, left: 16, top: 93, position: 'absolute', backgroundColor: '#D9D9D9', borderRadius: 80 }} />
            
      <Text style={{ width: 63, height: 36, left: 167, top: 47, position: 'absolute', color: 'white', fontSize: 30, fontFamily: 'Recursive', fontWeight: '500', overflow: 'hidden' }}>Info</Text>
      <Text style={{ width: 303, height: 56, left: 55, top: 128, position: 'absolute', color: 'black', fontSize: 30, fontFamily: 'Recursive', fontWeight: '1000' }}>Rules to Lie:Detect</Text>
      
    <Text style={{ width: 306, height: 600, left: 46, top: 187, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 20, fontFamily: 'Recursive', fontWeight: '800', lineHeight: 24 }}>Only ask questions using the front camera.
        {"\n\n"}When seeking answers and checking for lies, switch to the back camera during the interview.
        {"\n\n"}Conduct the interview in an interrogation-like style.
        {"\n\n"}Initiate the lie detector at the start of the questioning.
        {"\n\n"}Alternate between the front and back camera to detect potential lies.
        {"\n\n"}Once the interview concludes click 'stop' to end the process.
        {"\n\n"}We'll then provide you with the likelihood of deception
        {"\n\n"}  based on the findings.
      </Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Info;
