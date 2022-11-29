import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Main from './components/Main'
import List from './components/List'
import Map from './components/Map'

const Stack = createNativeStackNavigator()
export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer style={{ flex: 1 }}>
        <Stack.Navigator>
          <Stack.Screen name='Main' component={Main} options={{ headerShown: false }} />
          <Stack.Screen name='List' component={List} options={{ headerStyle: { backgroundColor: '#3f51b5' }, headerTintColor: 'white', title: 'Position panel' }} />
          <Stack.Screen name='Map' component={Map} options={{ headerStyle: { backgroundColor: '#3f51b5' }, headerTintColor: 'white', title: 'Localization on map' }}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
