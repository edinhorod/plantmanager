import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { Button } from "../_components/Button";

export function UserIdentification() {
  const navigation = useNavigation();

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>();

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!name);
  }
  function handleInputFocus() {
    setIsFocused(true);
  }
  function handleInputChange(value: string) {
    setIsFilled(!!value);
    setName(value);
  }

  async function handleSubmit() {
    if (!name) {
      return Alert.alert(`Digite seu nome, por favor \n 😥`);
    }
    try{
      await AsyncStorage.setItem("@plantmanager:user", name);
      navigation.navigate("Confirmation",{
        title: 'Prontinho!',
        subtitle: 'Agora vamos começar a cuidar das sua plantinhas com muito cuidado',
        buttonTitle: 'Começar',
        icon: 'smile',
        nextScreen: 'PlantSelect',
      });
    } catch{
      Alert.alert(`Não foi possível salvar no nome \n 😥`);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={styles.elements}>
                <Text style={styles.emoji}>{isFilled ? "😄" : "😃"}</Text>

                <Text style={styles.title}>
                  Como podemos {"\n"} chamar você?
                </Text>
              </View>

              <TextInput
                style={[
                  styles.input,
                  (isFocused || isFilled) && {
                    borderColor: colors.green,
                    borderBottomWidth: 2,
                  },
                ]}
                placeholder="Digite o nome"
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange}
              />

              <View style={styles.footer}>
                <Button title="Confirmar" onPress={handleSubmit} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },

  content: {
    flex: 1,
    width: "100%",
  },

  title: {
    fontFamily: fonts.text,
    textAlign: "center",
    fontSize: 24,
    lineHeight: 32,
    color: colors.heading,
    marginTop: 20,
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
    width: "100%",
  },
});
