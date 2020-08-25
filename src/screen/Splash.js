import React from 'react';
import Styles from '../style/splash'
import {Block} from '../component/index'
import Image from '../constant/image'
import {Dimensions} from 'react-native'
const { width, height } = Dimensions.get("window");
import {StoreContext} from '../utils/store'

export default function SplashScreen(){
    return(
    <Block center safe>
      <Block middle>
        <Image.svg.logo width={width + 10} height={height * 2 / 5}/>
        <Styles.LogoText>Work Hunter</Styles.LogoText>
      </Block>  
    </Block>
    )
}