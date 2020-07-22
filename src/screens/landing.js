import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    ScrollView,
    Dimensions,
    Text,
    Image,
    TouchableOpacity
  } from 'react-native';

import logo from '../assets/chap.png'

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default class Landing extends Component {
  render (){
    return (
      <ScrollView>
        <View style={styles.parent}>
        	<Image source={logo} style={styles.image}/>
            <Text style={styles.title}>Welcome to chapp</Text>
            <View style={styles.btnWrapper}>
                <TouchableOpacity style={styles.btnLogin} onPress={() => this.props.navigation.navigate('login')}>
                  <Text style={styles.text}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnRegis} onPress={() => this.props.navigation.navigate('register')}>
                  <Text style={styles.text}>REGISTER</Text>
                </TouchableOpacity>
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
    backgroundColor: '#ff6870'
  },
  text: {
    color: '#ff6870',
    fontSize: 20,
  },
  btnWrapper: {
    padding: 20,
    width: deviceWidth,
    alignItems: 'center',
    paddingBottom: 50
  },
  btnLogin: {
    shadowColor: "#000",
    elevation: 5,
    alignItems: 'center',
    backgroundColor: '#fff8e7',
    width: deviceWidth - 100,
    borderRadius: 15,
    padding: 8,
    marginBottom: 30
  },
  btnRegis: {
    shadowColor: "#000",
    elevation: 5,
    alignItems: 'center',
    backgroundColor: '#fff8e7',
    width: deviceWidth - 100,
    borderRadius: 15,
    padding: 8
  },
  title: {
    color: '#fff',
    fontSize: 30,
    marginBottom: 100,
  },
  image: {
    width: 280,
    height: 280,
    resizeMode: 'contain'
    }
})