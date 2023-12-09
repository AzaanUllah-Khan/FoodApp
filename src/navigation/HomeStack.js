import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Home from '../screens/Home';
import History from '../screens/User';

const Stack = createNativeStackNavigator()

export default function HomeStack() {
  return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name='Profile' component={User} />
        </Stack.Navigator>
  );
}