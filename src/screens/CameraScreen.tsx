import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert, Text } from 'react-native';
import { Camera } from 'expo-camera';

import TakePictureButton from '../../assets/images/CameraScreen/TakePictureButton.svg';
import FlashlightButton from '../../assets/images/CameraScreen/FlashLightButton.svg';

const CameraScreen = () => {
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef<Camera | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);

  useEffect(() => {
    const requestCameraPermission = async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    };

    requestCameraPermission();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      console.log(data.uri);
    }
  };

  const toggleFlash = () => {
    setFlashMode(
      flashMode === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.torch
        : Camera.Constants.FlashMode.off
    );
  };

  if (!hasCameraPermission) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'white', textAlign: 'center' }}>No access to camera</Text>
      </View>
    );
  }  

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.preview}
        type={Camera.Constants.Type.back}
        flashMode={flashMode}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={toggleFlash} style={styles.flashButton}>
            <FlashlightButton width={48} height={48} />
          </TouchableOpacity>
          <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
            <TakePictureButton width={72} height={72} />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  captureButton: {
    paddingHorizontal: 24,
  },
  flashButton: {
    position: 'absolute',
    right:160,
    bottom: 15,
  },
});

export default CameraScreen;
