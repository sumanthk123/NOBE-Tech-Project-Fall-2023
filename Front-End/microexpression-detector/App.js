import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import camera from './screens/camera.js';

export default function App() {
  return (
    camera()
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
