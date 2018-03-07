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
    ToastAndroid,
    Dimensions
} from 'react-native';
import CustomNavBar from "./CustomNavBar"
import DataUtil, {FLAG} from "../Utils/DataUtil";

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
var ScreenWidth = Dimensions.get('window').width;
export default class CustomKeyPage extends Component<Props> {

    constructor(props) {
        super();
        this.du = new DataUtil(FLAG.all_language);
        this.state = {
            dataArray: []
        }


        this.saveKey = this.saveKey.bind(this);
        this.gotoLastPage = this.gotoLastPage.bind(this);
        this.loadData = this.loadData.bind(this);
    }


    componentDidMount() {
        this.loadData();
    }


    loadData() {
        this.du.getAllLanguage()
            .then(result => {
                this.setState({
                    dataArray: result
                })
            })
            .catch(error=>{
                console.log(error)
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <CustomNavBar
                    title="自定义标签栏"
                    rightStr="保存"
                    leftBtnClick={this.gotoLastPage}
                    rightBtnClick={this.saveKey}
                />
                <Text style={{width: ScreenWidth, height: 500}}>
                    {JSON.stringify(this.state.dataArray)}
                </Text>


            </View>
        );
    }


    saveKey() {
        ToastAndroid.show("保存", 1000)
    }

    gotoLastPage() {
        this.props.navigation.goBack()
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
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
