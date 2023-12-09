import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { Tag } from '../Tag';
import { formatarValor } from '../../Utils/FormatarValor';
import { customCardColors } from '../../Styles/themes';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

type CustomCardProps = {
    id: number;
    tag?: 'Casa' | 'Lazer' | 'Saúde' | 'Educação' | 'Transporte' | 'Alimentação' | 'Outros' | 'Salario' | 'Beneficio' | 'Freelance';
    descricao?: string;
    valor?: number;
    onCardDelete?: (id: number) => void;
};

const CustomCard = ({ id, tag = 'Outros', descricao, valor = 0, onCardDelete }: CustomCardProps) => {

    const navigation: any = useNavigation();

    const tiposGasto: any = {
        Casa: 'Casa',
        Lazer: 'Lazer',
        Saúde: 'Saúde',
        Educação: 'Educação',
        Transporte: 'Transporte',
        Alimentação: 'Alimentação',
        Outros: 'Outros',
    };

    const validar = !!tiposGasto[tag];
    const iconeCor = validar ? '#CA143F' : '#28A745';

    return (
        <TouchableOpacity onPress={() => navigation.navigate('Addcard', { typeCard: 'edit', id: id })}>
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Tag tipo={tag} />
                    <TouchableOpacity onPress={() => onCardDelete?.(id)}>
                        <Icon name="close" size={20} color={'black'} />
                    </TouchableOpacity>
                </View>
                <View style={styles.cardBody}>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.descricao}>
                        {descricao}
                    </Text>
                    <Text style={[styles.value, { color: iconeCor }]}>{formatarValor(valor)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default CustomCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: customCardColors.backgroundColor,
        borderRadius: 8,
        padding: 8,
        marginVertical: 5,
        width: width - 32,
        height: height * 0.12,
        ...Platform.select({
            android: {
                elevation: 2,
            },
        }),
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    cardBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    descricao: {
        fontSize: RFValue(13),
        fontFamily: 'Fredoka-Light',
        color: customCardColors.descricao,
        width: width * 0.6,
    },
    value: {
        fontSize: RFValue(12),
        color: customCardColors.value,
        marginLeft: 4,
    },
});
