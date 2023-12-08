import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Modal, Text } from 'react-native';
import { Video } from 'expo-av';

const VideoLibrary = ({ route }) => {
  const { videoList } = route.params;
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [numColumns, setNumColumns] = useState(2);
  const [transcript, setTranscript] = useState(null); // New state for transcript


  const handleVideoPress = (video) => {
    setSelectedVideo(video);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };
  
  const handleTranscribePress = async () => {
    console.log('button pressed')

    const formData = new FormData();
    formData.append('video', {
      uri: selectedVideo.uri,
      type: 'video/*',
      name: 'video.mov',
    });

    console.log('Video File Path:', selectedVideo.uri);

    // Send a request to your backend with the selected video URI
    console.log('Request Payload:', JSON.stringify({ videoUri: selectedVideo.uri }));
    const response = await fetch('http://10.195.103.203:5000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });
    console.log('Request Status:', response.status);
    const transcription = await response.text();
    console.log('Request Body:', await response.text());
    
    setTranscript(transcription);

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
            <Video source={{ uri: item.uri }} style={styles.thumbnailVideo} useNativeControls positionMillis={500}/>
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
            <Video source={{ uri: selectedVideo.uri }} style={styles.fullScreenVideo} useNativeControls />
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>

            {/* New button */}
            <TouchableOpacity style={styles.closeButton} onPress={handleTranscribePress}>
              <Text style={styles.closeButtonText}>Transcibe</Text>
            </TouchableOpacity>

            {/* Display the transcript */}
            {transcript && (
              <View style={styles.transcriptContainer}>
                <Text style={styles.transcriptText}>{transcript.error || transcript}</Text>
              </View>
            )}

          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  thumbnailVideo: {
    width: 180,
    height: 100,
    margin: 8, // Add margin for spacing
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end', // Align the close button to the bottom
  },
  fullScreenVideo: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'black',
  },
  closeButton: {
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'black',
  },
  transcriptContainer: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 20,
    position: 'absolute', // Adjust position to overlay on the video
    bottom: 0, // Align to the bottom
    left: 0,
    right: 0,
  },
  transcriptText: {
    color: 'black',
  },
});

export default VideoLibrary;
