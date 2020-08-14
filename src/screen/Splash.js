import React from 'react';
import {StyleSheet} from 'react-native';
import Styles from '../style/splash'
import {Block} from '../component/index'
import Image from '../constant/image'
export default function SplashScreen(){
    return(
    <Block center safe>
      <Block middle>
        <Image.svg.Logo width={330} height={230}/>
        <Styles.LogoText>Alook</Styles.LogoText>
      </Block>  
    </Block>
    )
}