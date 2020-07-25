import React, { Component } from 'react';
import storage from '@react-native-firebase/storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
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
    ToastAndroid,
    TouchableOpacity
  } from 'react-native';

// import Actoin Redux
import {connect} from 'react-redux'
import { search, clear } from '../redux/actions/friend'

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
import j from '../assets/j.jpg'

class Explore extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      data: []
    }
  }

  componentDidUpdate(){
  const { errMsgSearch, errSearch, dataSearch } = this.props.friend
  if (errMsgSearch !== '') {
      errSearch && ToastAndroid.show(errMsgSearch, ToastAndroid.SHORT)
      dataSearch === undefined ? (
        ToastAndroid.show('No user found !', ToastAndroid.SHORT)
        ):(
        this.setState({data: [dataSearch]})
        ) 
      this.props.clear()
    }
  }

  onSearch = () => {
    this.props.search(this.state)
  }

  render (){
    const { data } = this.state
    const { dataSearch } = this.props.friend
    return (
      <View style={styles.parent}>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder='Search user by email ...'
            style={styles.input}
            onChangeText={(e) => this.setState({email: e})}
          />
          <TouchableOpacity
            style={styles.send}
            onPress={this.onSearch}>
            <Icon name='search' size={20} color='#ff6870'/>
          </TouchableOpacity>
        </View>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('friendDetail',{data: dataSearch})} >
              <Item
                data ={item}
              />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.email}
          />
      </View>
    )
  }
}

class Item extends Component {
  render (){
    const {data} = this.props
    return (
      <View style={styles.row}>
      <View style={styles.imgWrapper}>
      {data.image !== null && data.image.length > 0 ? (
        <Image style={styles.img} source={{uri: data.image}}/>
        ):(
        <Icon name='user-alt' color='#fff8e7' size={20} style={{alignSelf: 'center'}}/>
        )}
      </View>
      <Text style={styles.name}> {data.username} </Text>
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
    backgroundColor: '#ff6870',
    padding: 10
  },
  chapp: {
    fontSize: 30,
    color: '#fff8e7',
    fontWeight: 'bold'
  },
  input: {
    width: deviceWidth - 90,
    borderColor: '#fff8e7',
    backgroundColor: '#fff8e7',
    fontSize: 15,
    borderWidth: 2,
    borderRadius: 30,
    elevation: 3,
    paddingLeft: 10,
  },
  send: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    borderRadius: 70,
    backgroundColor: '#fff8e7'
  },
  inputWrapper: {
    width: deviceWidth,
    backgroundColor: '#ff6870',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomColor: '#ff6870',
    alignItems: 'center',
    borderBottomWidth:  0.5
  },
  imgWrapper: {
    height: 60,
    width: 60,
    borderRadius: 70,
    backgroundColor: 'rgba(0,0,0,.3)',
    justifyContent: 'center',
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
  add: {
    height: 60,
    width: 60,
    borderRadius: 70,
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#ff6870'
  },
})

const mapStateToProps = state => ({
    friend: state.friend,
})
const mapDispatchToProps = { search, clear }

export default connect(mapStateToProps, mapDispatchToProps)(Explore)