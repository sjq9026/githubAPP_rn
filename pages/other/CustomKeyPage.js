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
    Dimensions,
    ScrollView,
    Image
} from 'react-native';
import CustomNavBar from "./CustomNavBar"
import DataUtil, {FLAG} from "../Utils/DataUtil";
import CheckBox from 'react-native-check-box'

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
        this.renderKeyView = this.renderKeyView.bind(this);
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
            .catch(error => {
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
                <ScrollView>
                    {this.renderKeyView()}
                </ScrollView>



            </View>
        );
    }


    saveKey() {
        ToastAndroid.show("保存", 1000)
    }

    gotoLastPage() {
        this.props.navigation.goBack()
    }


    renderKeyView() {
        if (!this.state.dataArray || this.state.dataArray.length === 0) return null;
        var views = [];
        let len = this.state.dataArray.length;
        for (let i = 0, j = len - 1; i < j; i += 2) {
            views.push(
                <View key={i}>
                    <View style={styles.cell}>
                        {this.renderCheckBox(this.state.dataArray[i])}
                        {this.renderCheckBox(this.state.dataArray[i+1])}
                    </View>
                </View>
            )
        }
        if (len % 2 !== 0) {
            views.push(
                <View key={len - 1}>
                    <View style={styles.cell}>
                        {this.renderCheckBox(this.state.dataArray[len - 1])}
                    </View>
                </View>
            )
        }


        return views;
    }


    renderCheckBox(data){
        console.log(JSON.stringify(data))
        return(
           <CheckBox
               style={{flex:1,padding:10}}
               onClick={()=>this.onClick(data)}
               isChecked={data.checked}
               isIndeterminate={false}
               leftText={data.name}
               checkedImage={<Image style={{tintColor:"#6495ED"}} source={require("../../imgs/ic_check_box.png")}/>}
               unCheckedImage={<Image style={{tintColor:"#6495ED"}} source={require("../../imgs/ic_check_box_outline_blank.png")}/>}
           />
        )
    }

    onClick(data) {
        data.checked = !data.checked;

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
    cell: {
        flexDirection: "row",
        alignItems: "center",
        width: ScreenWidth,
        borderBottomWidth: 1,
        borderBottomColor: 'black'
    }
});
