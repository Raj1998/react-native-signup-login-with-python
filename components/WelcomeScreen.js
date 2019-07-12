import React, { Component } from 'react';
import { Text, StyleSheet, View, Button, AsyncStorage } from 'react-native';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import { 
  createStackNavigator,
  createAppContainer,

} from 'react-navigation';

import * as Expo from "expo";
// import Expo from 'expo';   // this didn't worked (this was from expo's documentation)

import {BASE_URL} from './meta.js';

class WelcomeScreen extends Component {

  sendData = (idToken, email, name, image_url) => {
    fetch(BASE_URL+"googlelogin", {
        method: 'POST',
        
        headerss: {
            'Accept': 'application/json',
            "Content-Type": "application/json",                
        },
        body: JSON.stringify({
            idToken: idToken,
            email: email,
            name: name,
            image_url: image_url
        })
    })
        .then((resp)=>{
            return resp.json();
        })
        .then((jsonData) => {
            console.log(JSON.stringify(jsonData));
            if(jsonData['result'] == true){
                AsyncStorage.setItem('USER', jsonData.user);
                // AsyncStorage.setItem('TOKEN', jsonData.token);
                alert("You are: "+jsonData['user']);
                this.props.navigation.navigate('Dashboard');
            }
            else{
              alert("Something went wrong. Try again");
            }
        })
        .catch((e)=>{
            console.log(e);
        })
  }

  signInWithGoogleAsync = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: "182143099738-lkujdpt6rl0ooed49fprsu3f1rdnirm3.apps.googleusercontent.com",
        // add iosClientId if needed
        scopes: ['profile', 'email'],
      });
  
      if (result.type === 'success') {
        console.log("succesful google signin");
        var idToken = result.idToken;
        var email = result.user.email;
        var name = result.user.name;
        var id = result.user.id;
        var img_url = result.user.photoUrl;
        
        this.sendData(idToken, email, name, img_url)

        console.log(result)
        return result.accessToken;
      } else {
        console.log("cancelled");
        alert("Sign In cancelled");
        return { cancelled: true };
      }
    } catch (e) {
      console.log("Exception"+e);
      alert("Something went wrong... try again");
      return { error: true };
    }
  }

  _isSignedIn = async () => {
    try {
      const value = await AsyncStorage.getItem('USER');
      if (value !== null) {
        // We have data!!
        console.log('WelcomeScreen - AsyncStorage key - USER found -'+value);
        this.props.navigation.navigate('Dashboard');
      }
    } catch (error) {
      // Error retrieving data
      console.log('exeptn in _isSignedIn method.');
    }
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
        backgroundColor: '#6AB04A',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
        <Text style={{fontSize: 25, color: '#fff'}}> Welcome !!! </Text>
          <Text></Text>
          <View style={styles.buttonLayout} >
            <Button title="Login " color="#218F76" onPress={() => this.props.navigation.navigate('SignIn')} />
          </View>

          
          <View style={styles.buttonLayout} >
            <Button title="Sign Up " color="#218F76" onPress={() => this.props.navigation.navigate('SignUp')} />
          </View>
          
        
          <View style={styles.buttonLayout} >
            <Button title="Google  " color="#218F76" onPress={this.signInWithGoogleAsync} />
          </View>


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
    SignIn : SignInScreen,
    SignUp : SignUpScreen,
  },   
  {
    initialRouteName: "Home"
  }
  );

const styles = StyleSheet.create({
  buttonLayout:{
        marginHorizontal: 20,
        marginVertical: 5,
        width: 150,
  }
});

export default createAppContainer(AuthStack);
