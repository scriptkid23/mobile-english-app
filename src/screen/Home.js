import React from 'react';
import {StyleSheet,ImageBackground,View,ScrollView} from 'react-native';
import Styles from '../style/home'
import {Block,Text,Card} from '../component/index'
import Image from '../constant/image'
import { Dimensions } from "react-native";


export default function HomeScreen(){
    return(
        <Block flex>
            <ImageBackground
            source={Image.png.background}
            style={styles.image}
            >
                <View style={styles.wrapperContentContainer}>
                    <View style={styles.wrapperContent}>                       
                    </View>
                </View>
                <View style={styles.wrapperListContainer}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        bouncesZoom={true}
                    >
                        <View style={styles.wrapperList}>

                        </View>
                        <View style={styles.wrapperList}>

                        </View>
                        <View style={styles.wrapperList}>

                        </View>
                    </ScrollView>
                   
                </View>
                

                
            </ImageBackground>
        </Block>
           
      
    
    )
}
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
    wrapperContentContainer: {
        flexDirection:'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    wrapperContent:{
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
        height: "30%",
        alignItems : "center",
        
    },
    wrapperList:{
        width: 150,
        height : 183,
        backgroundColor:"#163172",
        borderRadius: 12,
        marginRight : 10


    },
    image: {
      flex: 1,
      resizeMode: "cover",
    },

  });

