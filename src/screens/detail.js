import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import database from '@react-native-firebase/database';
import {
    StyleSheet,
    View,
    TextInput,
    ScrollView,
    Dimensions,
    ActivityIndicator,
    FlatList,
    Text,
    Image,
    TouchableOpacity
  } from 'react-native';

// import Actoin Redux
import { connect } from 'react-redux';
import { update } from '../redux/actions/user';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
      message: ''
    };
  }

  readMessage = () =>{
    const { uid } = this.props.user.dataUser
    const { data } = this.props.route.params
    database()
    .ref(`/users/${uid}/${data.uid}`)
    .on('value', 
      snapshot => {
        snapshot.val() !== null && this.setState({chats: snapshot.val().chats}),
        console.log(snapshot.val()),
        console.log(`/users/${uid}/${data.uid}`)
    })
  }

  // send to database
  sendMessage = (chats) => {
    const { uid } = this.props.user.dataUser
    const { data } = this.props.route.params

    database()
      .ref(`/users/${uid}/${data.uid}`)
      .set({
        chats
      })
    database()
      .ref(`/users/${data.uid}/${uid}`)
      .set({
        chats
      }).then(
      this.setState({message: ''}),
      this.readMessage())
  }

  // send
  onSend = () => {
    const { uid } = this.props.user.dataUser
    const { message, chats } = this.state
    if (message.replace(/ /g,'').length > 0) {
      const sended = [...chats, {message, uid}]
      this.sendMessage(sended)
    } else { this.setState({message: ''})}
  }

  componentDidMount(){
    this.readMessage()
  }

  render (){
    const { data } = this.props.route.params
    const { image, username, uid } = data
    const { chats } = this.state

    return (
      <View style={styles.parent}>
        <View style={styles.header}>
          <TouchableOpacity
            style={{padding: 5, marginRight: 10}}
            onPress={() => this.props.navigation.goBack()}>
            <Icon name='arrow-left' light size={20} color='#fff8e7'/>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.goDetail}
            onPress={() => this.props.navigation.navigate('friendDetail',{data})}>
            <View style={styles.imgWrapper}>
            { image !== null && image.length > 0  ? (
                <Image style={styles.img} source={{uri: image}}/>
              ):(
                <Icon name='user-alt' size={20} color='#fff8e7' style={{alignSelf: 'center'}}/>
              )
            }
            </View>
            <Text style={styles.chapp}>{username}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={ { padding: 10 } }
          data={ chats }
          renderItem={({item}) => (
            <Item
              data = { item }
              frnId = { uid }
            />
          )}
          keyExtractor={item => item.message}
        />
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder='Type message here ...'
            value={this.state.message}
            style={styles.input}
            onChangeText={ e => this.setState({message: e}) }
          />
          <TouchableOpacity
            style={styles.send}
            onPress={this.onSend}>
            <Icon name='paper-plane' size={30} color='#fff8e7'/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
class Item extends Component {
  render (){
    const { data, frnId } = this.props
    console.log(data.uid !== frnId ? data.uid:frnId)
    return (
      <>
      {data.uid !== undefined && data.uid !== frnId ? (
        <View style={styles.myMsg}>
          <Text style={{fontSize: 15, color: '#fff8e7'}}>{data.message}</Text>
        </View>
        ):(
        <View style={styles.frnMsg}>
          <Text style={{fontSize: 15}}>{data.message}</Text>
        </View>
        )}
      </>
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
    backgroundColor: '#ff6870',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    elevation: 5,
  },
  goDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chapp: {
    fontSize: 25,
    color: '#fff8e7',
  },
  input: {
    width: deviceWidth - 90,
    borderColor: '#ff6870',
    borderWidth: 2,
    borderRadius: 30,
    paddingLeft: 10,
  },
  send: {
    height: 60,
    width: 60,
    borderRadius: 70,
    backgroundColor: '#ff6870',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputWrapper: {
    width: deviceWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    position: 'absolute',
    bottom: 10
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1
  },
  imgWrapper: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,.3)',
    borderRadius: 70,
    marginRight: 5
  },
  img: {
    flex:1,
    height: undefined,
    width: undefined,
    resizeMode: 'cover',
    borderRadius: 70,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  myMsg: {
    backgroundColor: '#ff6870',
    alignSelf: 'flex-end',
    padding: 10,
    borderTopStartRadius: 20,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    marginBottom: 10
  },
  frnMsg: {
    alignSelf: 'flex-start',
    borderWidth: 2,
    borderColor: '#ff6870', 
    padding: 10,
    borderTopEndRadius: 20,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    marginBottom: 10
  },
})

const mapStateToProps = state => ({
    user: state.user,
})
const mapDispatchToProps = { update }
export default connect(mapStateToProps, mapDispatchToProps)(Chat)
