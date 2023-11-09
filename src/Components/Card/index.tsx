import React from "react";
import { View, StyleSheet } from "react-native"; 

type CardProps = {
    children?: React.ReactNode;
}

function Card({ children }: CardProps) {
    return (
        <View style={styles.card}>
            {children}
        </View>
    );
}

export default Card;


const styles = StyleSheet.create({
    card: {
      backgroundColor: 'white',
      minWidth: '100%',
      padding: 10,
      borderWidth: 0.3,
      borderRadius: 8,
      shadowOpacity: 0.20,
      shadowColor: 'black',
      shadowOffset: { height: 0, width: 0 },
    },
  });