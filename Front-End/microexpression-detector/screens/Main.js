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

const CameraComponent = () => {
  const navigation = useNavigation();

  const [type, setType] = useState(CameraType.back);
  const [hasCameraPermission, setHasCameraPermission] =
    Camera.useCameraPermissions();
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState();
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
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
    setIsRecording(true);
    cameraRef.current.recordAsync().then((recordedVideo) => {
      setVideo(recordedVideo);
      setIsRecording(false);
    });
  };

  const stopVideo = async () => {
    setIsRecording(false);
    cameraRef.current.stopRecording();
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
              <Text style={styles.text}>
                {isRecording ? "Stop Recording" : "Record"}
              </Text>
            </TouchableOpacity>
          </View>
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
            onPress={() => navigation.navigate("Detect")}
          >
            <Icon name="search" size={24} color="#000" />
            <Text> Search</Text>
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
});

export default CameraComponent;
