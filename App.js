import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { 
          createSwitchNavigator,
          createAppContainer,
        } from 'react-navigation';

import WelcomeScreen from './components/WelcomeScreen';
import DashboardScreen from './components/DashboardScreen';

// TODO:
// redirect user to dashboard if already in AsyncStorage

const AppSwitchNavigator = createSwitchNavigator({
  Welcome: {screen: WelcomeScreen},
  Dashboard: {screen: DashboardScreen}
}, {
  initialRouteName: "Welcome"
});

const AppContainer = createAppContainer(AppSwitchNavigator);
class App extends React.Component {




  render() {
    return (
      <AppContainer/>
    );
  }
}

export default App;
