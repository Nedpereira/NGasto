import * as React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/Pages/Home';
import AddCard from './src/Components/AddCard';
import SplashScreen from './src/Pages/Splash-Screen';
import { store, persistor } from './src/Redux/Store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Welcome from './src/Pages/Welcome';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import Overview from './src/Pages/Overview';
import EditUser from './src/Pages/Edit-User';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <AlertNotificationRoot>
                        <NavigationContainer>
                            <Stack.Navigator screenOptions={{ headerShown: false }}>
                                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                                <Stack.Screen name="Welcome" component={Welcome} />
                                <Stack.Screen name="Home" component={Home} />
                                <Stack.Screen name="Addcard" options={{ presentation: 'modal' }} component={AddCard} />
                                <Stack.Screen name="Overview" component={Overview} />
                                <Stack.Screen name="EditUser" options={{ presentation: 'modal' }} component={EditUser} />
                            </Stack.Navigator>
                        </NavigationContainer>
                </AlertNotificationRoot>
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
