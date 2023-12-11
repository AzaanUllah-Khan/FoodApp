import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';

const Stack = createNativeStackNavigator()

export default function MainNavigator() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="AuthStack" screenOptions={{headerShown:false,animation:"flip"}}>
            <Stack.Screen name="AuthStack" component={AuthStack} />
            <Stack.Screen name="HomeStack" component={HomeStack} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}