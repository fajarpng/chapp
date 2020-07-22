import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import {connect} from 'react-redux'

const Stack = createStackNavigator();

import Landing from '../screens/landing';
import Login from '../screens/login';
import Register from '../screens/register';
import Home from '../screens/main';
import Detail from '../screens/detail';
import Friend from '../screens/userDetail';
import Explore from '../screens/explore';
// import Tab from '../screens/botNavbar'

export default class Route extends Component {
  render() {
  	// const {token} = this.props.auth
    return (
    	<NavigationContainer>
	        <Stack.Navigator>
	        	<Stack.Screen options={{headerShown: false}} component={Landing} name={'landing'}/>
	        	<Stack.Screen 
	        		options={{
			          title: ' ',
			          headerTransparent: true,
			          headerTintColor: '#ff6870',
			          headerTitleStyle: {
			            fontWeight: 'bold',
			          },
			        }}
	        		component={Login} 
	        		name={'login'}/>
	        	<Stack.Screen
	        		options={{
			          title: ' ',
			          headerTransparent: true,
			          headerTintColor: '#ff6870',
			          headerTitleStyle: {
			            fontWeight: 'bold',
			          },
			        }}
	        		component={Register}
	        		name={'register'}/>
	        	<Stack.Screen 
	        		options={{headerShown: false}}
	        		component={Home} 
	        		name={'home'}/>
	        	<Stack.Screen 
	        		options={{headerShown: false}}
	        		component={Detail} 
	        		name={'detail'}/>
	        	<Stack.Screen 
	        		options={{
			          title: ' ',
			          headerTransparent: true,
			          headerTintColor: '#fff8e7',
			          headerTitleStyle: {
			            fontWeight: 'bold',
			          },
			        }}
	        		component={Friend} 
	        		name={'friendDetail'}/>
	        	<Stack.Screen 
	        		options={{
			          title: 'Find friends',
			          headerStyle: {
			          	backgroundColor: '#ff6870',
			          	elevation: 0
			          },
			          headerTintColor: '#fff8e7',
			        }}
	        		component={Explore} 
	        		name={'explore'}/>
	        </Stack.Navigator>
	     </NavigationContainer>
    );
  }
}
// const mapStateToProps = state => ({
//     auth: state.auth
// })

// export default connect(mapStateToProps)(Route)