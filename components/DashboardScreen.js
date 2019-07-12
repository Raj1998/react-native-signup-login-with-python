import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import {AsyncStorage} from 'react-native';

export default class DashboardScreen extends Component {
  _isSignedIn = async () => {
    try {
      const value = await AsyncStorage.getItem('USER');
      if (value !== null) {
        // We have data!!
        console.log('DashboardScreen - AsyncStorage key - USER found -'+value);
        this.setState({user: value});  
      }
      else{
        console.log('DashboardScreen - AsyncStorage is empty');
        this.props.navigation.navigate('Welcome');
      }
    } catch (error) {
      // Error retrieving data
      console.log('DashboardScreen - exeptn');
    }
  }
  
  _logout = async () => {
    try {
      await AsyncStorage.clear();
      this.props.navigation.navigate('Welcome');
    } catch (error) {
      // Error saving data
    }
  }

  state = {
    user : "-"
  }

  constructor() {
    super();
    this._isSignedIn();
    

  }

  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Text> Dashboard Screen </Text>
        <Text> USER: {this.state.user}</Text>
        <Text> </Text>
        <Button title="Log out " onPress={this._logout} />
      </View>
    )
  }
}
