import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'

export default class MyButton extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let useStyle = {}
        let fontColor = {}
        let fontS = 20
        let backgroundColor = {}
        let fontBoldness = 'bold'
        let myFont = ''
        if (this.props.style) useStyle = this.props.style
        if (this.props.style?.fontSize) fontS = this.props.style.fontSize
        if (this.props.style?.color) fontColor = this.props.style.color
        if (this.props.style?.backgroundColor) backgroundColor = this.props.style.backgroundColor
        if (this.props.style?.fontWeight) fontBoldness = this.props.style.fontWeight
        if (this.props.style?.fontFamily) myFont = this.props.style.fontFamily

        return this.props.customFont? (
            <TouchableOpacity style={{ ...useStyle }} onPress={this.props.onPress}>
                <View style={{ ...styles.container, borderWidth: 0, margin: 0, backgroundColor: backgroundColor }}>
                    <Text style={{fontFamily:'myFont', fontSize: fontS, color: fontColor, textAlign: 'center' }}>{this.props.title}</Text>
                </View>
            </TouchableOpacity>
        ): (
            <TouchableOpacity style={{ ...useStyle }} onPress={this.props.onPress}>
                <View style={{ ...styles.container, borderWidth: 0, margin: 0, backgroundColor: backgroundColor }}>
                    <Text style={{fontStyle: 'italic', fontSize: fontS, fontWeight: fontBoldness, color: fontColor, textAlign: 'center' }}>{this.props.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1.5,
        margin: 5,
        padding: 2,
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
        fontSize: 24,
        borderRadius: 10,
        backgroundColor: '#76ffac',
        justifyContent: 'center',
        alignItems: 'center',
    }
})