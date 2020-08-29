import React, { useState, useEffect } from 'react';
import {Text, View, ImageBackground, StyleSheet,Alert} from 'react-native';
import { Camera } from 'expo-camera';
import LottieView from 'lottie-react-native';
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

export default function ({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);

  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flashMode,setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [autoFocus,setAutoFocus] = useState(Camera.Constants.AutoFocus.on);

  const {camera} = React.useContext(StoreContext);
  let payload = React.useContext(StoreContext);
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
          Alert.alert('Word hunter',"Object cannot be recognized")
        }
        else{
          let obj = payload.data.payload.find(e => e.node.id_ === data.id)
          camera.dispatch({
            type : "PROCESS_IMAGE_SUCCEEDED",
            data : obj,
            message : "Process image succeeded",
          })
          navigation.navigate('Detail',{data:obj.node})
        }
      
       
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
            {camera.state.loading ? <View style={styles.wrapperButton}>
              <LottieView
                autoPlay 
                style={{
                  width:150,
                }}
                source={require('../../assets/animation/847-loading-circle.json')}
              />
            </View>:<FadeTop duration={500}>
              <Magic
                action={() => handleImage()}
              />
            </FadeTop>}
           
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
  },
  wrapperButton : {
    backgroundColor : "#0033FF",
    alignItems : "center",
    justifyContent : "center",
    width : 60,
    height : 60,
    padding : 15,
    borderRadius : 50,
    shadowColor: "#000",
     shadowOffset: {
         width: 0,
         height: 2,
     },
     marginLeft : 20,
     marginRight : 20,
     shadowOpacity: 0.4,
     shadowRadius: 2.62,

     elevation: 6,
}
})