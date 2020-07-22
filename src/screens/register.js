import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    TextInput,
    ScrollView,
    Dimensions,
    Alert,
    ActivityIndicator,
    Text,
    Image,
    TouchableOpacity
  } from 'react-native';

import logo from '../assets/chap.png'

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default class Register extends Component {
  render (){
    return (
      <ScrollView>
      <View style={styles.parent}>
        <Image source={logo} style={styles.image}/>
        <Text style={styles.title}>Create your Chapp account</Text>
        <View style={styles.btnWrapper}>
          <View style={styles.inputWraper}>
            <TextInput
              placeholder='Username'
              style={styles.input} onChangeText={(e) => this.setState({username: e})}/>
            <TextInput
              placeholder='Email'
              style={styles.input} onChangeText={(e) => this.setState({email: e})}/>
            <TextInput
              placeholder='Password'
              secureTextEntry={true}
              style={styles.input} onChangeText={(e) => this.setState({password: e})}/>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.text}>REGISTER</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.linkWraper}>
            <Text >Have an account ?</Text>
            <Text style={styles.title} onPress={() => this.props.navigation.navigate('login')}> Login here</Text>
          </View>
        </View>
      </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    height: deviceHeight,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff8e7'
  },
  text: {
    color: '#fff8e7',
    fontSize: 20,
  },
  btnWrapper: {
    padding: 20,
    width: deviceWidth,
    alignItems: 'center',
    paddingBottom: 50
  },
  btn: {
    elevation: 5,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#ff6870',
    width: deviceWidth - 50,
    borderRadius: 15,
    padding: 10,
    marginTop: 20
  },
  title: {
    color: '#ff6870',
    marginBottom: 20,
    fontWeight: 'bold'
  },
  linkWraper: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  inputWraper: {
    marginBottom:50
  },
  input: {
    width: deviceWidth - 50,
    borderWidth: 2,
    borderColor: '#ff6870',
    marginBottom: 10,
    padding: 10,
    borderRadius: 20,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain'
    }
})