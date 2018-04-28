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
    Dimensions,
    ToastAndroid,
    RefreshControl,
    ActivityIndicator,
    ListView
} from 'react-native';
import ScrollableTabView, {ScrollableTabBar, DefaultTabBar} from "react-native-scrollable-tab-view";
import NetUtil from "../Utils/NetUtil";
import PopularItemView from "../../itemViews/PopularItemView";
import DataUtil, {FLAG, FAVORITE_FLAG} from "../Utils/DataUtil"
import {NET_FLAG} from "../Utils/NetUtil";
import ItemModel from "../other/ItemModel";
import ArrayUtil from "../Utils/ArrayUtil";

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

var ScreenWidth = Dimensions.get('window').width;
var tabValue = ["Android", "IOS", "JAVA", "JavaSript", "Android", "IOS", "JAVA", "JavaSript"];
export default class PopularTab extends Component<Props> {
    constructor(props) {
        super(props);
        this.du = new DataUtil(FLAG.hot_language, NET_FLAG.Popular)
        this.state = {
            result: "",
            tabValues: []
        }
        this.renderTabItems = this.renderTabItems.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }


    render() {
        return (
            <View style={stys.container}>
                <ScrollableTabView
                    renderTabBar={() => <ScrollableTabBar/>}
                    initialPage={0}
                    locked={false}
                    scrollWithoutAnimation={true}
                    tabBarUnderlineStyle={stys.lineStyle}
                    tabBarBackgroundColor={"#377DFE"}
                    tabBarActiveTextColor={"#E61A5F"}
                    tabBarInactiveTextColor={"white"}
                    tabBarTextStyle={{textAlign: 'center'}}>
                    {this.state.tabValues.map((result, i, array) => {
                        let tab = array[i];
                        return tab.checked ?
                            <PopularLabel key={i} tabLabel={tab.name} {...this.props} style={{textAlign: 'center'}}>

                            </PopularLabel> : null;
                    })}
                </ScrollableTabView>
            </View>
        );
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

    renderTabItems() {
        let length = tabValue.length;
        let views = [];
        for (var i = 0; i < length; i++) {
            views.push(<PopularLabel key={i} tabLabel={tabValue[i]}/>)
        }
        return views;
    }

    onItemSelect(rowdata) {
        this.props.navigate("PopularDetailPage", {url: "https://www.imooc.com/u/4146209"})
    }
}

class PopularLabel extends Component {
    constructor(props) {
        super(props);
        this.dd = new DataUtil(FLAG.hot_language, NET_FLAG.Popular);
        this.state = {
            refreshing: false,
            loadingMore: false,
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        }
        this.renderFooterView = this.renderFooterView.bind(this);
        this.reloadWordData = this.reloadWordData.bind(this);
        this.renderItemView = this.renderItemView.bind(this);
        this.flushDadaSource = this.flushDadaSource.bind(this);


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
                    enableEmptySections={true}
                    onEndReachedThreshold={5}
                />
            </View>

        )
    }

    componentDidMount() {
        this.loadPopularData();
    }

    loadPopularData() {
        var netUrl = URL + this.props.tabLabel + QUERY_STR;
        console.log(netUrl)
        this.dd.getData(netUrl)
            .then((result) => {
                /*var items = result && result.items ? result.items : [];
                console.log(result.updateTime)
                if (result && result.updateTime && !this.dd.checkDate(result.updateTime)) {
                    return NetUtil.get(netUrl, NET_FLAG.Popular);
                }
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(items),
                })*/
                this.datas = result && result.items ? result.items : [];

                if (result && result.updateTime && !this.dd.checkDate(result.updateTime)) {
                    return NetUtil.get(netUrl, NET_FLAG.Popular);
                }
                this.flushDadaSource();


            })
            .then(result => {
                if (result && result.items) {
                    // var items = JSON.parse(result.items);
                    // console.log("网络数据----->" + JSON.stringify(items))
                    // this.setState({
                    //     dataSource: this.state.dataSource.cloneWithRows(items),
                    // })
                    this.datas = JSON.parse(result.items);
                    this.flushDadaSource();

                }
            })


    }

    flushDadaSource() {

        let itemModels = [];
        let len = this.datas.length;
        //获取所有已收藏的条目的id
        this.dd.getAllFavoriteIds(FAVORITE_FLAG.popular_flag)
            .then((result) => {
               if(result === null || result.length === 0){
                   for (let i = 0; i < len; i++) {
                       itemModels.push(new ItemModel(this.datas[i], false));
                   }
               }else{
                   for (let i = 0; i < len; i++) {
                       let isFavorite = ArrayUtil.isCon(result,this.datas[i].id);
                       console.log("id="+this.datas[i].id+"      isFavorite="+isFavorite+"")
                       itemModels.push(new ItemModel(this.datas[i], ArrayUtil.isCon(result,this.datas[i].id)));
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
        // return <PopularItemView data={rowdata}
        //                         onSelect={() => this.props.navigation.navigate("PopularDetailPage", {data: rowdata})}/>

        return <PopularItemView itemModel={rowdata}
                                onSelect={() => this.props.navigation.navigate("PopularDetailPage", {data: rowdata.item})}
                                onFavoriteClick={() => this.onFavoriteClick(rowdata)}

        />
    }

    onFavoriteClick(rowdata) {
        rowdata.isFavorite = !rowdata.isFavorite;
        ToastAndroid.show(rowdata.item.stargazers_count + "", 1000);
        this.dd.upDateFavorite(FAVORITE_FLAG.popular_flag, rowdata.item);
    }
}


const stys = StyleSheet.create({
    container: {
        flex: 1,
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
    lineStyle: {

        height: 2,
        backgroundColor: '#FF0000',
    },
    content: {
        width: ScreenWidth,
        height: 100,
        borderWidth: 1,
        borderColor: "red",
    },
    lv: {
        flex: 1,
    }

});
