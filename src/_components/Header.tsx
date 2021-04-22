import React from "react";
import { Image, StyleSheet, Text, useColorScheme, View } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import colors from "../styles/colors";

import userImage from "../assets/edinho.png";
import fonts from "../styles/fonts";

export function Header() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>Edinho</Text>
      </View>
      <Image style={styles.userImage} source={userImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    marginTop: getStatusBarHeight(),
  },

  greeting:{
      fontSize: 32,
      color: colors.heading,
      fontFamily: fonts.heading
  },
  
  userName:{
      fontSize: 32,
      fontFamily: fonts.heading,
      color: colors.heading,
      lineHeight: 40,
      fontWeight: 'bold'
  },

  userImage:{
      width: 70,
      height: 70,
      borderRadius: 40,
  }
});
