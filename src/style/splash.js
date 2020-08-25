import styled from 'styled-components';
import {Dimensions} from 'react-native'
const { width, height } = Dimensions.get("window");
const WrapperLogo = styled.Image`
    width : 150px;
    height : 150px;
`
const LogoText = styled.Text`
   font-size: ${width/8}
   color:#3C2946;
   font-family: Pacifico;
   text-align: center;
   padding:0;
   margin:0;
`

const Styles = {WrapperLogo,LogoText}
export default Styles