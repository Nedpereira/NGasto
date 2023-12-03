import * as React from 'react';
import { FAB as Menu, Portal, Provider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const Fab = () => {
    const [state, setState] = React.useState({ open: false });
    const navigation: any = useNavigation();
    const onStateChange = ({ open }: any) => setState({ open });
    const { open } = state;

    return (
        <Provider>
            <Portal>
                <Menu.Group
                    fabStyle={{ backgroundColor: 'white' }}
                    style={{
                        flex: 1,
                        alignItems: 'flex-start',
                        position: 'absolute',
                        right: 0,
                        left: 10,
                        bottom: 30,
                    }}
                    open={open}
                    visible={true}
                    backdropColor="transparent"
                    icon={open ? 'arrow-down' : 'arrow-up'}
                    actions={[{ icon: 'plus', onPress: () => navigation.navigate('addcard') }]}
                    onStateChange={onStateChange}
                />
            </Portal>
        </Provider>
    );
};

export default Fab;
