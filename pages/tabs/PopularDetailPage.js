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
    WebView
} from 'react-native';
import CustomNavBar from "../other/CustomNavBar";

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class PopularDetailPage extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            url: this.props.navigation.state.params.data.html_url,
            title: "",
            canGoBack: false
        }
        console.log(this.props.navigation.state.params.data)
    }


    render() {
        return (
            <View style={styles.container}>
                <CustomNavBar
                    leftBtnClick={() => {
                        this.leftBtnClick()
                    }}
                    title={this.state.title}
                    rightBtnClick={() => {
                        this.rightBtnClick()
                    }}
                    rightStr=""
                />


                <WebView source={{uri: this.props.navigation.state.params.data.html_url}}
                         ref="webview"
                         onNavigationStateChange={(e) => {
                             this.onWebViewStateChange(e)
                         }}


                />
            </View>
        );
    }

    leftBtnClick() {
        if (this.state.canGoBack) {
            this.refs.webview.goBack();
        }
    }

    rightBtnClick() {

    }

    onWebViewStateChange(e) {
        this.setState({
            canGoBack: e.canGoBack,
        })
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
