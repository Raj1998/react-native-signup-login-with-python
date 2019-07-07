import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Button } from 'react-native'
import {AsyncStorage} from 'react-native';
import {BASE_URL} from './meta.js';

export default class SignInScreen extends Component {
    state = {
        email: '',
        password: ''
    }
    constructor(props) {
        super(props);
        // this.state = {email: ''};
        // this.state = {password: ''};
    }

    _storeData = async () => {
        try {
          await AsyncStorage.setItem('USER', 'Raju');
        } catch (error) {
          // Error saving data
        }
      };
    _remData = async () => {
        try {
          await AsyncStorage.removeItem('USER');
        } catch (error) {
          // Error saving data
        }
      };

      _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('TASKS');
          if (value !== null) {
            // We have data!!
            alert('data che....'+value);
            console.log('data che....'+value);
          }
          else{
            console.log('else che');
          }
        } catch (error) {
          // Error retrieving data
          alert('no data of the key');
          console.log('no data of the key');
        }
      };

    static navigationOptions = ({ navigation }) => {
        return{
            title: "SignIn",
        }
    };

    test = () => {
        fetch(BASE_URL+"login", {
            method: 'POST',
            
            headerss: {
                'Accept': 'application/json',
                "Content-Type": "application/json",                
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
            .then((resp)=>{
                return resp.json();
            })
            .then((jsonData) => {
                console.log(JSON.stringify(jsonData));
                if(jsonData['result'] == true){
                    AsyncStorage.setItem('USER', jsonData.user);
                    AsyncStorage.setItem('TOKEN', jsonData.token);
                    alert("You are: "+jsonData['user']);
                    this.props.navigation.navigate('Dashboard');
                }
                else{
                  alert("Wrong uername/password. Try again");
                }
            })
            .catch((e)=>{
                console.log(e);
            })

    }

    tester = () => {
        this.props.navigation.navigate('Dashboard');
    }
    set = () => {
        this._storeData();
    }
    rem = () => {
        this._remData();
    }

  render() {
    return(
        <View style={{flex:1, backgroundColor: '#6AB04A', paddingTop:200 }}>
          <TextInput style = {styles.input} 
                  autoCapitalize="none" 
                  onSubmitEditing={() => this.passwordInput.focus()} 
                  onChangeText={(text) => this.setState({email: text})}
                  autoCorrect={false} 
                  keyboardType='email-address' 
                  returnKeyType="next" 
                  placeholder='Email' 
                  placeholderTextColor='rgba(225,225,225,0.7)'/>
  
          <TextInput style = {styles.input}   
                        returnKeyType="go" 
                        ref={(input)=> this.passwordInput = input} 
                        placeholder='Password' 
                        onChangeText={(text) => this.setState({password: text})}
                        placeholderTextColor='rgba(225,225,225,0.7)' 
                        secureTextEntry/>
  
          <TouchableOpacity style={styles.buttonContainer} 
                              onPress={this.test} >
                      <Text  style={styles.buttonText}>LOGIN</Text>                    
          </TouchableOpacity> 

        {/* <Text></Text>
        <Button title="Test db btn" onPress={this.test} />
        <Text></Text> */}
        <Button title="Try to go to dashboard" onPress={this.tester} />
        <Text></Text>
        <Button title="Set item" onPress={this.set} />
        <Text></Text>
        <Button title="remove item" onPress={this.rem} />
        <Text></Text>
          
          
        </View>
      );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input:{
      height: 40,
      backgroundColor: 'rgba(225,225,225,0.2)',
      marginBottom: 10,
      padding: 10,
      marginHorizontal: 20 ,
      color: '#fff'
    },
    buttonContainer:{
        backgroundColor: '#218F76',
        marginHorizontal: 20 ,
        paddingVertical: 15
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    }
  });