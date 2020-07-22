import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {
    StyleSheet,
    View,
    TextInput,
    Alert,
    ScrollView,
    Dimensions,
    ActivityIndicator,
    FlatList,
    Text,
    Image,
    ToastAndroid,
    TouchableOpacity
  } from 'react-native';

//  image picker
import ImagePicker from 'react-native-image-picker';

// import Actoin Redux
import {connect} from 'react-redux'
import { logout, celarMsg } from '../redux/actions/auth'

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
import c from '../assets/c.jpg'

class Profile extends Component {
  chooseImage = () => {
    let options = {
      title: 'Select Image',
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        ToastAndroid.show('Image must filled', ToastAndroid.SHORT);
      } else if (response.error) {
        ToastAndroid.show('Something wrong, try again', ToastAndroid.SHORT);
      } else if (response.customButton) {
        ToastAndroid.show('Something wrong, try again', ToastAndroid.SHORT);
      } else if (response.fileSize >= 2077116) {
        ToastAndroid.show('Max Size 2 Mb', ToastAndroid.SHORT);
      } else {
        Alert.alert('image updated')
      }
    });
  }
  onLogout = () => {
    this.props.logout()
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
    const data = {name: 'Tri Fajar', email: 'fajar@mail', img: c}
    return (
      <View style={styles.parent}>
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.imgWrapper}>
              <Image style={styles.img} source={data.img}/>
            </View>
            <TouchableOpacity
              style={styles.chat}
              onPress={this.chooseImage}>
              <Icon name='pencil-alt' size={30} color='#fff8e7'/>
            </TouchableOpacity>
          </View>
          <View style={{padding: 10}}>
            <View style={styles.info}>
              <View>
                <Text style={{color: '#ff6870', marginBottom: 10}}>Name</Text>
                <Text style={{fontSize: 18}}>{data.name}</Text>
              </View>
              <Icon name='pencil-alt' size={25} color='#ffabaf'/>
            </View>
            <View style={styles.info}>
              <View>
              <Text style={{color: '#ff6870', marginBottom: 10}}>Status</Text>
              <Text style={{fontSize: 18}}>Hi There im using Chapp !!</Text>
              </View>
              <Icon name='pencil-alt' size={25} color='#ffabaf'/>
            </View>
            <View style={styles.info}>
              <View>
              <Text style={{color: '#ff6870', marginBottom: 10}}>Last location</Text>
              <Text style={{fontSize: 18}}>jl.panglima Kertek, Wonosobo</Text>
              </View>
            </View>
            <View style={styles.info}>
              <View>
              <Text style={{color: '#ff6870', marginBottom: 10}}>Email</Text>
              <Text style={{fontSize: 18}}>{data.name}@mail.com</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.btn}
              onPress={this.onLogout}>
              {isLoading ? (
                  <Icon name='spinner' size={30} color='#fff8e7'/>
                ):(
                  <Text style={styles.text}>LOGOUT</Text>
                )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    height: deviceHeight,
    position: 'relative',
    backgroundColor: '#fff8e7'
  },
  header: {
    width: deviceWidth,
    elevation: 5,
  },
  chapp: {
    position: 'absolute',
    top: 270,
    left: 20,
    fontSize: 30,
    color: '#fff8e7',
    fontWeight: 'bold'
  },
  imgWrapper: {
    height: deviceHeight - 400,
    width: deviceWidth,
  },
  img: {
    flex:1,
    height: undefined,
    width: undefined,
    resizeMode: 'cover',
  },
  info: {
    padding: 20,
    borderBottomColor: '#ff6870',
    alignItems:'center',
    justifyContent: 'space-between',
    flexDirection:'row',
    borderBottomWidth: 2
  },
  chat: {
    height: 60,
    width: 60,
    borderRadius: 70,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 30,
    right: 30,
    backgroundColor: '#ff6870'
  },
  btn: {
    elevation: 5,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#ff6870',
    width: deviceWidth,
    padding: 10,
    marginTop: 20
  },
  text: {
    color: '#fff8e7',
    fontSize: 20,
  },
})

const mapStateToProps = state => ({
    auth: state.auth,
})
const mapDispatchToProps = { logout, celarMsg }

export default connect(mapStateToProps, mapDispatchToProps)(Profile)