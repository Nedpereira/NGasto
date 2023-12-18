import LottieView from 'lottie-react-native';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { collors } from '../../Styles/themes';
import { useSelector } from 'react-redux';
import { navigationProps } from '../../types/Navigation';
import { useNavigation } from '@react-navigation/native';
import { userProps } from '../../types/AllTypes';

const { width, height } = Dimensions.get('window');

function SplashScreen() {
    const navigation: navigationProps = useNavigation();
    const animation = useRef(null);
    const { name } = useSelector((state: userProps) => state.user);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (name) {
                navigation.navigate('Home');
            } else {
                navigation.navigate('Welcome');
            }
        }, 2600);

        return () => clearTimeout(timer);
    }, [name]);

    return (
        <View style={styles.container}>
            <LottieView autoPlay ref={animation} style={styles.lottie} source={require('../../Assets/imgs/NGasto.json')} />
        </View>
    );
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: collors.darkGrey,
    },
    lottie: {
        width: width * 0.6,
        height: height * 0.6,
    },
});
