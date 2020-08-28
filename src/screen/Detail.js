import React from 'react';
import {Block} from '../component/index'
import {Back,Camera} from '../component/Button'
import {Container} from '../style/index'
import styled from 'styled-components';
import {Dimensions,ScrollView} from 'react-native'
import Svg,{Image as ImageSvg,SvgWithCssUri} from 'react-native-svg';
import {SharedElement} from 'react-navigation-shared-element'
const { width, height } = Dimensions.get("window");
export default function DetailScreen(props){
    const {data} = props.route.params;
    // console.log(props.navigation)
    return(
        <Container backgroundColor={"#163172"}>
            <Block safe row noflex>
                <Block column>
                    <Back/>
                </Block>
            </Block>
                <Card>
                    <CardContainer>
                        <Block row noflex style={{marginBottom: 10}}>
                            <Block column style={{marginTop : 10}}>
                              
                                    <Text>{data.name}</Text>
                                    <Text>{data.nameVi}</Text>
                             
                            </Block>
                            <Block column style={{alignItems:"flex-end",marginTop:10}}>
                               
                                    <SvgWithCssUri
                                        width={80}
                                        height={80}
                                        uri={data.urlIcon}
                                    />
                                                  
                            </Block>
                        </Block>
                        <Block>
                            <TextContent>
                                {data.description}
                            </TextContent>      
                        </Block>
                        
                    </CardContainer>
                </Card>
   
            
        </Container>
    )
}
const Card = styled.View`
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-bottom : 10px;
    margin-top : 10px;
`
const CardContainer = styled.View`
    width: ${Math.round(width * 14 / 15)}px;
    height: ${Math.round(height - 100)}px;
    background-color : #fff;
    border-radius : 17px;
    padding : 15px;
`
const Text = styled.Text`
    fontFamily : NunitoBold;
    fontSize : 26px;
`
const TextContent = styled.Text`
    fontFamily : NunitoBold;
    fontSize : 15px;
`
