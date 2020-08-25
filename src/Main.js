import React from 'react';
import {Block} from './component/index'
import Splash from './screen/Splash'
import Home from './screen/Home'
import {Text} from 'react-native'
// import Lab from './src/screen/Lab'
import {StoreContext} from './utils/store'
export default function Main() {
    const {splash} = React.useContext(StoreContext)

    return(
        <Block>
            {/* {home.state.is_loading ? <Splash/>:<Home/>} */}
            {splash ? <Splash/>: <Home/>}
        </Block>
    )
}