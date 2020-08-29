import styled from 'styled-components';
import {Dimensions} from 'react-native'
const { width, height } = Dimensions.get("window");
export const p = styled.Text`
    font-family: NunitoBold;
    font-size: 15px;
`
export const title = styled.Text`
    font-family: NunitoBold;
    font-size: 25px;
`
export const Container = styled.View`
    flex : 1;
    background-color : ${props => props.backgroundColor}
`
export const WrapperLogo = styled.Image`
    width : 150px;
    height : 150px;
`
export const LogoText = styled.Text`
   font-size: ${width/8}
   color:#3C2946;
   font-family: Pacifico;
   text-align: center;
   padding:0;
   margin:0;
`