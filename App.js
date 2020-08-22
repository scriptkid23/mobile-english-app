import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AsyncStorage } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import {Block} from './src/component/index'
import Splash from './src/screen/Splash'
import Home from './src/screen/Home'
// import Lab from './src/screen/Lab'
import {useFonts} from 'expo-font'
import StoreProvider from './src/utils/store'
import makeApolloClient from './src/graphql/apollo'
import { ApolloProvider } from '@apollo/react-hooks';

export default function App() {
  const [client,setClient] = React.useState(null);
  const fetchSession = async () => {
    // fetch session
    console.log("loading")
    const client = makeApolloClient();
    setClient(client);
  }
  React.useEffect(() => {
    fetchSession();
  }, [])

  const [loaded,error] = useFonts({
    NunitoBold : require('./assets/font/Nunito/Nunito-Bold.ttf'),
    NunitoRegular : require('./assets/font/Nunito/Nunito-Regular.ttf'),
    Pacifico : require('./assets/font/Pacifico/Pacifico-Regular.ttf')
  })
  
  if(!loaded){
    return null;
  }
  if (!client) {
    return <Text>Error</Text>
  }
  else{
    return (
   
        <ApolloProvider client={client}>
           <StoreProvider>
              <Block>
                <Home/>
              </Block>
           </StoreProvider>   
        </ApolloProvider>       
    );
  }
}
