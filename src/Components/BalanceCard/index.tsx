import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { balanceColors } from '../../Styles/themes';

const { width, height } = Dimensions.get('window');

type BalanceCardProps = {
    balance?: number;
    name: string;
    type: string;
    icon: string;
};

export const BalanceCard = ({ balance = 0, name, type, icon }: BalanceCardProps) => {
    const isProfit = type === 'Lucro';
    const color = isProfit ? '#28A745' : '#CA143F';

    return (
        <View style={styles.card}>
            <View style={styles.iconContainer}>
                <Icon name={icon} size={RFValue(26)} color={color} />
            </View>
            <View style={styles.textContainer}>
                <Text style={[styles.balance, { color }]}>R$ {balance.toFixed(2)}</Text>
                <Text style={styles.name}>{name}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: width * 0.42,
        height: height * 0.1,
        backgroundColor: balanceColors.backgroundColor,
        borderRadius: 8,
        padding: 10,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    balance: {
        fontSize: RFValue(12),
        fontFamily: 'Fredoka-Medium',
        alignSelf: 'center',
    },
    name: {
        fontSize: RFValue(12),
        fontFamily: 'Fredoka-Medium',
        color: balanceColors.text,
        alignSelf: 'center',
    },
});

export default BalanceCard;
