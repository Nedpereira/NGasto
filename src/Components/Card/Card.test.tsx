import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Card from './index';
import { ThemeProvider } from '../ThemeContext';
import { Text, View, Button } from 'react-native';

describe('Card Component', () => {
  it('renders Text component correctly', () => {
    const { getByText } = render(
      <ThemeProvider>
        <Card>
          <Text>Test Child</Text>
        </Card>
      </ThemeProvider>
    );

    expect(getByText('Test Child')).toBeTruthy();
  });

  it('renders Button correctly and responds to press', () => {
    const onPressMock = jest.fn();
    const { getByRole } = render(
      <ThemeProvider>
        <Card>
          <Button title="Test Button" onPress={onPressMock} />
        </Card>
      </ThemeProvider>
    );

    const button = getByRole('button', { name: 'Test Button' });
    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalled();
  });

  it('renders View correctly', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Card>
          <View testID="custom-view">
            <Text>View Content</Text>
          </View>
        </Card>
      </ThemeProvider>
    );

    expect(getByTestId('custom-view')).toBeTruthy();
  });
});

