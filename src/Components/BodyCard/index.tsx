import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../ThemeContext';
import { formatarValor } from '../../Utils/FormatarValor';

type TagProps = {
    tipo?: string;
    texto: string;
    valor: number;
};

export const BodyCard = ({ texto, valor, tipo = 'Outros' }: TagProps) => {
    const { theme } = useTheme();

    const tiposGasto: any = {
        Casa: 'Casa',
        Lazer: 'Lazer',
        Saúde: 'Saúde',
        Educação: 'Educação',
        Transporte: 'Transporte',
        Alimentação: 'Alimentação',
        Outros: 'Outros',
    };

    const validar = !!tiposGasto[tipo];
    const nameIcone = validar ? 'cash-minus' : 'cash-plus';
    const iconeCor = validar ? 'red' : 'green';

    return (
        <View style={styles.body}>
            <Text style={[styles.texto, { color: theme.textColor }]}>{texto}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name={nameIcone} size={28} color={iconeCor} />
                <Text style={[styles.valor, { color: theme.textColor }]}>{formatarValor(valor)}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    texto: {
        fontSize: 18,
        fontWeight: '600',
    },
    valor: {
        fontSize: 16,
        fontWeight: '600',
        marginVertical: 10,
        marginLeft: 2,
    },
});
