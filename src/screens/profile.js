import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import storage from '@react-native-firebase/storage';
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
import c from '../assets/c.jpg'

class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {
      username : this.props.user.dataUser.username,
      email: this.props.user.dataUser.email,
      status: this.props.user.dataUser.status,
      image: this.props.user.dataUser.image,
      editStatus: false,
      editName: false,
      imageName: ''
    }
  }

  // Image
  chooseImage = () => {
    let options = {
      title: 'Select Image',
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
        ToastAndroid.show('Something wrong, try again', ToastAndroid.SHORT);
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
    this.onUpdate()
  }


  // edit
  onUpdate = () => {
    const { username } = this.state
    if (username.replace(/ /g,'').length < 1) {
      Alert.alert('Username invalid!')
    } else  {
      username.length > 20  ? 
      (Alert.alert('Username maximum 20 character !'))
      :
      (
        this.setState({editName: false, editStatus: false}),
        this.props.update(this.state)
      )
    }
  }

  // Get image from storage
  downloadUrl = () => {
    const { image } = this.props.user.dataUser
    if (image !== null) {
      storage().ref(image).getDownloadURL().then((url) => {
          this.setState({image: url})
        })
    }
  }

  componentDidMount(){
    this.downloadUrl()
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
        this.downloadUrl()
      )
      this.props.clear()
    }
  }

  render (){
    const { isLoading } = this.props.auth
    const { dataUser } = this.props.user
    const { image } = this.state

    return (
      <View style={styles.parent}>
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.imgWrapper}>
              { dataUser.image !== null ? (
                <Image style={styles.img} source={{uri: image}}/>
                ):(
                <Icon name='user-alt' size={100} color='#fff8e7'/>
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
              <View>
                <Text style={{color: '#ff6870', marginBottom: 10}}>Username</Text>
                <Text style={{fontSize: 18}}>{dataUser.username}</Text>
              </View>
              <TouchableOpacity
                onPress={() => this.setState({ editName : true })}>
                <Icon name='pencil-alt' size={20} color='#ffabaf'/>
              </TouchableOpacity>
            </View>
            <View style={styles.info}>
              <View>
              <Text style={{color: '#ff6870', marginBottom: 10}}>Status</Text>
              <Text style={{fontSize: 18}}>{dataUser.status}</Text>
              </View>
              <TouchableOpacity
                onPress={() => this.setState({ editStatus : true })}>
                <Icon name='pencil-alt' size={20} color='#ffabaf'/>
              </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center'
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