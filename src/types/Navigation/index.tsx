import { NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
    Home: undefined;
    Welcome: undefined;
    SplashScreen: undefined;
    EditUser: undefined;
};

export type navigationProps = {
    goBack(): void;
    navigate(arg0: string): unknown;
    navigation: NavigationProp<RootStackParamList>;
};
