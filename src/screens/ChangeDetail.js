import React, { useState, useEffect } from "react";
import { Text, TextInput, View, TouchableOpacity, StyleSheet, Button, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Color } from "../constants/theme";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'
import ImagePicker from "react-native-image-picker"
import storage from '@react-native-firebase/storage';

function ChangeDetail() {
    const [imageSource, setImageSource] = useState(null);
    const [name, changeName] = useState(userData ? userData.name : '');
    const [phone, changePhone] = useState(userData ? userData.number : '');
    const [address, changeAddress] = useState(userData ? userData.address : '');


    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const userId = auth().currentUser.uid;
                const userDoc = await firestore().collection('Users').doc(userId).get();

                if (userDoc.exists) {
                    const userData = userDoc.data();
                    setUserData(userData);
                } else {
                    console.error("User not found");
                }
            } catch (error) {
                console.error("Error fetching current user: ", error);
            }
        };

        fetchCurrentUser();
    }, [auth().currentUser.uid]);

    const reference = storage().ref(auth().currentUser.email);

    const pickImage = () => {
        ImagePicker.showImagePicker({ title: 'Select Image' }, async (response) => {
            if (!response.didCancel && !response.error) {
                setImageSource({ uri: response.uri });
                const pathToFile = `${auth().currentUser.email}/${response.uri}`;
                await reference.putFile(pathToFile);
            }
        });
    };

    const uid = auth().currentUser.uid

    function Update() {
        firestore()
            .collection('Users')
            .doc(uid)
            .update({
                name: name,
                number: phone,
                address: address,
            })
            .then(() => {
                console.log('User updated!');
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });
    }
    return (
        <SafeAreaView style={styles.container}>
            {imageSource && (
                <Image source={imageSource} style={{ width: 200, height: 200 }} />
            )}
            <Text style={styles.heading}>Information</Text>
            {userData && <View style={styles.detailContainer}>
                <Text style={styles.labels}>Profile Image</Text>
                <Button title="SD" onPress={() => { pickImage() }} />
                <Text style={styles.labels}>Name</Text>
                <TextInput style={styles.input} value={userData.name} onChangeText={(text) => { changeName(text) }} />
                <Text style={styles.labels}>Phone Number</Text>
                <TextInput style={styles.input} value={userData.number} onChangeText={(text) => { changePhone(text) }} />
                <Text style={styles.labels}>Address</Text>
                <TextInput style={styles.input} value={userData.address} onChangeText={(text) => { changeAddress(text) }} />
            </View>}
            <TouchableOpacity style={styles.button} onPress={() => { Update() }}>
                <Text style={styles.buttonTxt}>Update</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 30
    },
    heading: {
        fontSize: 18,
        color: "#222",
        marginBottom: 15
    },
    detailContainer: {
        backgroundColor: Color.white,
        paddingHorizontal: 20,
        paddingBottom: 10,
        paddingTop: 15,
        borderRadius: 15
    },
    labels: {
        color: "#aaa",
        fontSize: 14,
        marginBottom: 10
    },
    input: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        fontSize: 16,
        padding: 0,
        marginBottom: 25
    },
    button: {
        backgroundColor: Color.primary,
        paddingVertical: 10,
        borderRadius: 15,
        marginTop: 40,
        display: "flex",
        alignItems: "center"
    },
    buttonTxt: {
        color: Color.white,
        fontSize: 16
    },
})
export default ChangeDetail