import React, { useState, useEffect } from "react"
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Color } from "../constants/theme"
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function Auth({ navigation }) {
    const [option, setOption] = useState('Login')
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    function createUser() {
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                const userUid = auth().currentUser.uid;
                firestore()
                    .collection('Users')
                    .doc(userUid)
                    .set({
                        name: name,
                        email: email,
                        address:address,
                        number:phone,
                        uid: userUid
                    })
                    .then(() => {
                        console.log('User added!');
                    });
                console.log('User account created & signed in!');
                navigation.navigate('HomeStack')
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            })
    }
    function loginUser() {
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User signed in!');
                navigation.navigate('HomeStack')
            })
            .catch(error => {
                console.error(error);
            });
    }
    return (
        <SafeAreaView style={styles.bg}>
            <ScrollView>
                <View style={styles.top}>
                    <Image style={styles.logo} source={require('../assets/images/logo.png')} />
                    <View style={styles.option}>
                        <Text style={option == 'Login' ? [styles.Login, styles.optionBorder] : [styles.Login]} onPress={() => { setOption('Login') }}>Login</Text>
                        <Text style={option == 'Login' ? [styles.SignUp] : [styles.SignUp, styles.optionBorder]} onPress={() => { setOption('Sign Up') }}>SignUp</Text>
                    </View>
                </View>
                <View style={styles.bottom}>
                    <ScrollView>
                        {option == 'Sign Up' ? <View>
                            <Text style={styles.txt}>Name</Text>
                            <TextInput style={styles.input} onChangeText={(text) => { setName(text) }} />
                            <Text style={styles.txt}>Phone Number</Text>
                            <TextInput style={styles.input} onChangeText={(text) => { setPhone(text) }} />
                            <Text style={styles.txt}>Address</Text>
                            <TextInput style={styles.input} onChangeText={(text) => { setAddress(text) }} />
                        </View> : ''}
                        <View>
                            <Text style={styles.txt}>Email Address</Text>
                            <TextInput style={styles.input} keyboardType="email-address" onChangeText={(text) => { setEmail(text) }} />
                        </View>
                        <View>
                            <Text style={styles.txt}>Password</Text>
                            <TextInput style={styles.input} secureTextEntry={true} onChangeText={(text) => { setPassword(text) }} />
                        </View>
                        {option == 'Login' ? <Text style={{ color: Color.primary, fontSize: 14 }}>Forget Password</Text> : ''}
                        <TouchableOpacity style={styles.button} onPress={() => { option == 'Login' ? loginUser() : createUser() }}>
                            <Text style={styles.buttonTxt}>{option}</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor: "#eee"
    },
    top: {
        height: 290,
        width: "100%",
        marginBottom: 30,
        backgroundColor: Color.white,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        shadowColor: "#333",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.09,
        shadowRadius: 5,
        elevation: 7,
    },
    logo: {
        width: 130,
        height: 130,
        alignSelf: "center",
        marginTop: 60
    },
    option: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    Login: {
        padding: 10,
        width: 120,
        textAlign: "center",
        fontSize: 20,
        color: "#222",
        fontWeight: "bold"
    },
    SignUp: {
        padding: 10,
        width: 120,
        textAlign: "center",
        fontSize: 20,
        color: "#222",
        fontWeight: "bold"
    },
    optionBorder: {
        borderBottomColor: Color.primary,
        borderBottomWidth: 2
    },
    bottom: {
        paddingHorizontal: 30,
        paddingBottom: 30
    },
    txt: {
        color: "#777",
        fontSize: 18,
        marginTop: 20
    },
    input: {
        borderBottomWidth: 1,
        borderColor: "#aaa",
        padding: 0,
        marginTop: 7,
        fontSize: 24,
        marginBottom: 10
    },
    button: {
        backgroundColor: Color.primary,
        paddingVertical: 15,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        marginTop: 50
    },
    buttonTxt: {
        color: Color.white,
        fontSize: 18
    }
})

export default Auth