import React, { Component } from 'react';
import { Text, View, Button, AsyncStorage } from 'react-native';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import { 
  createStackNavigator,
  createAppContainer,

} from 'react-navigation';



class WelcomeScreen extends Component {
  _isSignedIn = async () => {
    // try {
      const value = await AsyncStorage.getItem('USER');
      if (value !== null) {
        // We have data!!
        console.log('data che....'+value);
        this.props.navigation.navigate('Dashboard');
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

  static navigationOptions = ({ navigation }) => {
    return{
      title: "Welcome !!!",
    }
  };
  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Text> Welcome!!! </Text>
          <Text>  </Text>
          <Button title="Login" onPress={() => this.props.navigation.navigate('SignIn')} />
          <Text>  </Text>
          <Button title="Sign Up" onPress={() => this.props.navigation.navigate('SignUp')} />
      </View>
    )
  }
}
const AuthStack = createStackNavigator(
  { 
    Home: {
      screen: WelcomeScreen,
      navigationOptions: {
        title: 'Home',
        header: null //this will hide the header
      },
    },
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
  },   
  {
    initialRouteName: "Home"
  }
  );
export default createAppContainer(AuthStack);
