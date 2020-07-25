import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MapView, { Marker }  from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Image,
  } from 'react-native';

// import Actoin Redux
import {connect} from 'react-redux';
import { search } from '../../redux/actions/friend';

class Map extends Component {
	constructor(props){
    super(props)
		const { data } = this.props.route.params
		console.log(data)
		const location = data.location && data.location !== null ? data.location : null
	    this.state = {
	      location: {
	        latitude: location !== null ? location.coords.latitude : 0,
	      	longitude: location !== null ? location.coords.longitude : 0,
	      	latitudeDelta: 0.0059,
	      	longitudeDelta: 0.0019,
	      },
	      image: data.image,
	      mapType: 'standard',
	      expanded: false
	    }
  	}

  	componentDidMount(){
    const { data } = this.props.route.params
    // this.props.search(data)
    // console.log(data)
  	}

  	geoGet = () => {
  		Geocoder.init("AIzaSyA07C3uiT-TpZYxtjiBS-TWNRP9evF7kvI");
  		Geocoder.from(37.78825, -122.4324)
		.then(json => {
        		var addressComponent = json.results[0].address_components[0];
			console.log(addressComponent);
		}).catch(error => console.warn(error));
  	}

	render(){
		const { mapType, location, expanded, image } = this.state

		return(
			<View style={styles.parent}>
				<View style={styles.mapType}>
					<TouchableOpacity
						style={styles.btn}
						onPress={() => this.setState({expanded: !this.state.expanded})}>
						<Icon
							name={expanded ? 'chevron-up' : 'chevron-down'}
							size={20}
							color='#ff6870' />
						<Text style={styles.text}>Map type</Text>
					</TouchableOpacity>
					{expanded && (
						<View style={styles.option}>
						<TouchableOpacity
							style={styles.btn}
							onPress={() => this.setState({expanded: false, mapType: 'standard'})}>
							<Text style={styles.text}>Standard</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.btn}
							onPress={() => this.setState({expanded: false, mapType: 'satellite'})}>
							<Text style={styles.text}>Satellite</Text>
						</TouchableOpacity>
						</View>
						)}
					
				</View>
				<MapView
                  style={styles.map}
                  mapType={mapType}
                  initialRegion={location}>
                  <Marker
                    coordinate={location}
                  	>
                  	<Icon size={75} name={'map-marker-alt'} style={styles.icon} color='#ff6870' />
                  	{image !== null && image.length > 0 && (
                  		<Image style={styles.img} source={{uri: image}}/>
                  		)}
                    
                  </Marker>
                </MapView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	parent: {
		flex: 1,
		backgroundColor: '#fff'
	},
	map: {
		flex: 1
	},
	mapType: {
		position: 'absolute',
		zIndex: 2,
		right: 20,
		top: 20,
		borderRadius: 15,
		backgroundColor: '#fff8e7'
	},
	btn: {
		flexDirection: 'row',
		margin: 20,
	},
	text : {
		color: '#ff6870',
		marginLeft: 20,
		fontSize: 15,
		fontWeight: 'bold'
	},
	option: {
		alignSelf: 'flex-start'
	},
	img: {
        width: 40,
        height: 40,
        borderRadius: 40,
        position: 'absolute',
        marginLeft: 8,
        marginTop: 8,
    },
})

const mapStateToProps = state => ({
    friend: state.friend,
})
const mapDispatchToProps = { search }
export default connect(mapStateToProps, mapDispatchToProps)(Map)
