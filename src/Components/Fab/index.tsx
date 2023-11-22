import * as React from 'react';
import {View} from 'react-native';
import {FAB, Portal, Provider} from 'react-native-paper';
import {useTheme} from '../ThemeContext';
import {useNavigation} from '@react-navigation/native';

const Fab = () => {
  const [state, setState] = React.useState({open: false});
  const navigation: any = useNavigation();

  const onStateChange = ({open}: any) => setState({open});
  const {open} = state;
  const {theme, toggleTheme} = useTheme();

  return (
    <Provider>
      <Portal>
        <FAB.Group
          fabStyle={{backgroundColor: 'white'}}
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            left: 10,
          }}
          open={open}
          visible={true}
          backdropColor="transparent"
          icon={open ? 'arrow-down' : 'arrow-up'}
          actions={[
            {icon: 'plus', onPress: () => navigation.navigate('addcard')},
            // { icon: 'email', onPress: () =>  navigation.navigate('addcard') },
          ]}
          onStateChange={onStateChange}
        />
      </Portal>
    </Provider>
  );
};

export default Fab;
