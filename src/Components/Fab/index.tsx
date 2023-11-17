import * as React from 'react';
import { View } from 'react-native';
import { FAB, Portal, Provider } from 'react-native-paper';
import { useTheme } from '../ThemeContext';

const Fab = () => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }:any) => setState({ open });
  const { open } = state;
  const { theme, toggleTheme } = useTheme();

  return (
    <Provider>
      <Portal>
        <FAB.Group
        fabStyle={{backgroundColor: 'white',}}
          open={open}
          visible={true}
          backdropColor='transparent'
          icon={open ? 'arrow-down' : 'arrow-up'}
          actions={[
            { icon: 'plus', onPress: () => console.log('Pressed add') },
            { icon: 'email', onPress: () => console.log('Pressed email') },
          ]}
          onStateChange={onStateChange}
        />
      </Portal>
    </Provider>
  );
};

export default Fab;
