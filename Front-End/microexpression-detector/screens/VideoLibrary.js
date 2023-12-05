import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Modal, Text } from 'react-native';
import { Video } from 'expo-av';
import { useEffect } from 'react';

const VideoLibrary = ({ route }) => {
  const { videoList } = route.params;
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [numColumns, setNumColumns] = useState(2);

  const handleVideoPress = (video) => {
    setSelectedVideo(video);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
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
            <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.customButton}>
                <Text style={styles.buttonText}>Custom Button</Text>
              </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
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
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 8,
    margin: 10,
  },
  customButton: {
    backgroundColor: '#3F51B5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 8,
    margin: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },

});

export default VideoLibrary;