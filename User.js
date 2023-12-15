import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Color } from "../constants/theme";

function User({ navigation }) {
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
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.heading}>My Profile</Text>
                <View style={styles.section}>
                    <Text style={styles.one}>Personal Details</Text>
                    <Text style={styles.two} onPress={()=>{navigation.navigate('Update Details')}}>change</Text>
                </View>
                {
                    userData &&
                    <View style={styles.profileContainer}>
                        <Image source={require('../assets/images/profile.png')} />
                        <View>
                            <Text style={styles.profName}>{userData.name}</Text>
                            <Text style={styles.profEmail}>{userData.email}</Text>
                            <Text style={styles.profAdd}>{userData.number}</Text>
                        </View>
                    </View>
                }
            </View>
            <View style={styles.tiles}>
                <Text style={styles.tilesTxt}>Orders</Text>
                <Image source={require('../assets/icons/leftArrow.png')} style={styles.tilesIcon} />
            </View>
            <View style={styles.tiles}>
                <Text style={styles.tilesTxt}>Pending reviews</Text>
                <Image source={require('../assets/icons/leftArrow.png')} style={styles.tilesIcon} />
            </View>
            <View style={styles.tiles}>
                <Text style={styles.tilesTxt}>FAQ</Text>
                <Image source={require('../assets/icons/leftArrow.png')} style={styles.tilesIcon} />
            </View>
            <View style={styles.tiles}>
                <Text style={styles.tilesTxt}>Help</Text>
                <Image source={require('../assets/icons/leftArrow.png')} style={styles.tilesIcon} />
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonTxt}>Back To Home</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        padding: 25
    },
    profileContainer: {
        backgroundColor: Color.white,
        marginBottom: 30,
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 15,
        padding: 15,
        borderRadius: 20
    },
    tiles: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 25,
        paddingVertical: 18,
        borderRadius: 15,
        backgroundColor: Color.white,
        marginBottom: 15
    },
    tilesTxt: {
        color: Color.black,
        fontSize: 17,
        fontWeight: "bold"
    },
    tilesIcon: {
        transform: [{ scaleX: -1 }]
    },
    button: {
        backgroundColor: Color.primary,
        paddingVertical: 16,
        borderRadius: 15,
        marginTop: 40,
        display: "flex",
        alignItems: "center"
    },
    buttonTxt: {
        color: Color.white,
        fontSize: 18
    },
    profName: {
        fontSize: 20,
        fontWeight: "bold",
        color: Color.black,
        marginBottom: 10
    },
    profEmail: {
        fontSize: 16,
        paddingBottom: 7,
        marginBottom: 7,
        borderBottomWidth: 1,
        borderBottomColor: "#aaa"
    },
    profAdd: {
        fontSize: 16
    },
    section: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
        paddingHorizontal: 2
    },
    one: {
        color: "#444",
        fontSize: 16
    },
    two: {
        color: Color.primary,
        fontSize: 16
    },
    heading: {
        color: Color.black,
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 30
    }
})
export default User;
