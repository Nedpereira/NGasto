import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Right from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import 'moment/locale/pt-br';
import { calendarColors } from '../../Styles/themes';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch } from 'react-redux';
import { Calendar } from '../../Redux/Actions';

moment.locale('pt-br');

export const CustomCalendarHeader = () => {
    const [currentMonth, setCurrentMonth] = useState(moment());
    const dispatch = useDispatch();

    const goToNextMonth = () => {
        setCurrentMonth(currentMonth.clone().add(1, 'month'));
    };
    const goToPreviousMonth = () => {
        setCurrentMonth(currentMonth.clone().subtract(1, 'month'));
    };

    useEffect(() => {
        if (currentMonth) {
            dispatch(Calendar(currentMonth.format('MMM'+ 'YYYY')));
        }
    }, [currentMonth]);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={goToPreviousMonth}>
                <Right name="angle-left" color="white" size={30} />
            </TouchableOpacity>
            <Text style={styles.calendarValue}>
                {currentMonth.format('MMM')} <Text style={{ textTransform: 'lowercase' }}>de</Text> {currentMonth.format('YYYY')}
            </Text>
            <TouchableOpacity onPress={goToNextMonth}>
                <Right name="angle-right" color="white" size={30} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    calendarValue: {
        textTransform: 'capitalize',
        fontSize: RFValue(14),
        fontFamily: 'Fredoka-Medium',
        color: calendarColors.text,
        marginHorizontal: 20,
    },
});
