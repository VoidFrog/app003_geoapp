import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import MyButton from './MyButton'
import * as Font from "expo-font";
import * as Location from "expo-location";  

export default class Main extends Component {
	constructor(props) {
		super(props)

		this.state = {
			fontLoaded: false
		}

	}
	render() {
		return this.state.fontLoaded?(
			<View style={styles.container}>
				<MyButton title='Geo App' style={{...styles.button, fontFamily:'myFont'}} customFont={true} onPress={() => {
					this.props.navigation.navigate('List', {nav:this.props.navigation})
				}} />
				<Text style={{ fontSize: 26, color: 'white', fontWeight: '100', marginBottom: 200 }}>find and save your position</Text>
			</View>
		):null
	}

	async componentDidMount(){
		await Font.loadAsync({
			'myFont':require('../assets/newfont.ttf')
		})

		this.setState({fontLoaded:true})
		Location.requestForegroundPermissionsAsync();
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '100%',
		backgroundColor: '#3f51b5'
	},
	button: {
		height: 160,
		width: "100%",
		fontSize: 80,
		color: 'white',
		fontWeight: '900',
		backgroundColor: '#3f51b5',
	},
})