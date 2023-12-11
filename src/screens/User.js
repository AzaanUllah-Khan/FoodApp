import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

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
        <SafeAreaView>
            {
                userData && <Text>{userData.name}</Text>
            }
        </SafeAreaView>
    );
}

export default User;
