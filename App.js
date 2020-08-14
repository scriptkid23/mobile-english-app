import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Block} from './src/component/index'
import Splash from './src/screen/Splash'
import Home from './src/screen/Home'
import {useFonts} from 'expo-font'
export default function App() {
  const [loaded,error] = useFonts({
    NunitoBold : require('./assets/font/Nunito/Nunito-Bold.ttf'),
    NunitoRegular : require('./assets/font/Nunito/Nunito-Regular.ttf'),
    Pacifico : require('./assets/font/Pacifico/Pacifico-Regular.ttf')
  })
  if(!loaded){
    return null;
  }
  else{
    return (
      <Block>
        <Home/>
      </Block>
    );
  }
}
