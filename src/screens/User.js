import React from "react";
import { SafeAreaView,Text } from "react-native";

function User({navigation}){
return(
    <SafeAreaView>
        <Text onPress={()=>{navigation.navigate('Home')}}>Profile</Text>
    </SafeAreaView>
)
}
export default User