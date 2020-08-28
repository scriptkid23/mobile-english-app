import React from 'react';
import {StyleSheet,ImageBackground,View,ScrollView,TouchableOpacity,
    Animated
} from 'react-native';
import {Block,Text,Card} from '../component/index'
import Image from '../constant/image'
import { Dimensions} from "react-native";

import Sound from '../component/Sound';
import FadeTop from '../component/Animated/FadeTop'
import { createSharedElementStackNavigator,SharedElement} from 'react-navigation-shared-element';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createSharedElementStackNavigator();

function HomeScreen({navigation}){
    const item = {
      img : "123",
      name : "chopsticks"
    }
    return(
        <Block flex>
            <ImageBackground
            source={Image.png.background}
            style={styles.image}
            >
              
                <View style={styles.wrapperContentContainer}>
                    <View style={styles.wrapperContent}>   
                        
                          <TouchableOpacity
                            onPress={() => navigation.navigate('DetailScreen',{data:item})}
                          >
                              <FadeTop duration={1000}>
                              <SharedElement id={`item.${item.id}.img`}>
                                  <Image.svg.chopsticks width={120} height={120}/>   
                              </SharedElement>      
                              </FadeTop>
                          </TouchableOpacity>
                                    
                        <FadeTop>
                          <SharedElement id={`item.${item.id}.name `}>
                            <Text style={styles.font}>Chopsticks</Text>
                          </SharedElement>
                         
                        </FadeTop>
                       
                        <Sound text={"Chopsticks"}/>                   
                    </View>
                </View> 
             
            </ImageBackground>
        </Block>
    )
}
function DetailScreen(props){
  const {data} = props.route.params;
  console.log(data)
  console.log(props.navigation)
  return(
    <Block flex style={{backgroundColor: "#163172"}}>
        <Text>{data.img}</Text>
    </Block>
  )
}
export default ({navigation}) => {
  return(
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerShown:false,
        }}
      >
          <Stack.Screen
              name="HomeScreen" component={HomeScreen}
          />
          <Stack.Screen
              name="DetailScreen" 
              options={navigation => ({
                headerBackTitleVisible : false,
                cardStyleInterpolator : ({current : {progress}}) => {
                  return{
                    cardStyle:{
                      opacity : progress 
                    }
                  }
                }
              })}
              sharedElementsConfig = {(route) => {
                const {data} = route.params 
                console.log(data)
                return[
                {
                  animation :'move',
                  resize : 'clip'
                }
                ]
                
              }}
              component={DetailScreen}
          />
      </Stack.Navigator>
    </NavigationContainer>
    // <DetailScreen/>
  )
}
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
    font : {
        fontFamily : "NunitoBold",
        fontSize : 42,
        color : "#fff"
    },
    fontList : {
        fontFamily : "NunitoBold",
        fontSize : 18,
        color : "#fff",
        marginTop : 10,
    },

    wrapperContentContainer: {
        flexDirection:'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    wrapperContent:{
        flexDirection:'column',
        padding : 20,
        alignItems: 'center',
        justifyContent : "center",
        width: width * 14 / 15,
        height: height / 2,
        backgroundColor:"#163172",
        borderBottomLeftRadius : 17,
        borderBottomRightRadius : 17,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.4,
        shadowRadius: 2.62,

        elevation: 6,
    },
    wrapperListContainer:{
        flexDirection: "row",
        width: "100%",
        height: "auto",
        alignItems : "center",
        marginTop : 10
        
    },
    wrapperList:{
        flexDirection:'column',
        padding : 20,
        alignItems: 'center',
        justifyContent : "center",
        width: 150,
        height : 183,
        backgroundColor:"#163172",
        borderRadius: 12,
        marginRight : 10
    },
    wrapperFeature : {
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        width : "100%",
        height :"auto",
        marginTop : 15
    },  
    image: {
      flex: 1,
      resizeMode: "cover",
    },

  });

