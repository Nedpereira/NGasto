import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';

moment.locale('pt-br');

export const CustomCalendarHeader = () => {
    const [currentMonth, setCurrentMonth] = useState(moment());

    const goToNextMonth = () => {
        setCurrentMonth(currentMonth.clone().add(1, 'month'));
    };
    const goToPreviousMonth = () => {
        setCurrentMonth(currentMonth.clone().subtract(1, 'month'));
    };

    console.log(currentMonth.format('MMMM'));

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={goToPreviousMonth}>
                <Text>{currentMonth.clone().subtract(1, 'month').format('MMMM')}</Text>
            </TouchableOpacity>
            <Text style={{ marginHorizontal: 20 }}>{currentMonth.format('MMMM' + '-' + 'YYYY')}</Text>
            <TouchableOpacity onPress={goToNextMonth}>
                <Text>{currentMonth.clone().add(1, 'month').format('MMMM')}</Text>
            </TouchableOpacity>
        </View>
    );
};
