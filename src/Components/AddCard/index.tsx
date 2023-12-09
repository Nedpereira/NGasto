import { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, Dimensions, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import { bubbleModal } from '../../Styles/themes';
import { TextInput } from 'react-native-paper';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import { inserirCard } from '../../Utils/Insert_Cards';
import { MyAlert } from '../Alert';
import { searchCardById } from './Sql/Search-Card';
import { editCard } from './Sql/Edit-Card';
import { navigationProps } from '../../types/Navigation';
import { DeleteCard } from '../../Helpers/Delete-Card';

type ModalType = 'add' | 'edit';

type AddCardRouteParams = {
    typeCard: ModalType;
    id: number;
};

const { width, height } = Dimensions.get('window');

const AddCard = () => {
    const navigation: navigationProps = useNavigation();
    const route = useRoute<RouteProp<{ params: AddCardRouteParams }, 'params'>>();
    const typeCard = route.params?.typeCard;
    const idCard = route.params?.id;
    const DataAtual = moment();
    const anoMes = DataAtual.format('MMM' + 'YYYY');
    const [isLoading, setIsLoading] = useState(false);
    const [tag, setTag] = useState<string>('');
    const [editTag, setEditTag] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [editDescription, setEditDescription] = useState<string>('');
    const [value, setValue] = useState<string>('');
    const [editValue, setEditValue] = useState<string>('');

    useEffect(() => {
        if (typeCard === 'edit') {
            setIsLoading(true);
            searchCardById(idCard, (responseCard) => {
                if (responseCard) {
                    setEditTag(responseCard.tag);
                    setEditDescription(responseCard.descricao);
                    setEditValue(responseCard.valor);
                } else {
                    console.log('Nenhum card encontrado com o ID:', idCard);
                }
                setIsLoading(false);
            });
        }
    }, [typeCard, idCard]);

    const opcoes = [
        { label: 'Casa', value: 'Casa' },
        { label: 'Lazer', value: 'Lazer' },
        { label: 'Saúde', value: 'Saúde' },
        { label: 'Educação', value: 'Educação' },
        { label: 'Transporte', value: 'Transporte' },
        { label: 'Alimentação', value: 'Alimentação' },
        { label: 'Outros', value: 'Outros' },
        { label: 'Salario', value: 'Salario' },
        { label: 'Beneficio', value: 'Beneficio' },
        { label: 'Freelance', value: 'Freelance' },
    ];

    const handleAddCard = () => {
        if (anoMes && tag && description && value) {
            inserirCard(anoMes, tag, description, value);
            MyAlert(200, 'Card adicionado com sucesso!');
            setTimeout(() => {
                navigation.navigate('Home');
            }, 800);
        } else {
            MyAlert(300, 'Preencha todos os campos!');
        }
    };

    const handleValueChange = (text: string) => {
        const filteredText = text.replace(/\D/g, '');
        if (filteredText.length <= 5) {
            setValue(filteredText);
            setEditValue(filteredText);
        }
    };

    const handleDeleteCard = async () => {
        try {
            const wasDeleted = await DeleteCard(idCard);
            if (wasDeleted) {
                MyAlert(200, 'Card excluído com sucesso!');
                setTimeout(() => navigation.navigate('Home'), 800);
            } else {
                console.log(`Nenhum card encontrado com ID ${idCard}.`);
            }
        } catch (error) {
            console.error(`Erro ao excluir card com ID ${idCard}:`, error);
        }
    };

    const handleEditCard = () => {
        editCard(idCard, editTag, editDescription, editValue, (isSuccess) => {
            if (isSuccess) {
                MyAlert(200, 'Card atualizado com sucesso!');
                setTimeout(() => {
                    navigation.navigate('Home');
                }, 800);
            } else {
                MyAlert(500, 'Falha ao atualizar o card.');
            }
        });
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#17A2B8" />
            </View>
        );
    }

    if (typeCard === 'add') {
        return (
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Dropdown
                        style={styles.dropdown}
                        selectedTextStyle={styles.selectedTextStyle}
                        placeholderStyle={styles.placeholderStyle}
                        itemTextStyle={styles.dropdownItemText}
                        itemContainerStyle={{ margin: -5 }}
                        inputSearchStyle={styles.inputSearchStyle}
                        search
                        maxHeight={160}
                        value={tag}
                        data={opcoes}
                        valueField="value"
                        labelField="label"
                        placeholder="Selecione uma tag"
                        searchPlaceholder="Buscar..."
                        onChange={(e: any) => {
                            setTag(e?.value);
                        }}
                    />
                    <TextInput
                        style={styles.description}
                        placeholderTextColor="#616161"
                        contentStyle={styles.descriptionPlaceholder}
                        theme={{ colors: { primary: '#17A2B8' } }}
                        placeholder="Qual descrição deseja colocar?"
                        value={description}
                        onChangeText={(text: string) => setDescription(text)}
                    />
                    <TextInput
                        style={styles.description}
                        placeholderTextColor="#616161"
                        keyboardType="numeric"
                        contentStyle={styles.descriptionPlaceholder}
                        theme={{ colors: { primary: '#17A2B8' } }}
                        placeholder="Adicione um valor. Ex: 1320"
                        value={value}
                        onChangeText={handleValueChange}
                    />
                    <View style={styles.groupsButton}>
                        <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.goBack()}>
                            <Text style={styles.text}>Voltar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonAdd} onPress={handleAddCard}>
                            <Text style={styles.text}>Adicionar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    } else {
        return (
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Icon style={styles.iconClose} name="close" size={RFValue(18)} onPress={() => navigation.goBack()} color={'#343A40'} />
                    <Dropdown
                        style={styles.dropdown}
                        selectedTextStyle={styles.selectedTextStyle}
                        placeholderStyle={styles.placeholderStyle}
                        itemTextStyle={styles.dropdownItemText}
                        itemContainerStyle={{ margin: -5 }}
                        inputSearchStyle={styles.inputSearchStyle}
                        search
                        maxHeight={160}
                        value={editTag}
                        data={opcoes}
                        valueField="value"
                        labelField="label"
                        placeholder="Selecione uma tag"
                        searchPlaceholder="Buscar..."
                        onChange={(e: any) => {
                            setEditTag(e?.value);
                        }}
                    />
                    <TextInput
                        style={styles.description}
                        placeholderTextColor="#616161"
                        contentStyle={styles.descriptionPlaceholder}
                        theme={{ colors: { primary: '#17A2B8' } }}
                        value={editDescription}
                        onChangeText={(text: string) => setEditDescription(text)}
                    />
                    <TextInput
                        style={styles.description}
                        placeholderTextColor="#616161"
                        keyboardType="numeric"
                        contentStyle={styles.descriptionPlaceholder}
                        theme={{ colors: { primary: '#17A2B8' } }}
                        value={editValue}
                        onChangeText={handleValueChange}
                    />
                    <View style={styles.groupsButton}>
                        <TouchableOpacity style={styles.buttonDelete} onPress={handleDeleteCard}>
                            <Text style={styles.text}>Excluir</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonAdd} onPress={handleEditCard}>
                            <Text style={styles.text}>Editar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
};

