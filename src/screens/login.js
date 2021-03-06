import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
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

// import Actoin Redux
import {connect} from 'react-redux'
import { login, celarMsg } from '../redux/actions/auth'
import { get } from '../redux/actions/user'

import logo from '../assets/chap.png'

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
        email: '',
        password:'',
    }
  }
  onLogin = () => {
    const { email, password } = this.state
    if (email !== '' && password !== ''){
      this.props.login(this.state)
      this.props.get(this.state)
    } else {
      Alert.alert('Please fill all form !')
    }
  }
  componentDidUpdate(){
  const { errMsg, isErr } = this.props.auth
  if (errMsg !== '') {
      isErr ? Alert.alert(errMsg) : Alert.alert(errMsg)
      this.props.celarMsg()
    }
  }
  render (){
    const { isLoading } = this.props.auth
    return (
      <ScrollView>
      <View style={styles.parent}>
        <Image source={logo} style={styles.image}/>
        <Text style={styles.title}>Log in to your Chapp account</Text>
        <View style={styles.btnWrapper}>
          <View style={styles.inputWraper}>
            <TextInput
              placeholder='Email'
              style={styles.input} onChangeText={(e) => this.setState({email: e})}/>
            <TextInput
              placeholder='Password'
              secureTextEntry={true}
              style={styles.input} onChangeText={(e) => this.setState({password: e})}/>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => this.onLogin()}>
              {isLoading ? (
                  <Icon name='spinner' size={30} color='#fff8e7'/>
                ):(
                  <Text style={styles.text}>LOGIN</Text>
                )}
            </TouchableOpacity>
          </View>
          <View style={styles.linkWraper}>
            <Text >Don t have an account ?</Text>
            <Text style={styles.title} onPress={() => this.props.navigation.navigate('register')}> Register here</Text>
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
})
const mapDispatchToProps = { login, celarMsg, get }

export default connect(mapStateToProps, mapDispatchToProps)(Login)
