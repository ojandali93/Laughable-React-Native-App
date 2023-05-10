import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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
        component={HomeScreen} />
      <Tab.Screen 
        name="Search" 
        key='Search'
        component={SearchScreen} />
      <Tab.Screen 
        name="Profile"
        key='Profile'
        component={ProfileStackNavigation} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigation