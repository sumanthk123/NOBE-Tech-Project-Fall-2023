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
import CameraIcon from "../assets/Images/Screen_Shot_2023-10-24_at_5.24.37_PM-removebg-preview.png";
import { useNavigation } from "@react-navigation/native";
import VideoLibrary from "./VideoLibrary";
//import Voice from '@react-native-voice/voice';



const CameraComponent = () => {
  const navigation = useNavigation();

  const [type, setType] = useState(CameraType.back);
  const [hasCameraPermission, setHasCameraPermission] =
    Camera.useCameraPermissions();
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState();
  const cameraRef = useRef(null);
  const [videoList, setVideoList] = useState([]);
  //let [started, setStarted] = useState(false);
  //let [results, setResults] = useState([]);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
   // Voice.onSpeechError = onSpeechError;
    //Voice.onSpeechResults = onSpeechResults;

   /* return() => {
      Voice.destroy().then(Voice.removeAllListeners);
   }*/
  }, []);
  

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }
  
  /*const startSpeechToText = () => {
    Voice.start("en");
    setStarted(true);
  };

  const stopSpeechToText = () => {
    Voice.stop();
    setStarted(false);
  };

  const onSpeechResults = (result) => {
    setResults(result.value);
    console.log("Speech to text results:", result.value);
  };

  const onSpeechError = (error) => {
    console.log(error);
  };
 */


  const recordVideo = async () => {
    setIsRecording(true);
    //startSpeechToText();
    try {
      const recordedVideo = await cameraRef.current.recordAsync();
      console.log('Recorded video:', recordedVideo);
      addVideoToLibrary(recordedVideo);
    } catch (error) {
      console.error('Error recording video:', error);
    } finally {
      console.log('Stopping recording...');
      setIsRecording(false);
      // stopSpeechToText();
    }
  };

  const stopVideo = async () => {
    setIsRecording(false);
    cameraRef.current.stopRecording();
    //stopSpeechToText();
  };

  const addVideoToLibrary = (video) => {
    setVideoList((prevList) => [...prevList, video]);
    console.log("video is added to libray");
  };

 
  /*if(video){
    return(
        <View style={styles.container}>
            <View style={styles.videoContainer}>
                <Video source={{ uri: video.uri }} style={styles.video} useNativeControls resizeMode="contain" isLooping />
            </View>
            <View style={styles.retakeButtonContainer}>
                <Button title="Retake" onPress={() => setVideo(undefined)} />
            </View>

        </View>
    )
    }
*/
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
              onPress={isRecording ? stopVideo:recordVideo}
            >
              <Text style={styles.text}>
                {isRecording ? "Stop Recording" : "Record"}
              </Text>
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
            <Icon name="search" size={24} color="#000" />
            <Text> Video Library</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
    alignItems: 'center',
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
    position: 'absolute',
    left: 70, // Adjust the left position of the image
    top: 150, // Adjust the top position of the image
    width: 250, // Adjust the width of the image
    height: 250, // Adjust the height of the image

},
});

export default CameraComponent;