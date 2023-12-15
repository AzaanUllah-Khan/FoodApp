import React from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
function History({navigation}) {
    return (
        <SafeAreaView>
            <View>
                <View>
                    <Image source={require('../assets/images/offline.png')} />
                    <Text>No History Yet</Text>
                    <Text>Hit the orange button down {'\n'} below to create an order</Text>
                </View>
                <TouchableOpacity onPress={()=>{navigation.navigate('All')}}>
                    <Text>Start Ordering</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
export default History