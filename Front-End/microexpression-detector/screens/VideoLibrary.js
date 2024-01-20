import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Text,
  ActivityIndicator,
} from "react-native";
import { Video } from "expo-av";

const VideoLibrary = ({ route }) => {
  const { videoList } = route.params;
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [numColumns, setNumColumns] = useState(2);
  const [isLoading, setLoading] = useState(false);

  const handleVideoPress = (video) => {
    setSelectedVideo(video);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  const handleButtonPress = async () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 5000); // 5000 milliseconds equals 5 seconds
  };

  const handleButtonClick = async () => {
    setLoading(true);

    const uploadedVideoResponse = await uploadVideo(selectedVideo.uri);
    if (uploadedVideoResponse && uploadedVideoResponse.audioFileUrl) {
      try {
        const transcribeResponse = await fetch(
          "http://127.0.0.1:5000/transcribe",
          {
            method: "POST",
            body: JSON.stringify({
              audioFileUrl: uploadedVideoResponse.audioFileUrl,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const transcribeData = await transcribeResponse.json(); // this is the transcription
        // Handle the transcribed text here
        const transcription = transcribeData.transcription;
        console.log(transcription);

      } catch (error) {
        console.error("Error transcribing audio:", error);
        if (error instanceof TypeError) {
          console.error("Network error: ", error.message);
        }
      }
      
    }

    setLoading(false);
  };

  const uploadVideo = async (videoUri) => {
    const formData = new FormData();
    formData.append("file", {
      uri: videoUri,
      type: "video/mp4", // Adjust the type based on your video format
      name: "upload.mp4",
    });

    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
        // Replace with your actual backend URL
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return await response.json(); // Assuming the backend sends a response with the audio file URL or ID
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        key={numColumns} // Add a key to force a fresh render when changing numColumns
        data={videoList}
        keyExtractor={(item) => item.uri}
        numColumns={numColumns}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleVideoPress(item)}>
            <Video
              source={{ uri: item.uri }}
              style={styles.thumbnailVideo}
              useNativeControls
              positionMillis={500}
            />
          </TouchableOpacity>
        )}
      />

      {selectedVideo && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={!!selectedVideo}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContainer}>
            <Video
              source={{ uri: selectedVideo.uri }}
              style={styles.fullScreenVideo}
              useNativeControls
            />
            {isLoading && (
                <View style={styles.spinnerContainer}>
                  <ActivityIndicator size="large" color="#0000ff" />
                </View>
              )}
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.customButton}
                onPress={handleButtonPress}
              >
                <Text style={styles.buttonText}>Run LieDetect</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleCloseModal}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  thumbnailVideo: {
    width: 180,
    height: 100,
    margin: 8, // Add margin for spacing
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end", // Align the close button to the bottom
  },
  fullScreenVideo: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: "black",
  },
  closeButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    borderRadius: 8,
    margin: 10,
  },
  customButton: {
    backgroundColor: "#3F51B5",
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    borderRadius: 8,
    margin: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  spinnerContainer: {
    position: 'absolute',   // Keep it absolute
    left: 0,                // Align to the left edge of the container
    right: 0,               // Align to the right edge of the container
    top: 0,                 // Align to the top edge of the container
    bottom: 0,              // Align to the bottom edge of the container
    alignItems: 'center',   // Center horizontally
    justifyContent: 'center', // Center vertically
    backgroundColor: 'rgba(0, 0, 0, 0.65)', // Semi-transparent background
  },
});

export default VideoLibrary;
