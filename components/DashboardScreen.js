import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import {AsyncStorage} from 'react-native';

export default class DashboardScreen extends Component {
  _isSignedIn = async () => {
    try {
      const value = await AsyncStorage.getItem('USER');
      if (value !== null) {
        // We have data!!
        console.log('data che....'+value);
      }
      else{
        console.log('----value set nahi...');
        this.props.navigation.navigate('Welcome');
      }
    } catch (error) {
      // Error retrieving data
      console.log('exeptn aai -----');
    }
  }
  
  _logout = async () => {
    try {
      await AsyncStorage.removeItem('USER');
      this.props.navigation.navigate('Welcome');
    } catch (error) {
      // Error saving data
    }
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
        <Text> </Text>
        <Button title="Log Out" onPress={this._logout} />
      </View>
    )
  }
}
