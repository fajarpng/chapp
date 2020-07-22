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

export default class Chat extends Component {
  render (){
    const { data } = this.props.route.params
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
              <Image style={styles.img} source={data.img}/>
            </View>
            <Text style={styles.chapp}> {data.name} </Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{padding: 10}}>
          <View style={styles.myMsg}>
            <Text style={{fontSize: 15, color: '#fff8e7'}}>Hi ! {data.name}</Text>
          </View>
          <View style={styles.frnMsg}>
            <Text style={{fontSize: 15}}>{data.msg}</Text>
          </View>
        </ScrollView>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder='Type message here ...'
            style={styles.input}
          />
          <TouchableOpacity style={styles.send}>
            <Icon name='paper-plane' size={30} color='#fff8e7'/>
          </TouchableOpacity>
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