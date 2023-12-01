// Profile.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Info = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Rules to Lie Detect - How to Lie</Text>
      <Text style={styles.text}>
        Only rule is when you are asking a question use front camera and talk and when you want the answer and to see if they are lying, switch to back camera. You need to conduct this interview style.
      </Text>
      <Text style={styles.text}>
        Start to start the lie detector then switch between the front and back camera to check if the person is lying. Once the interview is done, click stop and we will tell you the chances they were lying.
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
