import React from "react"
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native"
import { Color } from "../constants/theme"
import { SafeAreaView } from "react-native-safe-area-context"

function Splash({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../assets/images/logo.png')} style={styles.logo} />
            <Text style={styles.heading}>Food for Everyone</Text>
            <Image source={require('../assets/images/heroImage.png')} style={styles.heroImg} />
            <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('Auth')}}>
                <Text style={styles.btnText}>Get Started</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    logo: {
        width: 60,
        height: 60,
        backgroundColor: "white",
        borderRadius: 50,
        marginHorizontal: 20,
        marginVertical: 13,
    },
    heading: {
        color: Color.white,
        fontSize: 60,
        fontWeight: "bold",
        paddingHorizontal: 20
    },
    container: {
        backgroundColor: Color.primary,
        flex: 1
    },
    heroImg: {
        width: 400,
        height: 600,
        marginTop: 20
    },
    button: {
        backgroundColor: Color.white,
        color: Color.primary,
        padding: 16,
        borderRadius: 25,
        position: "absolute",
        bottom: 40,
        alignSelf: "center",
        width: 300,
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    btnText: {
        color: Color.primary,
        fontSize: 20,
        fontWeight:"bold"
    }
})
export default Splash