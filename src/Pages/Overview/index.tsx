import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Text, TouchableOpacity } from 'react-native';
import { collors } from '../../Styles/themes';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconShare from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';
import { navigationProps } from '../../types/Navigation';
import { useNavigation } from '@react-navigation/native';
import getGastosByCategory from './GetSpendingByCategory';
import { PieChart } from 'react-native-chart-kit';
import BalanceCard from '../../Components/BalanceCard';
import { CustomCalendarHeader } from '../../Components/Calendar';
import moment from 'moment';
import 'moment/locale/pt-br';
import { useSelector } from 'react-redux';
import { addCardsByCategory } from '../../Utils/addCardsByCategory';
import { captureScreen } from 'react-native-view-shot';
import Share from 'react-native-share';
import { monthYearProps } from '../../types/AllTypes';

export default function Overview() {
    const navigation: navigationProps = useNavigation();
    const calendarSelect = useSelector((state: monthYearProps) => state.monthYear);
    const [data, setData] = useState<any>([]);
    const [totalExpenses, setTotalExpenses] = useState<number>();
    const [remaining, setRemaining] = useState<number>();

    const coresPorTipo: any = {
        Casa: '#DE245C',
        Lazer: '#FFD700',
        Saúde: '#FF6347',
        Educação: '#9B30FF',
        Transporte: '#FFA500',
        Alimentação: '#F4A460',
        Outros: '#BEBEBE',
        Salario: '#008000',
        Beneficio: '#FFA07A',
        Freelance: '#3CB371',
    };

    const control = async () => {
        const currentMonthYear = calendarSelect || moment().format('MMMYYYY');
        addCardsByCategory(currentMonthYear).then(({ totalGastos, totalLucros }) => {
            const calculation = totalLucros >= totalGastos ? totalLucros - totalGastos : 0;
            const remaining = totalLucros >= totalGastos ? 0 : totalGastos - totalLucros;
            setRemaining(remaining);
            setTotalExpenses(calculation);
        });
    };

    const fetchData = async () => {
        const currentMonthYear = calendarSelect || moment().format('MMMYYYY');
        const gastos = await getGastosByCategory(currentMonthYear);

        const dataForChart = gastos.map((gasto: any) => ({
            name: gasto.categoria,
            population: gasto.total,
            color: coresPorTipo[gasto.categoria],
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        }));

        setData(dataForChart);
    };

    const shareScreen = () => {
        captureScreen({
            format: 'jpg',
            quality: 0.8,
        })
            .then(
                (uri) => {
                    Share.open({ url: uri }).catch((error) => {
                        if (error && error.message === 'User did not share') {
                            console.log('Usuário cancelou o compartilhamento.');
                        } else {
                            console.error('Erro ao compartilhar:', error);
                        }
                    });
                },
                (error) => console.error('Falha na captura de tela', error)
            )
            .catch((error) => {
                console.error('Erro inesperado:', error);
            });
    };

    useEffect(() => {
        control();
        fetchData();
    }, [calendarSelect]);

    const chartConfig = {
        backgroundGradientFrom: 'white',
        backgroundGradientTo: 'white',
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    };

    const screenWidth = Dimensions.get('window').width;

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Icon name="arrow-back-ios" onPress={() => navigation.goBack()} size={RFValue(20)} color="white" />
                    <TouchableOpacity onPress={shareScreen}>
                        <IconShare name="share" size={RFValue(20)} color="white" />
                    </TouchableOpacity>
                </View>
                {data && data.length > 0 ? (
                    <View style={styles.chartContainer}>
                        <Text style={styles.titleChart}>Análise de Despesas do Mês</Text>
                        <PieChart
                            data={data}
                            width={screenWidth}
                            height={300}
                            chartConfig={chartConfig}
                            accessor={'population'}
                            backgroundColor={'transparent'}
                            paddingLeft={'0'}
                            hasLegend={false}
                            absolute
                            center={[screenWidth / 4, 1]}
                        />
                        <View style={styles.legend}>
                            {data.map((item: any, index: number) => (
                                <View key={index} style={styles.legendItem}>
                                    <View style={[styles.legendIcon, { backgroundColor: item.color }]} />
                                    <Text style={styles.legendText}>{item.name}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                ) : (
                    <View style={styles.containerMessage}>
                        <Text style={styles.message}>Este mês está limpo! Você não teve despesas registradas.</Text>
                    </View>
                )}

                <View style={styles.balanceContainer}>
                    <BalanceCard balance={totalExpenses} name="Positivo" type="Lucro" icon="trending-up" />
                    <BalanceCard balance={remaining} name="Negativo" type="Gastos" icon="trending-down" />
                </View>

                <View style={styles.CustomCalendar}>
                    <CustomCalendarHeader />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: collors.darkGrey,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        marginTop: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    chartContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    legend: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    legendIcon: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 6,
    },
    legendText: {
        color: collors.white,
        fontFamily: 'Fredoka-Medium',
    },
    balanceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 40,
    },
    CustomCalendar: {
        marginVertical: 40,
    },
    titleChart: {
        color: collors.white,
        fontFamily: 'Fredoka-Medium',
        fontSize: RFValue(14),
        marginTop: 60,
    },
    containerMessage: {
        alignSelf: 'center',
        justifyContent: 'center',
        height: 430,
    },
    message: {
        fontFamily: 'Fredoka-Medium',
        fontSize: RFValue(12),
        color: collors.white,
        textAlign: 'center',
    },
});
