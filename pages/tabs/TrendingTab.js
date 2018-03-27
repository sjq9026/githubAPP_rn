/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {MenuProvider} from 'react-native-popup-menu';
import DataUtil, {FLAG} from "../Utils/DataUtil"
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    RefreshControl,
    Dimensions,
    TouchableOpacity,
    TouchableHighlight,
    ListView,
    ToastAndroid,
    ActivityIndicator,
} from 'react-native';
import ScrollableTabView, {ScrollableTabBar, DefaultTabBar} from "react-native-scrollable-tab-view";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import TrendingItemView from "../../itemViews/TrendingItemView";

const API_URL = 'https://github.com/trending/'
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
const width = Dimensions.get("window").width;
export default class TrendingTab extends Component<Props> {
    constructor(props) {
        super(props);
        this.du = new DataUtil(FLAG.all_language)
        this.state = {
            result: "",
            tabValues: []
        }
    }

    componentDidMount() {
        this.loadData();
    }


    loadData() {
        this.du.getAllLanguage()
            .then(result => {
                this.setState({
                    tabValues: result
                })
            })
            .catch(error => {
                console.log(error)
            })
    }


    render() {
        return (
            <MenuProvider style={{flex: 1}}>
                <View style={styles.container}>
                    <View style={styles.title}>
                        <Image source={require("../../imgs/ic_arrow_back_white_36pt.png")}
                               style={{height: 25, width: 25, marginLeft: 20}}>
                        </Image>
                        <Text style={{color: "white", fontSize: 16}}>Trending</Text>

                        <Image source={require("../../imgs/ic_more_vert_white_48pt.png")}
                               style={{height: 25, width: 25, marginLeft: 20}}>
                        </Image>
                    </View>


                    <ScrollableTabView
                        renderTabBar={() => <ScrollableTabBar/>}
                        initialPage={1}
                        locked={false}
                        scrollWithoutAnimation={false}
                        tabBarUnderlineStyle={styles.lineStyle}
                        tabBarBackgroundColor={"#377DFE"}
                        tabBarActiveTextColor={"#E61A5F"}
                        tabBarInactiveTextColor={"white"}
                        tabBarTextStyle={{textAlign:'center',width:width/4}}>

                        {this.state.tabValues.map((result, i, array) => {
                            let tab = array[i];
                            return tab.checked ? <TrendingLabel key={i} tabLabel={tab.name} {...this.props}>

                            </TrendingLabel> : null;
                        })}


                    </ScrollableTabView>


                    <Menu onSelect={value => alert(`Selected number: ${value}`)}>
                        <MenuTrigger text="点击可以弹出下拉菜单" style={{borderWidth: 1, borderColor: "blue"}}/>
                        <MenuOptions>
                            <MenuOption value={1}>
                                <Text style={{color: 'red', fontSize: 16}}>Two</Text>
                            </MenuOption>
                            <MenuOption value={2}>
                                <Text style={{color: 'red', fontSize: 16}}>Two</Text>
                            </MenuOption>
                            <MenuOption value={3}>
                                <Text style={{color: 'red', fontSize: 16}}>Two</Text>
                            </MenuOption>
                        </MenuOptions>
                    </Menu>


                </View>
            </MenuProvider>
        );


    }

}


class TrendingLabel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            loadingMore: false,
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        }
        this.renderFooterView = this.renderFooterView.bind(this);
        this.reloadWordData = this.reloadWordData.bind(this);
        this.renderItemView = this.renderItemView.bind(this);
        this.reloadWordData();
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ListView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.reloadWordData}
                        />}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => this.renderItemView(rowData)}
                    renderFooter={this.renderFooterView}
                    onEndReached={this._toEnd.bind(this)}
                    onEndReachedThreshold={5}
                />
            </View>

        )
    }

    componentDidMount() {
        this.loadPopularData();
    }

    loadPopularData() {
        var netUrl = API_URL + this.props.tabLabel + "?" + "since=daily";
        console.log(netUrl)
        DataUtil.getData(netUrl)
            .then((result) => {
                let items = result && result.items ? result.items : result ? result : [];
                if (result && result.updateTime && !DataUtil.checkDate(result.updateTime)) {
                    return NetUtil.get(url);
                } else {
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(items),
                    })
                }
            })
            .then(result => {
                if (result && result.items) {
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(result.items),
                    })
                }
            })


    }

    reloadWordData() {
        /*  this.setState({
              refreshing:false
          })*/
    }

    renderFooterView() {
        if (this.state.loadingMore) {
            return (<ActivityIndicator style={{marginVertical: 20}}/>);
        } else {
            return (<View style={{marginVertical: 10}}>
                <Text>加载更多</Text>
            </View>);
        }
    }


    _toEnd() {
        this.setState({
            loadingMore: true
        });
        var t = this;

        ToastAndroid.show("加载更多", 1000);
        setInterval(function () {
            /* t.setState({
                 loadingMore:false
             })*/
        }, 2000);
    }

    renderItemView(rowdata) {
        return <TrendingItemView data={rowdata}
                                onSelect={() => this.props.navigation.navigate("PopularDetailPage", {data: rowdata})}/>
    }


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'flex-start',
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
    title: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 50,
        width: width,
        backgroundColor: "#377DFE"
    },
    lineStyle: {
        width:width/4,
        height: 2,
        backgroundColor: '#FF0000',
    },
});
