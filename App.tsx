import * as React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/Pages/Home';
import { ThemeProvider } from './src/Components/ThemeContext';
import Inicial from './src/Pages/Inicial';
import AddCard from './src/Pages/Add-Card';
import { store, persistor } from './src/Redux/Store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const Stack = createNativeStackNavigator();

export default function App() {
    const scheme = useColorScheme();

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider>
                    <NavigationContainer>
                        <Stack.Navigator screenOptions={{ headerShown: false }}>
                            <Stack.Screen name="inicial" component={Inicial} />
                            <Stack.Screen name="Home" component={Home} />
                            <Stack.Screen name="addcard" component={AddCard} />
                        </Stack.Navigator>
                    </NavigationContainer>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    );
}

const styles = StyleSheet.create({
    lightContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    darkContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#121212',
    },
});
