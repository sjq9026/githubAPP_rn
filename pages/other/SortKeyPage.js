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
    Alert,
    TouchableHighlight

} from 'react-native';
import CustomNavBar from "./CustomNavBar"
import DataUtil, {FLAG} from "../Utils/DataUtil";
import CheckBox from 'react-native-check-box'
import SortableListView from 'react-native-sortable-listview'
import ArrayUtil from "../Utils/ArrayUtil";

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
var ScreenWidth = Dimensions.get('window').width;
export default class SortKeyPage extends Component<Props> {
    constructor(props) {
        super();
        this.du = new DataUtil(FLAG.all_language);
        this.sortResultArray = [];
        this.state = {
            dataArray: [],
            checkedArray: [],
            originalCheckArray: []
        }
        this.gotoLastPage = this.gotoLastPage.bind(this);
        this.loadData = this.loadData.bind(this);
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
                if (result === null || result.length === 0) {
                    return;
                }
                let checked = [];
                for (let i = 0; i < result.length; i++) {
                    if (result[i].checked) {
                        checked.push(result[i]);
                    }
                }
                this.setState({
                    checkedArray: checked,
                    originalCheckArray: ArrayUtil.cloneArray(checked)
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
                    title="标签排序"
                    rightStr="保存"
                    leftBtnClick={this.gotoLastPage}
                    rightBtnClick={this.saveKey}
                />
                <SortableListView
                    data={this.state.checkedArray}
                    order={Object.keys(this.state.checkedArray)}
                    onRowMoved={(e) => {
                        this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0]);
                        this.forceUpdate();
                    }}
                    renderRow={row => <SortCell data={row} {...this.props}/>}
                />


            </View>
        );
    }


    saveKey() {
        /*思路是把原始所有的key，和用户订阅的key数据都复制一遍，然后在复制的所有key的数组中 根据未排序之前的位置，把排完序的key插入到这个位置*/
        sortResultArray = ArrayUtil.cloneArray(this.state.dataArray);
        let len = this.state.originalCheckArray.length;
        for (let i = 0; i < len; i++) {
            let data = this.state.originalCheckArray[i];
            let index = this.state.dataArray.indexOf(data);
            sortResultArray.splice(index, 1, this.state.checkedArray[i]);
        }
        this.du.saveAllLanguage(sortResultArray);
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
                    this.du.saveAllLanguage(this.state.dataArray);
                    this.props.navigation.goBack();
                }
                },
            ],
            {cancelable: false}
        )


    }


}


class SortCell extends Component {
    constructor(pro) {
        super(pro);
    }

    render() {
        return <TouchableHighlight style={styles.item} underlayColor={"#eee"}
                                   delayLongPress={500} {...this.props.sortHandlers}>
            <View style={{marginLeft: 10, flexDirection: 'row'}}>
                <Image source={require('../../imgs/ic_sort.png')}
                       style={{width: 24, height: 24, marginLeft: 15, tintColor: "#6495ED"}}/>
                <Text style={styles.str}>{this.props.data.name}</Text>

            </View>
        </TouchableHighlight>
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
    },
    item: {
        flexDirection: "row",
        width: ScreenWidth,
        backgroundColor: "#F8F8F8",
        borderBottomWidth: 1,
        alignItems: "center",
        borderColor: '#eee',
        height: 50,

    },
    str: {
        fontSize: 14,
        color: "black",
        marginLeft: 5
    }
});
