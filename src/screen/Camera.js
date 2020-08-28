import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity ,Button,ImageBackground,StyleSheet} from 'react-native';
import { Camera, } from 'expo-camera';
import {Block} from '../component/index'
import {StoreContext} from '../utils/store'
import {Camera as Capture,Back,Flash} from '../component/Button/index'
import styled from 'styled-components'
import FadeBottom from '../component/Animated/FadeTop'
export default function CameraExample() {
  const [hasPermission, setHasPermission] = useState(null);

  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flashMode,setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [autoFocus,setAutoFocus] = useState(Camera.Constants.AutoFocus.on);

  const {camera} = React.useContext(StoreContext);

  const ref = React.useRef(null);
  // Permission Camera before using 
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  

  const snap = async () => {
      let { uri, width, height, exif, base64 } = await ref.current.takePictureAsync()
      camera.dispatch({
        type:"SET_VALUE_PICTURE",
        photo : { uri, width, height, exif, base64 }
      })}
  
  const CameraScreen = () => {
    return(
      <Camera
          style={{flex : 1}}
          type = {type}
          flashMode = {flashMode}
          autoFocus = {autoFocus}
          ref = {ref}
        >
          <WrapperFeature>
              <Back/>
              <Capture
                snap = {() => snap()}
              />
              <Flash 
                turnOff = {() => setFlashMode(Camera.Constants.FlashMode.off)}
                turnOn = {() => setFlashMode(Camera.Constants.FlashMode.on)}
              />
          </WrapperFeature>    
      </Camera>
    )}
  const ImagePreviewScreen = () => {
    return(
      <ImageBackground source={{uri:camera.state.uri}} style={styles.image}>
          <WrapperFeature>
            <FadeBottom>
              <Back
              type={"BACK_TO_CAMERA"}
              back={() => camera.dispatch({type:"BACK"})}
              />
            </FadeBottom>
          </WrapperFeature>
      </ImageBackground>
    )
  }
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <Block flex>
        {/* <Camera
          style={{flex : 1}}
          type = {type}
          flashMode = {flashMode}
          autoFocus = {autoFocus}
          ref = {ref}
        >
          <WrapperFeature>
              <Back/>
              <Capture
                snap = {() => snap()}
              />
              <Flash 
                turnOff = {() => setFlashMode(Camera.Constants.FlashMode.off)}
                turnOn = {() => setFlashMode(Camera.Constants.FlashMode.on)}
              />
          </WrapperFeature>
         
        </Camera> */}
        {camera.state.uri.length > 0 ? ImagePreviewScreen() :  CameraScreen()} 
    </Block>
  );
}

const WrapperFeature = styled.View`
  flex : 1;
  flex-direction : row;
  justify-content : center;
  align-items : flex-end;
  padding : 10px;
`
const styles = StyleSheet.create({
  image :{
    flex : 1,
    resizeMode : "cover",
    justifyContent : "center",
  }
})