export default AddCard;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    modalView: {
        width: '90%',
        flexDirection: 'column',
        marginVertical: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        shadowColor: bubbleModal.shadow,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        ...Platform.select({
            android: {
                elevation: 4,
            },
        }),
    },
    dropdown: {
        width: '90%',
        height: 40,
        backgroundColor: 'white',
        borderRadius: 5,
        paddingHorizontal: 3,
        borderColor: 'black',
        borderWidth: 0.5,
        borderBottomWidth: 1,
        marginTop: 10,
        marginBottom: 10,
        ...Platform.select({
            android: {
                elevation: 6,
            },
        }),
    },
    selectedTextStyle: {
        fontSize: RFValue(11),
        marginLeft: 8,
        color: '#616161',
        fontFamily: 'Fredoka-Medium',
    },
    placeholderStyle: {
        fontSize: RFValue(11),
        color: '#616161',
        fontFamily: 'Fredoka-Medium',
    },
    description: {
        width: '90%',
        height: 40,
        backgroundColor: 'white',
        borderRadius: 5,
        paddingHorizontal: 10,
        borderColor: 'black',
        borderWidth: 0.5,
        marginBottom: 10,
        ...Platform.select({
            android: {
                elevation: 6,
            },
        }),
    },
    descriptionPlaceholder: {
        fontSize: RFValue(11),
        color: '#616161',
        fontFamily: 'Fredoka-Medium',
    },
    groupsButton: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 10,
    },
    buttonAdd: {
        width: 100,
        height: 38,
        backgroundColor: '#2CBD4D',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        ...Platform.select({
            android: {
                elevation: 1,
            },
        }),
    },
    buttonBack: {
        width: 100,
        height: 38,
        backgroundColor: '#A2A2A2',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        ...Platform.select({
            android: {
                elevation: 1,
            },
        }),
    },
    text: {
        color: 'white',
        fontFamily: 'Fredoka-Medium',
        fontSize: RFValue(11),
    },
    buttonDelete: {
        width: 100,
        height: 38,
        backgroundColor: '#CA143F',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        ...Platform.select({
            android: {
                elevation: 1,
            },
        }),
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    iconClose: {
        alignSelf: 'flex-end',
        margin: 3,
    },
    dropdownItemText: {
        fontSize: RFValue(11),
        color: '#616161',
    },
    inputSearchStyle: {
        fontSize: RFValue(11),
        color: '#616161',
        height: 42,
    },
});
