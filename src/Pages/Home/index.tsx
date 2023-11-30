import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Card from '../../Components/Card';
import getSaudacao from '../../Utils/Saudacoes';
import { Tag } from '../../Components/Tag';
import { BodyCard } from '../../Components/BodyCard';
import { useTheme } from '../../Components/ThemeContext';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fab from '../../Components/Fab';
import { buscarTodosOsCards } from '../../Utils/Select_Cards';
import { useFocusEffect } from '@react-navigation/native';
import { DeleteCard } from './Delete-Card';
import { useSelector } from 'react-redux';
import { CustomCalendarHeader } from '../../Components/Calendario';

type Cards = {
    tag: any;
    descricao: string;
    valor: number;
    id: number;
};

function Home() {
    const { theme, toggleTheme } = useTheme();
    const name = useSelector((state: any) => state.name);
    const [card, setCard] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useFocusEffect(
        React.useCallback(() => {
            buscarTodosOsCards((dados) => {
                setCard(dados);
            });
        }, [isLoading])
    );

    const onCardDelete = async (id: number) => {
        setIsLoading(true);
        const result: any = await DeleteCard(id);
        if (result?.rowsAffected === 1) {
            console.log(`Card ID ${id} apagado com sucesso..`);
            setCard((prevCards: Cards[]) => prevCards.filter((card) => card.id !== id));
        } else {
            console.log(`Erro ao excluir card com ID ${id}:`, result);
        }
        setIsLoading(false);
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <CustomCalendarHeader/>
            <TouchableOpacity style={styles.icon} onPress={toggleTheme}>
                <Icons name={theme.backgroundColor === '#121212' ? 'lightbulb-on' : 'lightbulb-outline'} size={28} color={theme.textColor} />
            </TouchableOpacity>
            <View style={styles.saudacao}>
                <Text style={[styles.textoSaudacao, { color: theme.textColor }]}>{getSaudacao(name)}</Text>
            </View>
            <ScrollView style={{ height: '50%' }}>
                {isLoading === false ? (
                    card?.map(({ tag, descricao, valor, id }: Cards) => (
                        <View key={id} style={styles.card}>
                            <Card>
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Tag tipo={tag} />
                                    <Icons name="close" size={20} color={'white'} onPress={() => onCardDelete(id)} />
                                </View>
                                <BodyCard texto={descricao} valor={valor} tipo={tag} />
                            </Card>
                        </View>
                    ))
                ) : (
                    <Text style={{ color: 'white' }}>Carregando..</Text>
                )}
            </ScrollView>
            <Fab />
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        paddingTop: 80,
    },
    icon: {
        position: 'absolute',
        top: 80,
        right: 20,
        zIndex: 10,
        color: 'blue',
    },
    saudacao: {
        marginBottom: 50,
    },
    textoSaudacao: {
        fontSize: 22,
        fontWeight: '600',
        alignSelf: 'center',
        color: 'white',
    },
    card: {
        alignSelf: 'center',
        marginHorizontal: 20,
        marginTop: 10,
    },
});
