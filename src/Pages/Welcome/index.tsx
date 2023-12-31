import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions, Platform, ScrollView } from 'react-native';
import LottieView from 'lottie-react-native';
import { useDispatch } from 'react-redux';
import { User } from '../../Redux/Actions';
import { navigationProps } from '../../types/Navigation';
import { RFValue } from 'react-native-responsive-fontsize';
import { collors } from '../../Styles/themes';
import { MyAlert } from '../../Components/Alert';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Welcome = () => {
    const navigation: navigationProps = useNavigation();
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const handleContinue = async () => {
        try {
            if (name) {
                dispatch(User(name, ''));
                navigation.navigate('Home');
            } else {
                MyAlert(300, 'Por favor, insira seu nome para continuar.');
            }
        } catch {
            MyAlert(500, 'Erro ao salvar nome do Usuário.');
        }
    };

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <Image style={styles.logoTipo} source={require('../../Assets/imgs/NGastoBranco.png')} />
                <Text style={styles.title}>Bem-vindo ao NGasto</Text>
                <Text style={styles.subtitle}>Controle seus gastos e lucros com facilidade.</Text>
                <LottieView loop autoPlay style={styles.animation} source={require('../../Assets/imgs/Animation.json')} />

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Como gostaria de ser chamado(a)?</Text>
                    <TextInput style={styles.input} placeholderTextColor={collors.lightGrey} placeholder="Nome" value={name} onChangeText={setName} />
                    <Text style={styles.offlineInfo}>
                        Seus dados são armazenados localmente para uso offline, garantindo sua privacidade e segurança
                    </Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleContinue}>
                    <Text style={styles.textButton}>Vamos lá</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: collors.lightBlue,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logoTipo: {
        width: width * 0.1,
        height: height * 0.06,
        alignSelf: 'flex-end',
        marginBottom: 10,
    },
    title: {
        alignSelf: 'flex-start',
        fontSize: RFValue(21),
        fontFamily: 'Fredoka-Medium',
        color: collors.white,
    },
    subtitle: {
        alignSelf: 'flex-start',
        fontSize: RFValue(12),
        fontFamily: 'Fredoka-Regular',
        color: collors.white,
    },
    animation: {
        alignSelf: 'center',
        width: width * 0.9,
        height: height * 0.35,
        marginVertical: 8,
    },
    inputContainer: {
        width: '100%',
        marginVertical: 20,
    },
    label: {
        alignSelf: 'center',
        fontSize: RFValue(13),
        fontFamily: 'Fredoka-Regular',
        color: collors.white,
        marginBottom: 10,
    },
    input: {
        width: width * 0.8,
        height: height * 0.06,
        borderRadius: 8,
        paddingLeft: 10,
        fontSize: RFValue(12),
        backgroundColor: collors.white,
        color: collors.lightGrey,
        fontFamily: 'Fredoka-Regular',
        borderColor: 'transparent',
        alignSelf: 'center',
        ...Platform.select({
            android: {
                elevation: 1,
            },
        }),
    },
    offlineInfo: {
        width: width * 0.89,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: RFValue(10),
        color: collors.white,
        fontFamily: 'Fredoka-Regular',
        marginTop: 10,
        marginBottom: 30,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.8,
        height: 42,
        backgroundColor: collors.green,
        borderRadius: 8,
        ...Platform.select({
            android: {
                elevation: 2,
            },
        }),
    },
    textButton: {
        fontSize: RFValue(15),
        color: collors.white,
        fontFamily: 'Fredoka-Regular',
    },
});

export default Welcome;
