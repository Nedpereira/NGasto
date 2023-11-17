import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Card from "../../Components/Card";
import getSaudacao from "../../Utils/Saudacoes";
import { Tag } from "../../Components/Tag";
import { BodyCard } from "../../Components/BodyCard";
import { useTheme } from "../../Components/ThemeContext";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MyComponent from "../../Components/Fab";
import * as SecureStore from "expo-secure-store";

type Cards = {
  tipo: any;
  texto: string;
  valor: number;
  id: number;
};

function Home() {
  const { theme, toggleTheme } = useTheme();
  const [name, setName] = useState("");

  let cards = [
    {
      id: 1,
      tipo: "Educação",
      texto: "Faculdade",
      valor: 200,
    },
    {
      id: 2,
      tipo: "Lazer",
      texto: "Trabalho",
      valor: 1300,
    },
  ];

  useEffect(() => {
    async function loadName() {
      const savedName = await SecureStore.getItemAsync("NomeUsuario");
      if (savedName) {
        setName(savedName);
      } else {
        setName("Desconhecido");
      }
    }

    loadName();
  }, []);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <TouchableOpacity style={styles.icon} onPress={toggleTheme}>
        <MaterialCommunityIcons
          name={
            theme.backgroundColor === "#121212"
              ? "lightbulb-on"
              : "lightbulb-outline"
          }
          size={28}
          color={theme.textColor}
        />
      </TouchableOpacity>
      <View style={styles.saudacao}>
        <Text style={[styles.textoSaudacao, { color: theme.textColor }]}>
          {getSaudacao(name)}
        </Text>
      </View>
      {cards?.map(({ tipo, texto, valor, id }: Cards) => (
        <View key={id} style={styles.card}>
          <Card>
            <Tag tipo={tipo} />
            <BodyCard texto={texto} valor={valor} tipo={tipo} />
          </Card>
        </View>
      ))}
      <MyComponent />
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    paddingTop: 80,
  },
  icon: {
    position: "absolute",
    top: 80,
    right: 20,
    zIndex: 10,
    color: "blue",
  },
  saudacao: {
    marginBottom: 50,
  },
  textoSaudacao: {
    fontSize: 22,
    fontWeight: "600",
    alignSelf: "center",
    color: "white",
  },
  card: {
    alignSelf: "center",
    marginHorizontal: 20,
    marginTop: 30,
  },
});
