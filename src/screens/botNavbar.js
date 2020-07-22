// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/FontAwesome5';

// import Home from './home'
// import Trans from './transaction'
// import Profile from './profile'
// import Author from './admin/authors'

// const Tab = createBottomTabNavigator();

// export default function MyTabs() {
//   return (
//     <Tab.Navigator
//     tabBarOptions = {{
//     	activeTintColor: '#0CBABA',}
//     }>
//       <Tab.Screen
//        options={{
//             title: 'Home',
//             tabBarIcon: ({color, size}) => (
//               <Icon name="home" solid color={color} size={size} />
//             ),
//          }} 
//         name="home" 
//         component={Home} />
//       <Tab.Screen
//       	options={{
//             title: 'Author',
//             tabBarIcon: ({color, size}) => (
//               <Icon name="feather-alt" solid color={color} size={size} />
//             ),
//          }} 
//       	name="author"
//       	component={Author} />
//       <Tab.Screen
//       	options={{
//             title: 'Transaction',
//             tabBarIcon: ({color, size}) => (
//               <Icon name="list" solid color={color} size={size} />
//             ),
//          }} 
//       	name="tras"
//       	component={Trans} />
//       <Tab.Screen
//         options={{
//             title: 'Profile',
//             tabBarIcon: ({color, size}) => (
//               <Icon name="user" solid color={color} size={size} />
//             ),
//          }} 
//         name="profile"
//         component={Profile} />
//     </Tab.Navigator>
//   );
// }