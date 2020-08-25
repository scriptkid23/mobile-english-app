import React from 'react';
import {StyleSheet,ImageBackground,View,ScrollView,TouchableOpacity,
    Animated
} from 'react-native';
import {Block,Text,Card} from '../component/index'
import Image from '../constant/image'
import { Dimensions} from "react-native";
import CameraButton from '../component/CameraButton'
import  StoreButton from '../component/StoreButton'
import ReportButton from '../component/ReportButton'
import Sound from '../component/Sound';
import FadeTop from '../component/Animated/FadeTop'
import {StoreContext} from '../utils/store'

export default function HomeScreen(){
    const {data,home} = React.useContext(StoreContext)
    console.log(data)
    return(
        <Block flex>
            <ImageBackground
            source={Image.png.background}
            style={styles.image}
            >
                <View style={styles.wrapperContentContainer}>
                    <View style={styles.wrapperContent}>    
                        <TouchableOpacity>
                            <FadeTop duration={1000}>
                                <Image.svg.chopsticks width={120} height={120}/>    
                            </FadeTop>
                            
                        </TouchableOpacity>
                        <FadeTop>
                         <Text style={styles.font}>Chopsticks</Text>
                        </FadeTop>
                       
                        <Sound text={"Chopsticks"}/>                   
                    </View>
                </View>
                <View style={styles.wrapperListContainer}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        directionalLockEnabled
                    >
                        {data.payload.map((value,index) => {
                            return(
                                <TouchableOpacity key={index}>         
                                    <View style={styles.wrapperList}>
                                        <Image.svg.chopsticks width={80} height={80}/>
                                        <Text style={styles.fontList}>{value.node.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                      
                        })}
                        
                       
                    </ScrollView>
                   
                </View>
                <View style={styles.wrapperFeature}>
   
                    <StoreButton/>
                    <CameraButton/>
                    <ReportButton/>
                </View>
                

                
            </ImageBackground>
        </Block>
           
      
    
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

