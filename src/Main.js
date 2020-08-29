import React from 'react';
import {Block} from './component/index'
import Splash from './screen/Splash'
import Navigation from './Navigation'

// import Lab from './src/screen/Lab'
import {StoreContext} from './utils/store'
export default function Main() {
    const {splash} = React.useContext(StoreContext)

    return(
        <Block>
         
            {splash ? <Splash/>: <Navigation/>}
            {/* <LabNavigation/> */}
        </Block>
    )
}