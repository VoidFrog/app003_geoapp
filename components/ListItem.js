import { Text, StyleSheet, View, Image, Switch } from 'react-native'
import React, { Component } from 'react'

export default class ListItem extends Component {
	constructor(props){
		super(props)

		this.state = {
			switchOn:false,
		}

		this.usedSelectAll = false
	}

	changeValue(value){
		// this.props.turnOff(this.props.location.timestamp)

		console.log(value)
		if(this.state.switchOn){
			console.log('wyłączam')
			this.setState({ switchOn: false })
			this.props.turnOff(this.props.location.timestamp)
		} 
		else if(!this.state.switchOn){
			console.log('włączam');
			this.setState({ switchOn: true })
			this.props.turnOn(this.props.location.timestamp)
		}

		console.log('pins saved:', this.props.pins.length);
	}

	render() {
		// console.log(this.props.selectAll, this.state.switchOn)
		
		if(this.usedSelectAll == this.props.selectAll){
			this.usedSelectAll = !this.usedSelectAll
			this.state.switchOn = this.props.selectAll

			if(this.state.switchOn) this.props.turnOn(this.props.location.timestamp)
			else this.props.turnOff(this.props.location.timestamp)
		}
		// console.log(this.props.selectAll, this.state.switchOn)

		return (
			<View style={styles.container}>
				<View style={{alignItems:'center', justifyContent:'center'}}>
					<Image style={styles.image} source={{uri:'https://i.imgur.com/r2oC9Jo.png'}}/>	
				</View>
				<View>
					<Text style={{...styles.text, color:'#3f51b5', fontSize:29,}}>timestamp: {this.props.location.timestamp}</Text>
					<Text style={styles.text}>latitude: {this.props.location.coords.latitude}</Text>
					<Text style={styles.text}>longitude: {this.props.location.coords.longitude}</Text>
				</View>
				<Switch style={{ margin: 15 }} trackColor={{ false: "#767577", true: "#81b0ff" }} thumbColor={(this.state.switchOn) ? "#3f51b5" : "#f4f3f4"} value={this.state.switchOn} onValueChange={() => 
					this.changeValue(this.state.switchOn)
					} />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		flexDirection:'row',
		margin: 15,
	},

	image:{
		width:80,
		height:80,
		resizeMode: 'cover',
	},

	text:{
		marginLeft:10,
		fontSize:20,
		color:'#686868',
		flexWrap:'wrap',
		fontWeight:'400'
	},
})