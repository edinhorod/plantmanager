import React from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

import wateringImg from "../assets/watering.png";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { useNavigation } from "@react-navigation/core";

export function Welcome() {
  const navigation = useNavigation();

  function handleStart(){
    navigation.navigate('UserIdentification');
  }
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.content}>
            <Text style={styles.title}>
                Gerencie {"\n"} sua plantas de {"\n"} forma fácil
            </Text>

            <Image source={wateringImg} style={styles.image} resizeMode="contain" />

            <Text style={styles.subtitle}>
                Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
                sempre que precisar.
            </Text>

            <TouchableOpacity style={styles.button} onPress={handleStart}>
                <Text>
                <Entypo name="chevron-right" style={styles.buttonIcon} />
                </Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 28,
    lineHeight: 34,
    textAlign: "center",
    fontWeight: "bold",
    color: colors.heading,
    marginTop: 40,
  },
  subtitle: {
    fontFamily: fonts.text,
    textAlign: "center",
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
  },
  button: {
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56,
  },
  buttonIcon: {
    color: colors.white,
    fontSize: 32,
  },
  image: {
    height: Dimensions.get("window").width * 0.7,
  },
});
