import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../ThemeContext';

type CardProps = {
    children?: React.ReactNode;
};

function Card({ children }: Readonly<CardProps>) {
    const { theme } = useTheme();

    return <View style={[styles.card, { backgroundColor: theme.card }]}>{children}</View>;
}

export default Card;

const styles = StyleSheet.create({
    card: {
        width: '100%',
        maxWidth: 340,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 5,
        borderWidth: 0.2,
        borderRadius: 8,
        shadowOpacity: 0.2,
        shadowColor: 'black',
        shadowOffset: { height: 0, width: 0 },
    },
});
