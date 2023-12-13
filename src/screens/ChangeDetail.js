import React,{useState} from "react";
import { Text, TextInput, View, TouchableOpacity, StyleSheet, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Color } from "../constants/theme";
import ImagePicker from "react-native-image-picker"
function ChangeDetail() {
    const [imageSource, setImageSource] = useState(null);

  const pickImage = () => {
    ImagePicker.showImagePicker({ title: 'Select Image' }, (response) => {
        if (!response.didCancel && !response.error) {
          setImageSource({ uri: response.uri });
        }
      });      
  };
    return (
        <SafeAreaView style={styles.container}>
            {imageSource && (
        <Image source={imageSource} style={{ width: 200, height: 200 }} />
      )}
            <Text style={styles.heading}>Information</Text>
            <View style={styles.detailContainer}>
                <Text style={styles.labels}>Profile Image</Text>
                <Button title="SD" onPress={()=>{pickImage()}}/>
                <Text style={styles.labels}>Name</Text>
                <TextInput style={styles.input} />
                <Text style={styles.labels}>Phone Number</Text>
                <TextInput style={styles.input} />
                <Text style={styles.labels}>Address</Text>
                <TextInput style={styles.input} />
            </View>
            <TouchableOpacity style={styles.button}>
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