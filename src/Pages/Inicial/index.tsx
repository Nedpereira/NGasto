import React, { useState, useEffect,useRef  } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";
import LottieView from 'lottie-react-native';

const InitialScreen = ({ navigation }: any) => {
  const [name, setName] = useState("");
  const animation = useRef(null);

//   SecureStore.deleteItemAsync("userName");

  useEffect(() => {
    async function loadName() {
      const savedName = await SecureStore.getItemAsync("NomeUsuario");
      if (savedName) {
        setName(savedName);
        navigation.navigate("Home");
      }
    }

    loadName();
  }, [navigation]);

  const handleContinue = async () => {
    await SecureStore.setItemAsync("NomeUsuario", name);
    navigation.navigate("Home", { userName: name });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao "Você no Controle"</Text>
      <LottieView
        autoPlay
        ref={animation}
        style={styles.lottie}
        source={require('../../Assets/finance.json')}
      />
      <Text style={styles.subtitle}>
        O aplicativo que ajuda você a gerenciar suas finanças pessoais com
        facilidade.
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Como gostaria de ser chamado(a)?</Text>
        <TextInput
          style={styles.input}
          placeholder="nome"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.offlineInfo}>
          Seus dados são armazenados localmente no dispositivo e você pode usar
          o aplicativo mesmo quando estiver offline. Sua privacidade e segurança
          são nossa prioridade.
        </Text>
      </View>
      <Button title="Continuar" onPress={handleContinue} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginVertical: 20
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
  },
  offlineInfo: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  lottie: {
    width: 200,
    height: 200,
  },
});

export default InitialScreen;
