import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { GeneralContextProvider } from './src/GeneralContext';

import BottomTabNavigation from './BottomTabNavigation';

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <GeneralContextProvider>
          <StatusBar style="auto" /> 
          <BottomTabNavigation />
      </GeneralContextProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
