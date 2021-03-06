import React, { Component } from 'react'
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/FontAwesome5'
import {
    StyleSheet,
    View,
    TextInput,
    ScrollView,
    Dimensions,
    Alert,
    Text,
    Image,
    TouchableOpacity
  } from 'react-native';

// import Actoin Redux
import { connect } from 'react-redux'
import { register, celarMsg } from '../redux/actions/auth'
import { create } from '../redux/actions/user'

import logo from '../assets/chap.png'

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class Register extends Component {
  constructor(props){
    super(props)
    this.state = {
        uid: '',
        email: '',
        password:'',
        username: ''
    }
  }
  onRegis = () => {
    const { email, password, username } = this.state
    if (email !== '' && password !== '' && username !== ''){
      if (username.replace(/ /g,'').length < 1) {
        Alert.alert('Username invalid!')
      } else  {
        username.length > 20  ? 
        (Alert.alert('Username maximum 20 character !'))
        :
        (this.props.register(this.state))
      }
    } else {
      Alert.alert('Please fill all form !')
    }
  }

  onCreate = () => {
    const { email, uid, username } = this.state
    if (email !== '' && uid !== '' && username !== ''){
      this.props.create(this.state)
    }
  }

  componentDidUpdate(){
    const { errMsg, isErr, uid } = this.props.auth
    if (errMsg !== '') {
        isErr ? Alert.alert(errMsg) : (this.setState({uid}), Alert.alert(errMsg))
        this.props.celarMsg()
    }
    if (this.state.uid !== ''){
      this.onCreate()
      this.setState({uid: ''})
    }
  }
  render (){
    Geolocation.getCurrentPosition(info => this.setState({location: info}));
    const { isLoading } = this.props.auth
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
            <TouchableOpacity
              style={styles.btn}
              onPress={() => this.onRegis()}>
              {isLoading ? (
                  <Icon name='spinner' size={30} color='#fff8e7'/>
                ):(
                  <Text style={styles.text}>REGISTER</Text>
                )}
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

const mapStateToProps = state => ({
    auth: state.auth,
    user: state.user,
})
const mapDispatchToProps = { register, celarMsg, create }

export default connect(mapStateToProps, mapDispatchToProps)(Register)
