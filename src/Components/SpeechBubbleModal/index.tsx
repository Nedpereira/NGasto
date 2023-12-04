import React, { useState } from 'react';
import { Modal, View, TextInput, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { bubbleModal } from '../../Styles/themes';

type SpeechBubbleModalProps = {
    isVisible: boolean;
    onClose: () => void;
    onSubmit: (text: string) => void;
};

const { width, height } = Dimensions.get('window');

const SpeechBubbleModal: React.FC<SpeechBubbleModalProps> = ({ isVisible, onClose, onSubmit }) => {
    const [inputText, setInputText] = useState<string>('');

    const handleOkPress = () => {
        onSubmit(inputText);
        setInputText('');
        onClose();
    };

    return (
        <Modal transparent={true} visible={isVisible} onRequestClose={onClose}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Icon name="close" size={20} color="#000" />
                    </TouchableOpacity>
                    <TextInput style={styles.input} onChangeText={setInputText} value={inputText} placeholder="Escolha seu novo nome" />
                        <Button rippleColor="transparent" labelStyle={styles.checkText} contentStyle={styles.checkButton} onPress={handleOkPress} >OK</Button>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modalView: {
        width: '90%',
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        shadowColor: bubbleModal.shadow,
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
    checkText: {
      color: bubbleModal.color,
      fontSize: RFValue(11),
      fontFamily: 'Fredoka-Regular',
    },
    checkButton: {
      marginRight: 20,
    },
    closeButton: {
      marginRight: 5,
    },
    input: {
        width: width * 0.7,
        height: height * 0.06,
        borderRadius: 8,
        paddingLeft: 10,
        fontSize: RFValue(12),
        backgroundColor: bubbleModal.backgroundColor,
        color: bubbleModal.placeholder,
        fontFamily: 'Fredoka-Regular',
        borderColor: 'transparent',
        alignSelf: 'center',
        ...Platform.select({
            android: {
                elevation: 1,
            },
        }),
    },
});

export default SpeechBubbleModal;
