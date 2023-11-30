import { NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
    Home: undefined;
    Welcome: undefined;
};

export type navigationProps = {
    navigation: NavigationProp<RootStackParamList>;
};
