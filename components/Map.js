import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

export default class Map extends Component {
	constructor(props){
		super(props)
	}
	
	render() {
		let pos = this.props.route.params.pins[0].coords
		console.log(pos);
		console.log('amount of pins rendered on map:', this.props.route.params.pins.length)
		return (
			<MapView
				style={{ flex: 1 }}
				initialRegion={{
					latitude: pos.latitude,
					longitude: pos.longitude,
					latitudeDelta: 0.001,
					longitudeDelta: 0.001,
				}}>

				{this.props.route.params.pins.map((e) => {
					let lon = e.coords.longitude
					let lat = e.coords.latitude
					return (<Marker
								coordinate={{
									latitude:lat,
									longitude:lon
								}}
								title={'marker'}
								description={String(e.timestamp)}
					/>)
				})}
			</MapView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
})