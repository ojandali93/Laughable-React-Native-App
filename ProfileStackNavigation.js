import { createStackNavigator } from '@react-navigation/stack'
import ProfileScreen from './src/screens/ProfileScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';

const StackNav = createStackNavigator();

const ProfileStackNavigation = () => {
  return (
    <StackNav.Navigator screenOptions={{headerShown: false}}>
      <StackNav.Screen name="ProfileScreen" component={ProfileScreen}/>
      <StackNav.Screen name="LoginScreen" component={LoginScreen}/>
      <StackNav.Screen name="SignupScreen" component={SignupScreen}/>
    </StackNav.Navigator>
  )
}

export default ProfileStackNavigation