import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Splash from '../screens/Splash';
import Auth from '../screens/Auth';

const Stack = createNativeStackNavigator()

export default function AuthStack() {
  return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Auth" component={Auth} />
        </Stack.Navigator>
  );
}