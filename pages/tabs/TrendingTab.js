/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Menu,
    MenuProvider,
    MenuOptions,
    MenuTrigger,
    renderers,
    MenuOption
} from 'react-native-popup-menu';
import DataUtil, {FLAG,FAVORITE_FLAG} from "../Utils/DataUtil"
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
import NetUtil from "../Utils/NetUtil";
import TrendingItemView from "../../itemViews/TrendingItemView";
import {NET_FLAG} from "../Utils/NetUtil";
import TimeSpan from "../other/TimeSpan";
import ItemModel from "../other/ItemModel";
import ArrayUtil from "../Utils/ArrayUtil";

const API_URL = 'https://github.com/trending/'
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


let TimeSpans = [new TimeSpan("今天", "since=daily"), new TimeSpan("本周", "since=weekly"), new TimeSpan("本月", "since=monthly")];
const width = Dimensions.get("window").width;
const { Popover } = renderers;

export default class TrendingTab extends Component<Props> {
    constructor(props) {
        super(props);
        this.du = new DataUtil(FLAG.all_language, NET_FLAG.Trending);
        this.state = {
            result: "",
            TimeSpan: TimeSpans[0],
            tabValues: []
        }
        this.onMenuSelected = this.onMenuSelected.bind(this)
    }

    componentDidMount() {
        this.loadData();
    }


    loadData() {
        this.du.getkeys()
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
            <MenuProvider style={{flex: 1}} customStyles={{backdrop: styles.bg}}>
                <View style={styles.container}>
                    <View style={styles.title}>
                        <Image source={require("../../imgs/ic_arrow_back_white_36pt.png")}
                               style={{height: 25, width: 25, marginLeft: 20}}>
                        </Image>


                        <Menu renderer={Popover} rendererProps={{preferredPlacement: 'bottom'}}>
                            <MenuTrigger text={this.state.TimeSpan.showText}
                                         customStyles={customStyles = {triggerText: styles.popsel}}/>
                            <MenuOptions
                                customStyles={{optionText: styles.option, optionsWrapper: styles.optionContent}}>
                                <MenuOption value={1} onSelect={() => this.onMenuSelected(1)}>
                                    <Text style={{
                                        color: 'white',
                                        fontSize: 16,
                                        flex: 1,
                                        textAlign: "center"
                                    }}>{TimeSpans[0].showText}</Text>
                                </MenuOption>
                                <MenuOption value={2} onSelect={() => this.onMenuSelected(2)}>
                                    <Text style={{
                                        color: 'white',
                                        fontSize: 16,
                                        flex: 1,
                                        textAlign: "center"
                                    }}>{TimeSpans[1].showText}</Text>
                                </MenuOption>
                                <MenuOption value={3} onSelect={() => this.onMenuSelected(3)}>
                                    <Text style={{
                                        color: 'white',
                                        fontSize: 16,
                                        flex: 1,
                                        textAlign: "center"
                                    }}>{TimeSpans[2].showText}</Text>
                                </MenuOption>
                            </MenuOptions>
                        </Menu>


                        <Image source={require("../../imgs/ic_more_vert_white_48pt.png")}
                               style={{height: 25, width: 25, marginLeft: 20}}>
                        </Image>
                    </View>

                    <View style={{height: 1, width: width, backgroundColor: "white"}}/>
                    <ScrollableTabView
                        renderTabBar={() => <ScrollableTabBar/>}
                        initialPage={1}
                        locked={false}
                        scrollWithoutAnimation={false}
                        tabBarUnderlineStyle={styles.lineStyle}
                        tabBarBackgroundColor={"#377DFE"}
                        tabBarActiveTextColor={"#E61A5F"}
                        tabBarInactiveTextColor={"white"}
                        tabBarTextStyle={{textAlign: 'center', width: width / 4}}>

                        {this.state.tabValues.map((result, i, array) => {
                            let tab = array[i];
                            return tab.checked ? <TrendingLabel style={{width:50}} key={i} tabLabel={tab.name}
                                                                TimeSpan={this.state.TimeSpan}{...this.props}>

                            </TrendingLabel> : null;
                        })}


                    </ScrollableTabView>


                </View>
            </MenuProvider>
        );


    }


    onMenuSelected(value) {
        this.setState({
            TimeSpan: TimeSpans[value - 1]
        })

    }

}


class TrendingLabel extends Component {
    constructor(props) {
        super(props);
        this.dd = new DataUtil(FLAG.all_language, NET_FLAG.Trending);
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
        this.loadPopularData(this.props.TimeSpan);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.TimeSpan !== nextProps.TimeSpan) {
            this.loadPopularData(nextProps.TimeSpan)
        }
    }

    loadPopularData(ts) {
        var netUrl = API_URL + this.props.tabLabel + "?" + ts.searchText;
        console.log(netUrl)
        this.dd.getData(netUrl)
            .then((result) => {
                let items = result && result.items ? result.items : result ? result : [];
                console.log(items)

                if (result && result.updateTime && !this.dd.checkDate(result.updateTime)) {
                    return NetUtil.get(netUrl);
                } else {
                    this.datas = items;
                    this.refreshData();
                    // this.setState({
                    //     dataSource: this.state.dataSource.cloneWithRows(items),
                    // })
                }
            })
            .then(result => {
                if (result && result.items) {
                    // this.setState({
                    //     dataSource: this.state.dataSource.cloneWithRows(result.items),
                    // })
                    this.datas = JSON.parse(result.items);
                    this.refreshData();
                }
            })


    }


    refreshData(){
        let itemModels = [];

        this.dd.getAllFavoriteIds(FAVORITE_FLAG.trending_flag)
            .then((result)=>{
                let len = this.datas.length;
                if(result === null || result.length === 0){
                    for (let i = 0; i < len; i++) {
                        itemModels.push(new ItemModel(this.datas[i], false));
                    }
                }else{
                    for (let i = 0; i < len; i++) {
                        let isFavorite = ArrayUtil.isCon(result,this.datas[i].fullName);
                        console.log("id="+this.datas[i].fullName+"      isFavorite="+isFavorite+"")
                        itemModels.push(new ItemModel(this.datas[i], ArrayUtil.isCon(result,this.datas[i].fullName)));
                    }
                }
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(itemModels),
                })
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
                                 onSelect={() => this.props.navigation.navigate("PopularDetailPage", {data: rowdata,flag:"Trending"})}
                                 onFavoriteClick={() => this.onFavoriteClick(rowdata)}
        />
    }


    onFavoriteClick(itemModel){
        itemModel.isFavorite = !itemModel.isFavorite;
        ToastAndroid.show(JSON.stringify(itemModel.item) + "", 1000);
        this.dd.upDateFavorite(FAVORITE_FLAG.trending_flag, itemModel.item);
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
        width: width / 4,
        height: 2,
        backgroundColor: '#FF0000',
    },
    popsel: {
        width: 50,
        height: 30,
        borderWidth: 1,
        borderColor: "white",
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5,
        alignItems: 'center',
        alignSelf: 'center',
        color: "white"
    },
    option: {
        fontSize: 16,
        color: "#377DFE",
        width: 100,
        textAlign: "center",
        backgroundColor: '#377DFE'
    },
    optionContent: {
        color: "#377DFE",
        width: 80,
        textAlign: 'center',
        backgroundColor: '#377DFE'
    },
    bg: {
        backgroundColor: "white"
    }
});
