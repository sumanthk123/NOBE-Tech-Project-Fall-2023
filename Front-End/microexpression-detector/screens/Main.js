import { StatusBar } from "expo-status-bar";
import { useState, useRef, useEffect } from "react";
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
import Icon from "react-native-vector-icons/Ionicons"; // Import the icon library
import Icons from "react-native-vector-icons/FontAwesome";
import CameraIcon from "/Users/arjunkulkarni/Desktop/lie-detector/NOBE-Tech-Project-Fall-2023/Front-End/microexpression-detector/assets/Images/Screen_Shot_2023-10-24_at_5.24.37_PM-removebg-preview.png";

export default function camera() {
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

  if (video) {
    return (
      <View style={styles.container}>
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: video.uri }}
            style={styles.video}
            useNativeControls
            resizeMode="contain"
            isLooping
          />
        </View>
        <View style={styles.retakeButtonContainer}>
          <Button title="Retake" onPress={() => setVideo(undefined)} />
        </View>
      </View>
    );
  }

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

      <View style={styles.navBarContainer}>
        <View style={styles.navBar}>
          <TouchableOpacity style={styles.navIcon}>
            <Icon name="person" size={24} color="#000" />
            <Text> Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navIcon}>
            <Icons name="info-circle" size={24} color="#000" />
            <Text> Info</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navIcon}>
            <Icon name="search" size={24} color="#000" />
            <Text> Detect</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

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
    alignItems: "center", // Center the buttons vertically
    justifyContent: "space-around", // Spacing around the buttons
    marginBottom: 30,
    alignContent: "center",
    
  },
  centeredContent: {
    alignItems: 'center',
    flexDirection: "row",
  },
  retakeButtonContainer: {
    alignItems: "center",
    marginBottom: 30, // Adjust margin bottom as needed for the retake button
  },
  button: {
    padding: 15, // Add some padding for touchability
    borderRadius: 20, // Rounded corners
    width: 150, // Adjust the button width
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
    left: 70, // Adjust the left position of the image
    top: 150, // Adjust the top position of the image
    width: 250, // Adjust the width of the image
    height: 250, // Adjust the height of the image
  },
  icon: {
    marginTop: 600,
    width: 100, // Adjust the width of the icon as needed
    height: 30
  },
  navBar: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16, // Adjust the vertical padding
    paddingHorizontal: 20, // Adjust the horizontal padding
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    borderRadius: 20, // Add border radius to make it round
    marginBottom: 10, // Adjust the margin bottom to move it up
    alignContent: "center",
  },
  navIcon: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  navBarContainer: {
    backgroundColor: "black", // Container background color
    padding: 10, // Add any padding or styling you desire
    marginBottom: 30,
  },
});
