import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Color } from "../constants/theme";
import { Alert } from 'react-native';
import axios from "axios";
import auth from '@react-native-firebase/auth'

function Home({navigation}) {
    const [data, setData] = useState({})
    useEffect(() => {
        axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s').then((response) => {
            setData(response.data);
        });
    }, []);
    useEffect(() => {
        console.log("Data has changed:", data);
    }, [data]);

    function signOut() {
        auth()
            .signOut()
            .then(() => {
                Alert.alert("Sign out","User Signed Out Successfuly")
                console.log('User signed out!') 
                navigation.navigate('Splash')
        });
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.nav}>
                <Image source={require('../assets/icons/hamburger.png')} style={styles.hamburger} />
                <Image source={require('../assets/icons/cartIcon.png')} style={styles.cartIcon} />
            </View>
            <Text style={styles.heading} onPress={() => { signOut() }}>Delicious{"\n"}Food For You</Text>
            <View style={styles.inputCover}>
                <Image style={styles.searchIcon} source={require('../assets/icons/searchIcon.png')} />
                <TextInput placeholder="Search" style={styles.input} />
            </View>
            <View style={{ width: "100%", marginTop: 25 }}>
                <ScrollView horizontal={true} style={{ width: "100%", marginLeft: 15 }}>
                    <Text style={[styles.scrollText, styles.activeText]}>Food</Text>
                    <Text style={styles.scrollText}>Drinks</Text>
                    <Text style={styles.scrollText}>Snacks</Text>
                    <Text style={styles.scrollText}>Sauces</Text>
                    <Text style={styles.scrollText}>BBQ</Text>
                    <Text style={styles.scrollText}>Party</Text>
                    <Text style={styles.scrollText}>Cake</Text>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingVertical: 35,
        paddingHorizontal: 25,
        flex: 1,
        backgroundColor: "f2f2f2"
    },
    heading: {
        fontSize: 38,
        fontWeight: "bold",
        color: Color.black
    },
    nav: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 30
    },
    hamburger: {
        width: 20,
        height: 20
    },
    cartIcon: {
        width: 30,
        height: 30
    },
    inputCover: {
        width: "100%",
        backgroundColor: "#efeeee",
        flexDirection: "row",
        display: "flex",
        alignItems: "center",
        borderRadius: 30,
        paddingHorizontal: 15,
        paddingVertical: 10,
        gap: 10,
        marginTop: 25
    },
    searchIcon: {
        width: 25,
        height: 25
    },
    input: {
        fontSize: 18
    },
    scrollText: {
        fontSize: 20,
        color: "#a6a6a6",
        marginRight: 10,
        paddingBottom: 7,
        paddingHorizontal: 15
    },
    activeText: {
        color: Color.primary,
        borderBottomWidth: 1,
        borderBottomColor: Color.primary
    }
})
export default Home;
