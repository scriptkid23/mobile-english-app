import React, { useRef, useEffect } from 'react';
import { Animated, Text, View } from 'react-native';
const data = [1,2,3,4,5,6]
const FadeInView = (props) => {
 
  let fade = []
  for(let i = 0; i < props.len;i++){
    fade[i] = useRef(new Animated.Value(0)).current 
  }

  React.useEffect(() => {

      const animations = data.map((item) => {
        return Animated.timing(
          fade[item],
          {
            toValue:1,
            duration : 900,
            useNativeDriver: true
          }
        )
      })
      Animated.sequence(animations).start()
  }, [])

  return (
    data.map((value,index) => {
      return(
        <Animated.View  
        key={index}               // Special animatable View
          style={{
            opacity: fade[value], // Binds directly
            transform: [{
              translateY: fade[value].interpolate({
                inputRange: [0, 0.5 , 1],
                outputRange: [-150, - 100, 0]  // 0 : 150, 0.5 : 75, 1 : 0
              }),
            }],
          }}
          >
            {props.children}
          </Animated.View>
      )
    })
    
  );
}

// You can then use your `FadeInView` in place of a `View` in your components:
export default () => {
  return (
    <View style={{flexDirection:"row", alignItems: 'center', justifyContent: 'center',margin:19}}>
      <FadeInView len={30} duration={500}>
        <View style={{width: 250, height: 50, backgroundColor: 'powderblue'}}>
          <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>Fading in 2</Text>
          <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>Fading in 3</Text>
        </View>        
      </FadeInView>
    </View>
  )
}
