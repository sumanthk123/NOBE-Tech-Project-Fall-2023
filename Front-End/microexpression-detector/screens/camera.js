import { StatusBar } from 'expo-status-bar';
import { useState, useRef, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import {Video} from 'expo-av';

export default function camera() {
    const [type, setType] = useState(CameraType.back);
    const [hasCameraPermission, setHasCameraPermission] = Camera.useCameraPermissions();
    const [isRecording, setIsRecording] = useState(false);
    const [video, setVideo] = useState();
    const cameraRef = useRef(null);


    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
        })();
    }, [])
    
    if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
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
    }

    if(video){
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
    

    return (
        <View style={styles.container}>
        <Camera style={styles.camera} type={type} ref = {cameraRef}>
            <View style={styles.buttonContainer}>

                <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                    <Text style={styles.text}>Flip Camera</Text>
                </TouchableOpacity>

                <TouchableOpacity
                        style={[styles.button, isRecording ? styles.recordingButton : styles.notRecordingButton]}
                        onPress={isRecording ? stopVideo : recordVideo}
                    >
                        <Text style={styles.text}>{isRecording ? 'Stop Recording' : 'Record'}</Text>
                </TouchableOpacity>

            </View>
        </Camera>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
        justifyContent: 'space-between',
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
        justifyContent: 'space-between',
        marginBottom: 30, 
    },
    retakeButtonContainer: {
        alignItems: 'center',
        marginBottom: 30, // Adjust margin bottom as needed for the retake button
    },
    button: {
        alignItems: 'center',
        alignSelf: 'flex-end',
    },
    notRecordingButton: {
        backgroundColor: '#4CAF50',
    },
    recordingButton: {
        backgroundColor: '#FF0000',
    },
    text: {
        fontSize: 24,
        color: 'white',
    },
    video: {
        flex: 1,
        alignSelf: "stretch"
    },
    videoContainer: {
        flex: 1,
        alignSelf: 'stretch',
    },
});