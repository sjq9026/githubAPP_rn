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
    Image,
    Alert
} from 'react-native';
import CustomNavBar from "./CustomNavBar"
import DataUtil, {FLAG} from "../Utils/DataUtil";
import CheckBox from 'react-native-check-box'
import ArrayUtil from "../Utils/ArrayUtil";

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
            dataArray: [],
            changeValues: []
        }


        this.gotoLastPage = this.gotoLastPage.bind(this);
        this.loadData = this.loadData.bind(this);
        this.renderKeyView = this.renderKeyView.bind(this);
        this.saveKey = this.saveKey.bind(this);
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
        console.log("AAA", "自定义标签页数据------>" + JSON.stringify(this.state.dataArray));
    }

    render() {
        let title = this.props.navigation.state.params.isRemove ? "移除标签" : "自定义标签";
        let right = this.props.navigation.state.params.isRemove ? "删除" : "保存";
        return (
            <View style={styles.container}>
                <CustomNavBar
                    title={title}
                    rightStr={right}
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
        if (this.props.navigation.state.params.isRemove) {
            for (let i = 0, j = this.state.changeValues.length; i < j; i++) {
                ArrayUtil.removeArray(this.state.dataArray, this.state.changeValues[i]);
            }
            this.du.saveAllLanguage(this.state.dataArray);
            this.props.navigation.goBack();
            ToastAndroid.show("删除后保存", 1000)
        } else {
            this.du.saveAllLanguage(this.state.dataArray);
            this.props.navigation.goBack();
            ToastAndroid.show("保存", 1000)
        }
    }

    gotoLastPage() {
        if (this.state.changeValues.length === 0) {
            this.props.navigation.goBack();
            return;
        }
        Alert.alert(
            '提示',
            '是否保存所做的修改？',
            [

                {
                    text: '不保存', onPress: () => {
                    this.props.navigation.goBack();
                }
                },
                {
                    text: '保存', onPress: () => {
                    this.saveKey()
                }
                },
            ],
            {cancelable: false}
        )


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
                        {this.renderCheckBox(this.state.dataArray[i + 1])}
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


    renderCheckBox(data) {
        console.log(JSON.stringify(data))
        let isCheck = this.props.navigation.state.params.isRemove ? false : data.checked;
        return (
            <CheckBox
                style={{flex: 1, padding: 10}}
                onClick={() => this.onClick(data)}
                isChecked={isCheck}
                isIndeterminate={false}
                leftText={data.name}
                checkedImage={<Image style={{tintColor: "#6495ED"}} source={require("../../imgs/ic_check_box.png")}/>}
                unCheckedImage={<Image style={{tintColor: "#6495ED"}}
                                       source={require("../../imgs/ic_check_box_outline_blank.png")}/>}
            />
        )
    }

    onClick(data) {
        //不是自定义标签页  不用改变标签状态，只添加就可以
        if (!this.props.navigation.state.isRemove) {
            data.checked = !data.checked;
        }

        var len = this.state.changeValues.length;
        for (var i = 0; i < len; i++) {
            if (this.state.changeValues[i] === data) {
                this.state.changeValues.splice(i, 1);
                return;
            }
        }

        this.state.changeValues.push(data)

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
