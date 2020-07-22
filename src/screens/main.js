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

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
import s from '../assets/s.jpg'
import j from '../assets/j.jpg'
import c from '../assets/c.jpg'
import logo from '../assets/chap.png'

export default class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: [
        {
          id: 1,
          name: 'Cacha',
          img: c,
          msg: 'Hi do you remember me ? :)'
        },
        {
          id: 2,
          name: 'Jessica',
          img: j,
          msg: 'Chapp is my favorite app'
        },
        {
          id: 3,
          name: 'Steven Chow',
          img: s,
          msg: 'Yo! have a nice day'
        }
      ]
    }
  }
  render (){
    const { data } = this.state
    return (
      <View style={styles.parent}>
        <View style={styles.header}>
          <View style={styles.rowTop}>
            <Image style={styles.logo} source={logo}/>
            <Text style={styles.chapp}> Chapp </Text>
          </View>
          
          <TouchableOpacity
            style={styles.setting}
            onPress={()=> this.props.navigation.navigate('setting')}>
            <Icon name='cog' size={30} color='#fff8e7'/>
          </TouchableOpacity>
        </View>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('detail',{data: item})} >
              <Item
                data ={item}
              />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
          />
        <TouchableOpacity style={styles.add} onPress={() => this.props.navigation.navigate('explore')}>
          <Icon name='user-plus' light size={30} color='#fff8e7'/>
        </TouchableOpacity>
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
        <Image style={styles.img} source={data.img}/>
      </View>
      <View>
        <Text style={styles.name}> {data.name} </Text>
        <Text style={styles.msg}> {data.msg} </Text>
      </View>
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
    backgroundColor: '#ff6870',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    width: 50,
    height: 50
  },
  chapp: {
    fontSize: 25,
    color: '#fff8e7',
  },
  rowTop: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  setting: {
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomColor: '#ff6870',
    borderBottomWidth: 0.5
  },
  imgWrapper: {
    height: 60,
    width: 60,
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
  msg: {
    color: 'grey',
    fontSize: 15
  },
  add: {
    height: 60,
    width: 60,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#ff6870'
  },
})