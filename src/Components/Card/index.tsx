import React from 'react';
import { View } from 'react-native';

type CardProps = {
    children?: React.ReactNode;
    style?: any;
};

function Card({ children, style }: Readonly<CardProps>) {
    return <View style={style}>{children}</View>;
}

export default Card;
