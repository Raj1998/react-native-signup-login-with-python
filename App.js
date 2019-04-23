import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
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

  _isSignedIn = async () => {
    // try {
      const value = await AsyncStorage.getItem('USER');
      if (value !== null) {
        // We have data!!
        console.log('data che....'+value);
        // this.props.navigation.navigate('Dashboard');
      }
    // } catch (error) {
    //   // Error retrieving data
    //   console.log('exeptn aai -----');
    // }
  }

  constructor(){
    super();
    this._isSignedIn();
  }

  render() {
    return (
      <AppContainer/>
    );
  }
}

export default App;
