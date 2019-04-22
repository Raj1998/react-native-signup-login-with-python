import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Button } from 'react-native'
import {AsyncStorage} from 'react-native';
import {BASE_URL} from './meta.js';


export default class SignInScreen extends Component {
    state = {
        email: '',
        password: '',
        password2: ''
    }
    constructor(props) {
        super(props);
    }    

    static navigationOptions = ({ navigation }) => {
        return{
            title: "Sign Up",
        }
    };

    test = () => {
        fetch("http://192.168.43.92:5000/signup", {
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
                // return resp.json();
            })
            // .then((jsonData) => {
            //     console.log(JSON.stringify(jsonData));
            //     if(jsonData['result'] == true){
            //         AsyncStorage.setItem('USER', jsonData.user);
            //         AsyncStorage.setItem('TOKEN', jsonData.token);
            //         this.props.navigation.navigate('Dashboard');
            //     }
            //     alert(jsonData['user']);
            // })
            .catch((e)=>{
                console.log(e);
            })

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

          <TextInput style = {styles.input}   
                        returnKeyType="go" 
                        ref={(input)=> this.passwordInput = input} 
                        placeholder='Password Again' 
                        onChangeText={(text) => this.setState({password2: text})}
                        placeholderTextColor='rgba(225,225,225,0.7)' 
                        secureTextEntry/>
  
          <TouchableOpacity style={styles.buttonContainer} 
                              onPress={this.test} >
                      <Text  style={styles.buttonText}>Register</Text>                    
          </TouchableOpacity> 
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