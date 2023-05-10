import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import MostPopularScreen from './src/screens/MostPopularScreen';

const Tab = createBottomTabNavigator();

function BottomTabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home" 
        key='Home'
        component={HomeScreen} />
      <Tab.Screen 
        name="Search" 
        key='Search'
        component={SearchScreen} />
      <Tab.Screen 
        name="Popular"
        key='Popular'
        component={MostPopularScreen} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigation