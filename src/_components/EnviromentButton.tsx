import React from "react";
import { Text, StyleSheet } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface EnviromentButtonProps extends RectButtonProps {
  title: string;
  active?: boolean;
}

export function EnviromentButton({
  title,
  active = false,
  ...rest
}: EnviromentButtonProps) {
  return (
    <RectButton
      style={[styles.container, active && styles.containerActive]}
      {...rest}
    >
      <Text style={[styles.text, active && styles.textActive]}>{title}</Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 76,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.shape,
    borderRadius: 12,
    marginHorizontal: 5,
  },

  containerActive: {
    color: colors.green,
    backgroundColor: colors.green_light,
  },

  text: {
    color: colors.heading,
    fontFamily: fonts.heading,
  },

  textActive: {
    color: colors.green_dark,
    fontFamily: fonts.text,
  },
});
