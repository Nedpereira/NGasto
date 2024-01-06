import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, Image, BackHandler } from 'react-native';
import getGreetings from '../../Utils/getGreetings';
import Fab from '../../Components/Fab';
import { searchAllCards } from '../../Utils/Select_Cards';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { CustomCalendarHeader } from '../../Components/Calendar';
import { BalanceCard } from '../../Components/BalanceCard';
import CustomCard from '../../Components/CustomCard';
import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import { addCardsByCategory } from '../../Utils/addCardsByCategory';
import { collors } from '../../Styles/themes';
import { DeleteCard } from '../../Helpers/Delete-Card';
import { CreateCardsTable } from '../../Helpers/Add-Tabela';
import { navigationProps } from '../../types/Navigation';
import { cardsProps, monthYearProps, userProps } from '../../types/AllTypes';
import moment from 'moment';
import 'moment/locale/pt-br';

function Home() {
    const navigation: navigationProps = useNavigation();
    const { name, photo } = useSelector((state: userProps) => state.user);
    const calendarSelect = useSelector((state: monthYearProps) => state.monthYear);
    const [card, setCard] = useState<any>([]);
    const [lucro, setLucro] = useState<number>();
    const [gasto, setGasto] = useState<number>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        CreateCardsTable();
    }, []);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonPress);
        return () => backHandler.remove();
    }, []);

    const handleBackButtonPress = () => {
        BackHandler.exitApp();
        return true;
    };

    useFocusEffect(
        React.useCallback(() => {
            const currentMonthYear = calendarSelect || moment().format('MMMYYYY');
            searchAllCards(currentMonthYear, (dados) => {
                setCard(dados);
            });
            addCardsByCategory(currentMonthYear).then(({ totalGastos, totalLucros }) => {
                setLucro(totalLucros);
                setGasto(totalGastos);
            });
        }, [calendarSelect, isLoading])
    );

    const onCardDelete = async (id: number) => {
        setIsLoading(true);
        try {
            const wasDeleted = await DeleteCard(id);
            if (wasDeleted) {
                setCard((prevCards: cardsProps[]) => prevCards.filter((card) => card?.id !== id));
            } else {
                console.log(`Nenhum card encontrado com ID ${id}.`);
            }
        } catch (error) {
            console.error(`Erro ao excluir card com ID ${id}:`, error);
        } finally {
            setIsLoading(false);
        }
    };

    const renderContent = () => {
        if (isLoading) {
            return <Text style={styles.loadingText}>Carregando...</Text>;
        }

        if (card.length === 0) {
            return (
                <Text style={styles.message}>
                    Controle seus gastos facilmente! Clique na seta para cima e depois no + para adicionar seu primeiro card.
                </Text>
            );
        }

        return card.map(({ tag, descricao, valor, id }: cardsProps) => (
            <CustomCard tag={tag} descricao={descricao} valor={valor} id={id} key={id.toString()} onCardDelete={() => onCardDelete(id)} />
        ));
    };

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#17A2B8', '#17A2B8']} style={styles.gradientBackground}>
                <View style={styles.saudacao} onTouchEnd={() => navigation.navigate('EditUser')}>
                    <Image
                        style={photo ? styles.image : styles.imageDefault}
                        source={photo ? { uri: photo } : require('../../Assets/imgs/user-default.png')}
                    />
                    <Text numberOfLines={2} ellipsizeMode="tail" style={styles.textoSaudacao}>
                        {getGreetings(name)}
                    </Text>
                </View>
                <View style={styles.CustomCalendar}>
                    <CustomCalendarHeader />
                </View>
            </LinearGradient>
            <View style={styles.balanceContainer}>
                <BalanceCard balance={lucro} name="Ganhos" type="Lucro" icon="trending-up" />
                <BalanceCard balance={gasto} name="Gastos" type="Gastos" icon="trending-down" />
            </View>
            <ScrollView style={styles.scrollViewStyle} contentContainerStyle={styles.scrollViewContent}>
                {renderContent()}
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
        backgroundColor: collors.darkGrey,
    },
    saudacao: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
        marginBottom: 30,
    },
    textoSaudacao: {
        width: 300,
        fontSize: RFValue(14),
        marginLeft: 5,
        justifyContent: 'center',
        color: collors.white,
        fontFamily: 'Fredoka-Medium',
    },
    CustomCalendar: {
        marginBottom: 40,
    },
    loadingText: {
        paddingTop: 80,
        color: collors.white,
        alignSelf: 'center',
        fontFamily: 'Fredoka-Medium',
    },
    scrollViewStyle: {
        marginTop: 50,
        height: '38%',
        alignSelf: 'center',
    },
    message: {
        color: collors.white,
        fontFamily: 'Fredoka-Medium',
        textAlign: 'center',
        paddingTop: 80,
        paddingHorizontal: 20,
    },
    gradientBackground: {
        height: '25%',
        justifyContent: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        ...Platform.select({
            android: {
                elevation: 2,
            },
        }),
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'flex-start',
    },
    balanceContainer: {
        position: 'absolute',
        top: '20%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 50,
        resizeMode: 'cover',
    },
    imageDefault: {
        width: 40,
        height: 40,
        borderRadius: 50,
        resizeMode: 'cover',
    },
});
