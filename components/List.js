import { Text, StyleSheet, View, FlatList, Switch, Alert } from 'react-native'
import React, { Component } from 'react'
import MyButton from './MyButton'
import * as Location from "expo-location";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native'; // okrągła animacja ładowania
import ListItem from './ListItem';

export default class List extends Component {
	constructor(props) {
		super(props)

		this.state = {
			selectAll: false,
			pins: [],
			locationGettingProgress: false, //false - none || true - pending 
			activePins: []
		}

		this.loadData()
	}

	async saveLocation(location){
		alert(JSON.stringify(location, null, 4))

		this.setData(location.timestamp, location)
		let pins = this.state.pins 
		pins.push(location)
		this.setState({pins:pins})

	}

	async deleteData(){
		let  keys = await AsyncStorage.getAllKeys()
		await AsyncStorage.multiRemove(keys)
		alert('data deleted')

		this.setState({pins:[]})
		this.setState({activePins:[]})
	}

	async setData(key, value){
		AsyncStorage.setItem(String(key), JSON.stringify(value))
		console.log('saved successfully')
		
		let savedItem = await AsyncStorage.getItem(String(key))
		console.log(savedItem == JSON.stringify(value))
	}

	async loadData(){
		let keys = await AsyncStorage.getAllKeys()
		let records = await AsyncStorage.multiGet(keys)
		console.log(keys)

		let pins = []
		for(let key of keys){
			let pin = await AsyncStorage.getItem(key)
			pin = JSON.parse(pin)
			pins.push(pin)
		}

		this.setState({pins:pins})
	}

	async getLocation(){
		this.setState({locationGettingProgress:true})
		let location = await Location.getCurrentPositionAsync({})
		// alert(JSON.stringify(location, null, 4))
		
		this.setState({locationGettingProgress:false})
		Alert.alert(
			'Location',
			'Do you want to save your location?',
			[
				{
					text:'Save',
					onPress: () => this.saveLocation(location),
				},
				{
					text:'Do not save'
				}
			]
		)
	}

	setPinActive(key){
		let pinToActivate = this.state.pins.find((pin) => {
			return pin.timestamp == key
		})

		let activatedPins = this.state.activePins
		if(pinToActivate != undefined && activatedPins.indexOf(pinToActivate) == -1 && activatedPins.length < this.state.pins.length) activatedPins.push(pinToActivate)
		let aaa = [...new Set(activatedPins)]

		this.setState({activePins:aaa})

		let timestamps = this.state.activePins.map((e) => e.timestamp)
		console.log('active  pins: ', timestamps, this.state.pins.length, this.state.activePins.length);
	}

	setPinDisabled(key){
		let i = 0
		let pinToDisable = this.state.activePins.find((pin, index) => {
			i = index
			return pin.timestamp == key
		})
		console.log(i)

		let activatedPins = this.state.activePins
		if(pinToDisable) activatedPins.splice(i, 1)
		this.setState({activePins:activatedPins})

		let timestamps = this.state.activePins.map((e) => e.timestamp)
		console.log('active  pins: ', timestamps, this.state.pins.length, this.state.activePins.length);
	}

	goToMap(){
		console.log(this.props.route.params)
		if(this.state.activePins.length < 1){
			alert('you need to use at least one location')
			return
		}
		this.props.navigation.navigate('Map', {pins:this.state.activePins})
	}

	render(){
		return this.state.locationGettingProgress ? (
			<View style={{ flex: 1, backgroundColor: 'white' }}>
				<ActivityIndicator size='large' color='#A3B1FF' style={styles.centerMiddle}/>
			</View>
		): (
			<View style={{ flex: 1, backgroundColor: 'white' }}>
				<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
					<MyButton style={styles.button} title='save and store position' onPress={() => this.getLocation()}/>
					<MyButton style={styles.button} title='delete stored data' onPress={() => this.deleteData()}/>
				</View>
				<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
					<MyButton style={{ ...styles.button, height: 35, width: '30%' }} title='go to map' onPress={() => this.goToMap()}/>
					<Switch style={{ marginBottom: 15 }} trackColor={{ false: "#767577", true: "#81b0ff" }} thumbColor={this.state.selectAll ? "#3f51b5" : "#f4f3f4"} value={this.state.selectAll} onValueChange={() => {
						let timestamps = this.state.activePins.map((e) => e.timestamp)
						console.log('active  pins: ', timestamps, this.state.pins.length, this.state.activePins.length);
						
						if (this.state.selectAll){
							this.setState({ selectAll: false })
						}
						else{
							this.setState({ selectAll: true })
							let pins = JSON.parse(JSON.stringify(this.state.pins))
							this.setState({ activePins: pins})
						} 
					}} />
				</View>
				<View style={{ flex: 8, backgroundColor: 'white' }}>
					<FlatList style={{ flex: 1, flexDirection: 'column'}}
						data={this.state.pins}
						renderItem={({ item }) => {
							return <ListItem pins={this.state.pins} selectAll={this.state.selectAll} location={item} turnOn={(e) => this.setPinActive(e)} turnOff={(e) => this.setPinDisabled(e)}/>
						}}
					/>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	button: {
		height: 60,
		margin: 10,
		width: "40%",
		borderRadius: 50,
		fontSize: 20,
		color: 'white',
		justifyContent: 'center',
		backgroundColor: '#3f51b5'
	},

	centerMiddle: {
		position: 'absolute',
		left:'50%',
		right:'50%',
		top:'50%'
	}
})