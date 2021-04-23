import React from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { Button } from "../_components/Button";

interface Params {
  title: string;
  subtitle: string;
  buttonTitle: string;
  icon: "smile" | "hug";
  nextScreen: string;
}

const emojis = {
  hug: "🤗",
  smile: "😄",
};

export function Confirmation() {
  const navigation = useNavigation();
  const routes = useRoute();
  const {
    title,
    subtitle,
    buttonTitle,
    icon,
    nextScreen,
  } = routes.params as Params;

  function handleMoveOn() {
    navigation.navigate(nextScreen);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>{emojis[icon]}</Text>

        <Text style={styles.title}>{title}</Text>

        <Text style={styles.subtitle}>
          {subtitle}
        </Text>

        <View style={styles.footer}>
          <Button title={buttonTitle} onPress={handleMoveOn} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },

  content: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },

  title: {
    fontFamily: fonts.text,
    textAlign: "center",
    fontSize: 22,
    lineHeight: 32,
    color: colors.heading,
    marginTop: 20,
  },

  subtitle: {
    textAlign: "center",
    fontFamily: fonts.text,
    fontSize: 17,
    color: colors.heading,
  },

  form: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
    width: "100%",
  },
  elements: {
    alignItems: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: "100%",
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: "center",
  },
  emoji: {
    fontSize: 44,
  },
  footer: {
    marginTop: 40,
    width: "80%",
  },
});
