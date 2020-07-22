import React, { Component } from 'react'
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
import j from '../assets/j.jpg'

export default class Explore extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: [
        {
          id: 2,
          name: 'Jessica',
          img: j,
          msg: 'Chapp is my favorite app'
        },
      ]
    }
  }
  render (){
    const { data } = this.state
    return (
      <View style={styles.parent}>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder='Search user by email ...'
            value='Jessica@mail.com'
            style={styles.input}
          />
          <TouchableOpacity style={styles.send}/>
        </View>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('friendDetail',{data: item})} >
              <Item
                data ={item}
              />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
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
        <Image style={styles.img} source={data.img}/>
      </View>
      <Text style={styles.name}> {data.name} </Text>
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
    paddingLeft: 10,
  },
  send: {
    height: 60,
    width: 60,
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