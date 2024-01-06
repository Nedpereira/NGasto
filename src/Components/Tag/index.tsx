import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type TagProps = {
    tipo: 'Casa' | 'Lazer' | 'Saúde' | 'Educação' | 'Transporte' | 'Alimentação' | 'Outros' | 'Salario' | 'Beneficio' | 'Pix';
};

const coresPorTipo = {
    Casa: '#DE245C',
    Lazer: '#FFD700',
    Saúde: '#FF6347',
    Educação: '#9B30FF',
    Transporte: '#FFA500',
    Alimentação: '#F4A460',
    Outros: '#BEBEBE',
    Salario: '#008000',
    Beneficio: '#FFA07A',
    Pix: '#3CB371',
};

const iconesPorTipo = {
    Casa: 'home',
    Lazer: 'gamepad',
    Saúde: 'heartbeat',
    Educação: 'book',
    Transporte: 'car',
    Alimentação: 'cutlery',
    Outros: 'ellipsis-h',
    Salario: 'money',
    Beneficio: 'institution',
    Pix: 'dollar',
};

export const Tag = ({ tipo }: TagProps) => {
    const corDeFundo = coresPorTipo[tipo];
    const icone: any = iconesPorTipo[tipo];

    return (
        <View style={[styles.tag, { backgroundColor: corDeFundo }]}>
            <FontAwesome name={icone} size={RFValue(15)} color="#fff" />
            <Text style={styles.texto}>{tipo}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    tag: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'baseline',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 5,
        marginRight: 8,
    },
    texto: {
        marginLeft: 10,
        color: '#fff',
        fontSize: RFValue(10),
        fontFamily: 'Fredoka-Medium',
    },
});
