import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity ,Button,ImageBackground,StyleSheet} from 'react-native';
import { Camera, } from 'expo-camera';
import {Block} from '../component/index'
import {StoreContext} from '../utils/store'
import {Camera as Capture,Back,Flash,Magic} from '../component/Button/index'
import styled from 'styled-components'
import FadeTop from '../component/Animated/FadeTop'
import {getFilename} from '../utils/extensions';
import axios from 'axios';
import FormData from 'form-data';

function ObjectDetectionRequested(param){
    let formData = new FormData();
    formData.append('file',{
      uri : param.replace('file://',''),
      name : getFilename(param),
      type : 'image/jpeg'
    })
    return axios({
      method : "POST",
      url : "/api/classifier/image",
      baseURL : "http://192.168.0.108:5000/",
      headers :{ 
        'accept': 'application/json',
        'content-type': 'multipart/form-data'
      },
      data : formData
    })
  
}

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
  const handleImage = async () => {
    camera.dispatch({type : "PROCESS_IMAGE_REQUESTED"})
      try {
        let {data} = await ObjectDetectionRequested(camera.state.uri)
        if(Object.keys(data).length === 0 || data.score <= 80){
          camera.dispatch({
            type : "PROCESS_IMAGE_SUCCEEDED",
            message : "Object cannot be recognized"
          })
          return;
        }
        camera.dispatch({
          type : "PROCESS_IMAGE_SUCCEEDED",
          data : data,
          message : "Process image succeeded",
        })
      } catch (error) {
        camera.dispatch({
          type : "PROCESS_IMAGE_FAILED",
          message : error,
        })
      }
  }


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
          <Block safe>
              <FadeTop duration={1000}>
                <Back
                  type={"BACK_TO_CAMERA"}
                  back={() => camera.dispatch({type:"BACK"})}
                />
              </FadeTop>
          </Block> 
          <WrapperFeature>
            <FadeTop duration={500}>
              <Magic
                action={() => handleImage()}
              />
            </FadeTop>
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