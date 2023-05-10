import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from 'react-native-vector-icons'


import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ProfileStackNavigation from './ProfileStackNavigation';

const Tab = createBottomTabNavigator();

function BottomTabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Enjoy A Laugh" 
        key='Home'
        component={HomeScreen} 
        options={{
          tabBarIcon: ({size, color}) => (<Feather name={"smile"} color={color} size={size} />)
        }}/>
      <Tab.Screen 
        name="Search" 
        key='Search'
        component={SearchScreen} 
        options={{
          tabBarIcon: ({size, color}) => (<Feather name={"search"} color={color} size={size} />)
        }}/>
      <Tab.Screen 
        name="Profile"
        key='Profile'
        component={ProfileStackNavigation} 
        options={{
          tabBarIcon: ({size, color}) => (<Feather name={"user"} color={color} size={size} />)
        }}/>
    </Tab.Navigator>
  );
}

export default BottomTabNavigation