import React from 'react';
import { createSharedElementStackNavigator,SharedElement} from 'react-navigation-shared-element';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screen/Home'
import Detail from './screen/Detail'
import Camera from './screen/Camera'

const Stack = createSharedElementStackNavigator();

export default () => {
    return(
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={"Camera"}
                screenOptions={{
                    headerShown : false,
                }}
            >
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen 
                    name="Detail" 
                    component={Detail}
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
                  
                />
                <Stack.Screen name="Camera" component={Camera}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}