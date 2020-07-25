import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
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
import {connect} from 'react-redux'
import { search } from '../redux/actions/friend'

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class Detail extends Component {

  componentDidMount(){
    // const { data } = this.props.route.params
  }

  render (){
    const { dataSearch } = this.props.friend
    const { image, username, email, location, status } = dataSearch

    return (
      <>
      <ScrollView>
        <View style={styles.parent}>
          <View style={styles.header}>
            <View style={styles.imgWrapper}>
            { image !== null && image.length > 0  ? (
                <Image style={styles.img} source={{uri: image}}/>
              ):(
                <Icon name='user-alt' size={100} style={styles.icon}/>
              )
            }
            </View>
          </View>
          <View style={{padding: 10}}>
            <View style={styles.info}>
              <Text style={{color: '#ff6870', marginBottom: 10}}>Username</Text>
              <Text style={{fontSize: 18}}>{username}</Text>
            </View>
            <View style={styles.info}>
              <Text style={{color: '#ff6870', marginBottom: 10}}>Status</Text>
              <Text style={{fontSize: 18}}>{status}</Text>
            </View>
            <TouchableOpacity
              style={styles.info}
              onPress={()=>this.props.navigation.navigate('map',{data: dataSearch})}>
              <Text style={{color: '#ff6870', marginBottom: 10}}>Last location</Text>
              <Text style={{fontSize: 18}}>Tap to open the map. </Text>
            </TouchableOpacity>
            <View style={styles.info}>
              <Text style={{color: '#ff6870', marginBottom: 10}}>Email</Text>
              <Text style={{fontSize: 18}}>{email}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
          style={styles.chat}
          onPress={() => this.props.navigation.navigate('chat',{data : dataSearch})}>
          <Icon name='comments' color='#fff8e7' size={30}/>
        </TouchableOpacity>
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
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  info: {
    padding: 20,
    borderBottomColor: '#ff6870',
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
    backgroundColor: '#ff6870',
    elevation: 3
  },
})

const mapStateToProps = state => ({
    friend: state.friend,
})
const mapDispatchToProps = { search }

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
