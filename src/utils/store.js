export const StoreContext = React.createContext(null);
import React from 'react';
import homeReducer,{defaultState as homeDefault} from '../Reducers/homeReducer'
import cameraReducer, {defaultState as cameraDefault} from '../Reducers/cameraReducer';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client'
import {FETCH_DATA} from '../graphql/queries'
import Data from '../constant/data'
export default ({ children }) => {
    const [homeState,homeDispatch] = React.useReducer(homeReducer,homeDefault)
    const [cameraState,cameraDispatch] = React.useReducer(cameraReducer,cameraDefault)
    const { data, error, loading } = useQuery(FETCH_DATA);
    const store = {
      data : data ? {payload : data.allObjectInformation.edges} : {payload:Data.data.allObjectInformation.edges},
      home : {state : homeState, dispatch : homeDispatch},
      camera : {state:cameraState, dispatch : cameraDispatch},
      // splash : loading
      splash : false,

    }

    return (
      <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
  };