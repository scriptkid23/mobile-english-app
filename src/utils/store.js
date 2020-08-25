export const StoreContext = React.createContext(null);
import React from 'react';
import homeReducer,{defaultState} from '../Reducers/homeReducer'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client'
import {FETCH_DATA} from '../graphql/queries'

export default ({ children }) => {
    const [homeState,homeDispatch] = React.useReducer(homeReducer,defaultState)
    const { data, error, loading } = useQuery(FETCH_DATA);
    const store = {
      data : data ? {payload : data.allObjectInformation.edges} : null,
      home : {state : homeState, dispatch : homeDispatch},
      splash : loading
    }

    return (
      <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
  };