import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Home from '../screens/Home';
import User from '../screens/User';
import AllFoods from '../screens/AllFoods';
import ChangeDetail from '../screens/ChangeDetail';

const Stack = createNativeStackNavigator()

export default function HomeStack() {
  return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name='Profile' component={User}/>
            <Stack.Screen name='All' component={AllFoods} options={{headerShown:true}}/>
            <Stack.Screen name='Update Details' component={ChangeDetail} options={{headerShown:true}}/>
        </Stack.Navigator>
  );
}