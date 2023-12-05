import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { Video } from "expo-av";
import Icon from "react-native-vector-icons/Ionicons";
import Icons from "react-native-vector-icons/FontAwesome";
import CameraIcon from "/Users/arjunkulkarni/Desktop/lie-detector/NOBE-Tech-Project-Fall-2023/Front-End/microexpression-detector/assets/Images/Screen_Shot_2023-10-24_at_5.24.37_PM-removebg-preview.png";
import { useNavigation } from "@react-navigation/native";
import { Audio } from "expo-av";
import Constants from 'expo-constants';

const CameraComponent = () => {
  const navigation = useNavigation();

  const [type, setType] = useState(CameraType.back);
  const [hasCameraPermission, setHasCameraPermission] =
    Camera.useCameraPermissions();
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState();
  const cameraRef = useRef(null);
  const [audioPermission, setAudioPermission] = useState(null);
  const [audioRecording, setAudioRecording] = useState(null);
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");

      const audioStatus = await Audio.requestPermissionsAsync();
      setAudioPermission(audioStatus.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const recordVideo = async () => {
    try {
      setIsRecording(true);
      console.log('Start recording...');
      
      const recordedVideo = await cameraRef.current.recordAsync();
      console.log('Recorded video:', recordedVideo);
      
      // Assuming addVideoToLibrary is a function to add the recorded video to a library
      addVideoToLibrary(recordedVideo);
    } catch (error) {
      console.error('Error recording video:', error);
    } finally {
      console.log('Stopping recording...');
      setIsRecording(false);
      // Any cleanup or post-recording actions can be added here
      // stopSpeechToText();
    }
  };  

  const stopVideo = async () => {
    setIsRecording(false);
    cameraRef.current.stopRecording();
  };

  const startAudioRecording = async () => {
    if (!audioPermission) {
      console.log("No permission to record audio");
      return;
    }

    try {
      if (audioRecording) {
        console.log("Stopping existing recording...");
        await audioRecording.stopAndUnloadAsync();
        setAudioRecording(null);
      }

      // Set the audio mode
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
      setAudioRecording(recording);
      console.log("Audio recording started");
    } catch (error) {
      console.error("Failed to start audio recording", error);
    }
  };

  const stopAudioRecording = async () => {
    if (!audioRecording) {
      console.log("No audio recording in progress");
      return;
    }

    try {
      await audioRecording.stopAndUnloadAsync();
      setAudioRecording(null);
      console.log("Audio recording stopped");
    } catch (error) {
      console.error("Failed to stop audio recording", error);
    }
  };

  const addVideoToLibrary = (video) => {
    try {
      setVideoList((prevList) => [...prevList, video]);
      console.log("Video added to library:", video);
      console.log("Updated Video List:", videoList);
    } catch (error) {
      console.error("Error adding video to library:", error);
    }
  };
  

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <View style={styles.centeredContent}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Image source={CameraIcon} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                isRecording
                  ? styles.recordingButton
                  : styles.notRecordingButton,
              ]}
              onPress={isRecording ? stopVideo : recordVideo}
            >
              <Text style={styles.text}>{isRecording ? "Stop" : "Start"}</Text>
            </TouchableOpacity>
          </View>
          <Image
                source={require('../assets/outline2.png')} 
                style={styles.overlayImage}
            />
        </View>
      </Camera>

      {/* Render the NavBar component */}
      <View style={styles.navBarContainer}>
        <View style={styles.navBar}>
          <TouchableOpacity
            style={styles.navIcon}
            onPress={() => navigation.navigate("Profile")}
          >
            <Icon name="person" size={24} color="#000" />
            <Text> Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navIcon}
            onPress={() => navigation.navigate("Info")}
          >
            <Icons name="info-circle" size={24} color="#000" />
            <Text> Info</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navIcon}
            onPress={() => navigation.navigate('VideoLibrary', {videoList})}
          >
            <Icon name="camera" size={24} color="#000" />
            <Text> Library</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    justifyContent: "space-between",
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 30,
    alignContent: "center",
  },
  centeredContent: {
    alignItems: "center",
    flexDirection: "row",
  },
  retakeButtonContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  button: {
    padding: 15,
    borderRadius: 20,
    width: 150,
    alignItems: "center",
    alignSelf: "flex-end",
    marginBottom: 0,
    alignContent: "center",
  },
  notRecordingButton: {
    backgroundColor: "#4CAF50",
  },
  recordingButton: {
    backgroundColor: "#FF0000",
  },
  text: {
    fontSize: 24,
    color: "white",
  },
  video: {
    flex: 1,
    alignSelf: "stretch",
  },
  videoContainer: {
    flex: 1,
    alignSelf: "stretch",
  },
  overlayImage: {
    position: "absolute",
    left: 70,
    top: 150,
    width: 250,
    height: 250,
  },
  icon: {
    marginTop: 600,
    width: 100,
    height: 30,
  },
  navBar: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    borderRadius: 20,
    marginBottom: 10,
    alignContent: "center",
  },
  navIcon: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  navBarContainer: {
    backgroundColor: "black",
    padding: 10,
    marginBottom: 30,
  },
  overlayImage: {
    position: "absolute",
    left: 70,
    top: 200,
    width: 250,
    height: 250,
  },

});

export default CameraComponent;
