
import { FlatList, Text, View, StyleSheet} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Dropdown  } from "react-native-element-dropdown";
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from "react";
import  Icons  from "react-native-vector-icons/MaterialCommunityIcons";
import { CriarTabelaCards } from "./add_tabela";
import { inserirCard } from "../../Utils/Insert_Cards";

function AddCard() {

  useEffect(() => {
    CriarTabelaCards();
  },[])

  const [tagSelecionada, setTagSelecionada] = useState();
  const [descricao, setDescricao] = useState<string>();
  const [valor, setValor] = useState<string>();
  const navigation:any = useNavigation()

  const opcoes = [
    { label: "Casa", value: "Casa" },
    { label: "Lazer", value: "Lazer" },
    { label: "Saúde", value: "Saúde" },
    { label: "Educação", value: "Educação" },
    { label: "Transporte", value: "Transporte" },
    { label: "Alimentação", value: "Alimentação" },
    { label: "Outros", value: "Outros" },
    { label: "Salario", value: "Salario" },
    { label: "Beneficio", value: "Beneficio" },
    { label: "Freelance", value: "Freelance" },
  ];

  const handleAddCard = () => {
    if(tagSelecionada && descricao && valor){
      inserirCard(tagSelecionada, descricao, valor)
    }else{
      console.log('Preencha todos os campos!')
    }
  }

  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        selectedTextStyle={styles.selectedTextStyle}
        placeholderStyle={styles.placeholderStyle}
        search
        maxHeight={200}
        value={tagSelecionada}
        data={opcoes}
        valueField="value"
        labelField="label"
        placeholder="Selecione uma tag"
        searchPlaceholder="Buscar..."
        onChange={(e: any) => {
          setTagSelecionada(e?.value);
        }}
      />
      <TextInput label="Descrição" value={descricao} onChangeText={(text:string) => setDescricao(text)}/>
      <TextInput label="Valor" value={valor?.toString()} onChangeText={(text:string) => setValor(text)}/>
      <Button onPress={handleAddCard}>Adicionar</Button>
      <Button onPress={() =>  navigation.goBack()}>Voltar</Button>
    </View>
  );
}

export default AddCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%', 
    justifyContent: 'center',
  },
  darkContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#121212",
  },
  dropdown: {
    height: 50,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
    color: "black",
  },
  placeholderStyle: {
    fontSize: 16,
    color: "black",
  },
  imageStyle: {
    width: 20,
    height: 20,
    borderRadius: 12,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
