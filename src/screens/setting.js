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
import c from '../assets/c.jpg'

export default class Detail extends Component {
  render (){
    const data = {name: 'Tri Fajar', email: 'fajar@mail', img: c}
    return (
      <ScrollView>
        <View style={styles.parent}>
          <View style={styles.header}>
            <View style={styles.imgWrapper}>
              <Image style={styles.img} source={data.img}/>
            </View>
            <TouchableOpacity
              style={styles.chat}
              onPress={() => this.props.navigation.navigate('detail',{data})}>
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
  icon: {

  },
})