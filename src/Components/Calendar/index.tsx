import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Right from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import 'moment/locale/pt-br';
import { collors } from '../../Styles/themes';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar } from '../../Redux/Actions';

moment.locale('pt-br');

type CalendarProps = {
    monthYear: string;
};
export const CustomCalendarHeader = () => {
    const calendarSelect = useSelector((state: CalendarProps) => state.monthYear);
    const dispatch = useDispatch();
    const [currentMonth, setCurrentMonth] = useState(moment());
    const [isUserAction, setIsUserAction] = useState(false);

    const goToNextMonth = () => {
        const nextMonth = currentMonth.clone().add(1, 'month');
        setCurrentMonth(nextMonth);
        setIsUserAction(true);
        dispatch(Calendar(nextMonth.format('MMM' + 'YYYY')));
    };

    const goToPreviousMonth = () => {
        const prevMonth = currentMonth.clone().subtract(1, 'month');
        setCurrentMonth(prevMonth);
        setIsUserAction(true);
        dispatch(Calendar(prevMonth.format('MMM' + 'YYYY')));
    };

    useEffect(() => {
        if (calendarSelect && calendarSelect !== currentMonth.format('MMM' + 'YYYY') && !isUserAction) {
            setCurrentMonth(moment(calendarSelect, 'MMM' + 'YYYY'));
        }
        setIsUserAction(false);
    }, [calendarSelect]);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={goToPreviousMonth}>
                <Right name="angle-left" color="white" size={32} />
            </TouchableOpacity>
            <Text style={styles.calendarValue}>
                {currentMonth.format('MMM')} <Text style={{ textTransform: 'lowercase' }}>de</Text> {currentMonth.format('YYYY')}
            </Text>
            <TouchableOpacity onPress={goToNextMonth}>
                <Right name="angle-right" color="white" size={32} />
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
        color: collors.white,
        marginHorizontal: 20,
    },
});
