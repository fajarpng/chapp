import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import storage from '@react-native-firebase/storage';
import Geolocation from '@react-native-community/geolocation';
import {
    StyleSheet,
    View,
    TextInput,
    Alert,
    ScrollView,
    Dimensions,
    ActivityIndicator,
    FlatList,
    Modal,
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
import { update, get, clear, uploadImage } from '../redux/actions/user'

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class Profile extends Component {
  constructor(props){
    super(props)
    const { dataUser } = this.props.user
    this.state = {
      username : dataUser.username,
      email: dataUser.email,
      status: dataUser.status,
      image: dataUser.image,
      location: dataUser.location,
      editStatus: false,
      editName: false,
      imageName: ''
    }
  }

  // Image
  chooseImage = () => {
    let options = {
      title: 'Select Image',
      customButtons: [{ name: 'removeImage', title: 'Remove Photo Profile' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('Cancled');
      } else if (response.error) {
        ToastAndroid.show('Something wrong, try again', ToastAndroid.SHORT);
      } else if (response.customButton) {
        this.removeImage();
      } else if (response.fileSize >= 2077116) {
        ToastAndroid.show('Max Size 2 Mb', ToastAndroid.SHORT);
      } else {
        this.setState({
          image: response.uri,
          imageName: response.fileName,
        });
        this.onUpload()
      }
    });
  }

  // Logout
  onLogout = () => {
    this.props.logout()
  }

  // upload image
  onUpload = () => {
    this.props.uploadImage(this.state)
    this.downloadUrl()
  }

  // remove photo profile
  removeImage = () =>{
    this.setState({image: null})
    this.onUpdate()
  }

  // edit
  onUpdate = () => {
    const { username, location } = this.state
    if (username.replace(/ /g,'').length < 1) {
      Alert.alert('Username invalid!')
    } else  {
      username.length > 20  ? 
      (Alert.alert('Username maximum 20 character !'))
      :
      (
        this.setState({editName: false, editStatus: false}),
        this.props.update(this.state, location)
      )
    }
  }

  // Get image from storage
  downloadUrl = async () => {
    const { imageName } = this.state
    if (imageName !== null && imageName.length > 0 ) {
      await storage().ref(imageName).getDownloadURL().then((url) => {
          this.setState({image: url})
          this.onUpdate()
        })
    }
  }

  componentDidMount(){
    this.props.get(this.state)
    Geolocation.getCurrentPosition(info => this.setState({location: info}))
  }

  componentDidUpdate(){
    const { errMsg, isErr } = this.props.auth
    if (errMsg !== '') {
      isErr && Alert.alert(errMsg)
      this.props.celarMsg()
    }
    const { errMsgUser, errUser } = this.props.user
    if (errMsgUser !== '') {
      errUser ? (
        Alert.alert(errMsg)
      ):(
        this.props.get(this.state),
        ToastAndroid.show('Profile Updated', ToastAndroid.SHORT)
      )
      this.props.clear()
    }
  }

  render (){
    const { isLoading } = this.props.auth
    const { dataUser } = this.props.user

    return (
      <View style={styles.parent}>
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.imgWrapper}>
              { dataUser.image !== null && dataUser.image.length > 0  ? (
                <Image style={styles.img} source={{uri: dataUser.image}}/>
                ):(
                <Icon name='user-alt' size={100} style={styles.icon}/>
                )
              }
            </View>
            <TouchableOpacity
              style={styles.chat}
              onPress={this.chooseImage}>
              <Icon name='pencil-alt' size={20} color='#fff8e7'/>
            </TouchableOpacity>
          </View>
          <View style={{padding: 10}}>
            <View style={styles.info}>
              <View style={styles.row}>
                <Text style={{color: '#ff6870', marginBottom: 10}}>Username</Text>
                <TouchableOpacity
                  onPress={() => this.setState({ editName : true })}>
                  <Icon name='pencil-alt' size={20} color='#ffabaf'/>
                </TouchableOpacity>
              </View>
              <Text style={{fontSize: 18}}>{dataUser.username}</Text>
            </View>
            <View style={styles.info}>
              <View style={styles.row}>
                <Text style={{color: '#ff6870', marginBottom: 10}}>Status</Text>
                <TouchableOpacity
                  onPress={() => this.setState({ editStatus : true })}>
                  <Icon name='pencil-alt' size={20} color={'#ffabaf'}/>
                </TouchableOpacity>
              </View>
              <Text style={{fontSize: 18}}>{dataUser.status}</Text>
            </View>
            <View style={styles.info}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('map',{data: dataUser})}>
              <Text style={{color: '#ff6870', marginBottom: 10}}>Last location</Text>
              <Text style={{fontSize: 18}}>jl.panglima Kertek, Wonosobo</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.info}>
              <View>
              <Text style={{color: '#ff6870', marginBottom: 10}}>Email</Text>
              <Text style={{fontSize: 18}}>{dataUser.email}</Text>
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

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.editStatus}>
          <View style={styles.modalWraper}>
            <Text style={styles.modalTitle}>Edit status</Text>
            <TextInput
              style={styles.input}
              value={this.state.status}
              onChangeText={(e) => this.setState({status: e})}
              />
            <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
              <TouchableOpacity
                style={{margin: 10}}
                onPress={() => {
                  this.setState({editStatus: false});
                }}
                >
                <Text>Cancle</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{margin: 10}}
                onPress={this.onUpdate}
                >
                <Text>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.editName}>
          <View style={styles.modalWraper}>
            <Text style={styles.modalTitle}>Edit username</Text>
            <TextInput
              style={styles.input}
              value={this.state.username}
              onChangeText={(e) => this.setState({username: e})}
              />
            <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
              <TouchableOpacity
                style={{margin: 10}}
                onPress={() => {
                  this.setState({editName: false});
                }}
                >
                <Text>Cancle</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{margin: 10}}
                onPress={this.onUpdate}>
                <Text>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
    backgroundColor: 'rgba(0,0,0,.5)',
    justifyContent:'center'
  },
  img: {
    flex:1,
    height: undefined,
    width: undefined,
    resizeMode: 'cover',
  },
  icon: {
    alignSelf: 'center',
    color: '#fff8e7',
  },
  info: {
    padding: 20,
    borderBottomColor: '#ff6870',
    borderBottomWidth: 2
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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
    marginTop: 20,
    marginBottom: 10
  },
  text: {
    color: '#fff8e7',
    fontSize: 20,
  },
  modalWraper: {
    backgroundColor: '#fff0cc',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    bottom: 0,
    position: 'absolute',
    elevation: 3,
    width: deviceWidth,
    padding: 20
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 20
  },
  input: {
    padding: 10,
    margin: 10,
    borderBottomWidth: 2,
    fontSize: 15
  },
})

const mapStateToProps = state => ({
    auth: state.auth,
    user: state.user,
})
const mapDispatchToProps = { logout, celarMsg, update, clear, get, uploadImage }

export default connect(mapStateToProps, mapDispatchToProps)(Profile)