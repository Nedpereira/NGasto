import { StyleSheet, Text, Dimensions, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Card from '../Card';
import { RFValue } from 'react-native-responsive-fontsize';

type BalanceCardProps = {
    balance?: number;
    name: string;
    type: string;
    icon: string;
};

const { width, height } = Dimensions.get('window');

export const BalanceCard = ({ balance, name, type, icon }: BalanceCardProps) => {
    const isProfit = type === 'Lucro';
    const color = isProfit ? '#28A745' : '#CA143F';

    console.log(isProfit);

    return (
        <Card style={styles.card}>
            <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'center'}}>
                <View style={{alignSelf: 'center', width: 60, backgroundColor: 'red'}}>
                    <Icon name={icon} size={32} color={color} />
                </View>
                <View style={{alignSelf: 'center' ,justifyContent: 'space-between',  height: 60}}>
                    <View style={styles.content_balance}>
                        <Text style={styles.balance}>R$</Text>
                        <Text style={[styles.balance, { color }]}>{balance}</Text>
                    </View>
                    <View>
                        <Text style={[styles.name]}>{name}</Text>
                    </View>
                </View>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        width: width * 0.42,
        height: height * 0.1,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
    },
    content_balance: {
        flexDirection: 'row',
    },
    balance: {
        fontSize: RFValue(14),
        fontFamily: 'Fredoka-Medium',
    },
    name: {
        fontSize: RFValue(16),
        fontFamily: 'Fredoka-Medium',
    },
});
