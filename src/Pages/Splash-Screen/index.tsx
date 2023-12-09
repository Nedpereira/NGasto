import LottieView from 'lottie-react-native';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { splashColors } from '../../Styles/themes';
import { useSelector } from 'react-redux';
import { navigationProps } from '../../types/Navigation';

const { width, height } = Dimensions.get('window');

function SplashScreen({ navigation }: Readonly<navigationProps>) {
    const animation = useRef(null);
    const nameUser = useSelector((state: any) => state.name);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (nameUser) {
                navigation.navigate('Home');
            } else {
                navigation.navigate('Welcome');
            }
        }, 2600);

        return () => clearTimeout(timer);
    }, [nameUser]);

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
        backgroundColor: splashColors.backgroundColor,
    },
    lottie: {
        width: width * 0.6,
        height: height * 0.6,
    },
});
