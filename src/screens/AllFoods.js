import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View, ScrollView, Button, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Color } from "../constants/theme";
import axios from "axios";

function AllFoods(){
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s').then((response) => {
            setData(response.data.meals);
        });
    }, []);
    useEffect(() => {
        console.log("Data has changed:", data.meals);
    }, [data]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ width: "100%",alignItems:"center"}}>
                <ScrollView style={{display:"flex"}} showsVerticalScrollIndicator={false}>
                    {
                        data.map((meal) => (
                            <View style={styles.strCover} key={meal.idMeal}>
                                <Image style={styles.strImg} source={{ uri: meal.strMealThumb }} />
                                <Text style={styles.strTxt}>{meal.strMeal}</Text>
                                <Text style={styles.strId}>N {meal.idMeal}</Text>
                                <TouchableOpacity style={{marginTop:10,borderRadius:30,backgroundColor:Color.primary,padding:7,width:"100%",alignItems:"center"}}>
                                    <Text style={{fontSize:16,color:Color.white}}>Oder</Text>
                                </TouchableOpacity>
                            </View>
                        ))

                    }
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
    strCover: {
        backgroundColor: Color.white,
        display: "flex",
        alignItems: "center",
        width: 270,
        paddingTop:30,
        paddingBottom:20,
        paddingHorizontal: 30,
        borderRadius: 20,
        position: "relative",
        overflow: "visible",
        marginBottom:90,
    },
    strImg: {
        width: 140,
        height: 135,
        objectFit: "cover",
        borderRadius: 75,
        position: "absolute",
        top: -40,
    },
    strTxt: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        color: Color.black,
        marginTop: 75
    },
    strId: {
        marginTop: 15,
        color: Color.primary
    },
    seeMore:{
        color:Color.primary,
        marginBottom:5,
        textAlign:"right"
    }
})

export default AllFoods