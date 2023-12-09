import React from "react"
import { Text } from "react-native"

function Home({navigation}) {
    return(
        <Text onPress={()=>{navigation.navigate('Auth')}}>Home Screen</Text>
    )
}
export default Home