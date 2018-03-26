/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableHighlight
} from 'react-native';

var ScreenWidth = Dimensions.get('window').width;

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class CustomNavBar extends Component<Props> {

    constructor(props) {
        super();
    }


    render() {
        return (
            <View style={styles.container}>

                <TouchableHighlight onPress={() => this.props.leftBtnClick()}>

                    <Image source={require("../../imgs/ic_arrow_back_white_36pt.png")}
                           style={{height: 25, width: 25, marginLeft: 20}}>
                    </Image>
                </TouchableHighlight>
                <Text style={{fontSize: 18, color: "white"}}>{this.props.title}</Text>

                <TouchableHighlight onPress={() => this.props.rightBtnClick()}>
                    <Text style={{marginRight: 20, fontSize: 16, color: "white"}}>{this.props.rightStr}</Text>
                </TouchableHighlight>


            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        height: 45,
        width: ScreenWidth,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#377DFE',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
