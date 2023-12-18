import { View, Platform, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { collors } from '../../Styles/themes';
import { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { navigationProps } from '../../types/Navigation';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../../Redux/Actions';
import { MyAlert } from '../../Components/Alert';
import { userProps } from '../../types/AllTypes';

export default function EditUser() {
    const navigation: navigationProps = useNavigation();
    const dispatch = useDispatch();
    const { name, photo } = useSelector((state: userProps) => state.user);
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [newName, setNewName] = useState<string>(name);
    const validatePhoto = imageUri ?? photo;

    const selectImageFromGallery = async () => {
        const result = await launchImageLibrary({
            mediaType: 'photo',
            quality: 1,
        });

        if (result.assets && result.assets.length > 0 && result.assets[0].uri) {
            setImageUri(result?.assets[0]?.uri);
        } else {
            setImageUri(null);
        }
    };

    const ChangeUser = async () => {
        try {
            dispatch(User(newName || name, imageUri || photo));
            MyAlert(200, 'Usuário editado com sucesso!');
            navigation.goBack();
        } catch {
            MyAlert(500, 'Não foi possível editar o usuário, tente novamente!');
        }
    };

    return (
        <View style={styles.centeredView}>
            <Icon style={styles.goBack} name="arrow-back-ios" onPress={() => navigation.goBack()} size={RFValue(20)} color="white" />
            <Text style={styles.title}>Editar Perfil</Text>
            <View style={styles.modalView}>
                <TouchableOpacity style={styles.contenxtImage} onPress={selectImageFromGallery}>
                    <Image
                        source={validatePhoto ? { uri: validatePhoto } : require('../../Assets/imgs/user-default.png')}
                        style={validatePhoto ? styles.image : styles.newImageStyle}
                    />
                    <Text style={styles.information}>Clique na imagem acima para alterar sua foto de perfil.</Text>
                </TouchableOpacity>
                <TextInput
                    style={styles.inputName}
                    placeholderTextColor={collors.coldGray}
                    contentStyle={styles.inputNamePlaceholder}
                    theme={{ colors: { primary: '#17A2B8' } }}
                    value={newName}
                    placeholder="Digite seu novo nome"
                    onChangeText={(text: string) => setNewName(text)}
                />
                <TouchableOpacity style={styles.button} onPress={ChangeUser}>
                    <Text style={styles.text}>Alterar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    modalView: {
        width: '90%',
        flexDirection: 'column',
        marginVertical: 20,
        backgroundColor: collors.white,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        shadowColor: collors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        ...Platform.select({
            android: {
                elevation: 4,
            },
        }),
    },
    goBack: {
        position: 'absolute',
        top: 30,
        left: 20,
    },
    inputName: {
        width: '90%',
        height: 40,
        backgroundColor: collors.white,
        borderRadius: 5,
        paddingHorizontal: 10,
        borderColor: collors.black,
        borderWidth: 0.5,
        marginBottom: 10,
        ...Platform.select({
            android: {
                elevation: 6,
            },
        }),
    },
    inputNamePlaceholder: {
        fontSize: RFValue(11),
        color: collors.coldGray,
        fontFamily: 'Fredoka-Medium',
    },
    contenxtImage: {
        alignItems: 'center',
        marginVertical: 30,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 50,
        resizeMode: 'cover',
    },
    newImageStyle: {
        width: 60,
        height: 60,
        borderRadius: 50,
        resizeMode: 'cover',
    },
    text: {
        color: collors.white,
        fontFamily: 'Fredoka-Medium',
        fontSize: RFValue(11),
    },
    button: {
        width: 100,
        height: 38,
        backgroundColor: '#2CBD4D',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 10,
        ...Platform.select({
            android: {
                elevation: 1,
            },
        }),
    },
    title: {
        color: collors.white,
        fontFamily: 'Fredoka-Medium',
        fontSize: RFValue(12),
    },
    information: {
        width: 300,
        color: collors.coldGray,
        fontFamily: 'Fredoka-Medium',
        fontSize: RFValue(10),
        textAlign: 'center',
    },
});
