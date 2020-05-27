import { createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer} from '@react-navigation/native';
import Incidents from './pages/incidents';
import Detail from './pages/detail';
import React from 'react';


const appStack = createStackNavigator();//primeira navegacao criada, aqui dentro carrego nossas rotas

export default function Routes(){
    return(
        <NavigationContainer>

            <appStack.Navigator screenOptions={{headerShown: false }}> 

                <appStack.Screen name="Incidents" component= {Incidents} />
                <appStack.Screen name="Detail" component= {Detail}/>
                
            </appStack.Navigator>

        </NavigationContainer>
    );
}