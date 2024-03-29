import {AppRegistry, Image, BackHandler, ToastAndroid} from 'react-native';
import React, {Component} from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation';
import PopularTab from "./pages/tabs/PopularTab";
import TrendingTab from "./pages/tabs/TrendingTab";
import FavoritesTab from "./pages/tabs/FavoritesTab";
import MineTab from "./pages/tabs/MineTab";
import WelcomePage from "./pages/WelcomePage";
import CustomKeyPage from "./pages/other/CustomKeyPage";
import SortKeyPage from "./pages/other/SortKeyPage";
import PopularDetailPage from "./pages/tabs/PopularDetailPage";
import AboutAppPage from "./pages/about/AboutAppPage";
import AuthorMainPage from "./pages/about/AuthorMainPage";
import AboutAuthorPage from "./pages/about/AboutAuthorPage";
import SearchTab from "./pages/tabs/SearchTab";


const tab = TabNavigator(
    {
        Popular: {
            screen: PopularTab,
            navigationOptions: {
                tabBarLable: 'Popular',
                header: null,
                tabBarIcon: ({tintColor, focused}) => (
                    focused
                        ?
                        <Image source={require("./imgs/tab_mine_pressed.png")} style={{height: 20, width: 20}}/>
                        :
                        <Image source={require("./imgs/tab_mine_normal.png")} style={{height: 20, width: 20}}/>
                ),
            }
        },


        Trending: {
            screen: TrendingTab,
            navigationOptions: {
                tabBarLable: 'Trending',
                header: null,
                tabBarIcon: ({tintColor, focused}) => (
                    focused
                        ?
                        <Image source={require("./imgs/tab_mine_pressed.png")} style={{height: 20, width: 20}}/>
                        :
                        <Image source={require("./imgs/tab_mine_normal.png")} style={{height: 20, width: 20}}/>
                ),
            }
        },

        Favorites: {
            screen: FavoritesTab,
            navigationOptions: {
                tabBarLable: 'Favorites',
                header: null,
                tabBarIcon: ({tintColor, focused}) => (
                    focused
                        ?
                        <Image source={require("./imgs/tab_mine_pressed.png")} style={{height: 20, width: 20}}/>
                        :
                        <Image source={require("./imgs/tab_mine_normal.png")} style={{height: 20, width: 20}}/>
                ),
            }
        },

        Mine: {
            screen: MineTab,
            navigationOptions: {
                tabBarLable: 'Mine',
                header: null,
                tabBarIcon: ({tintColor, focused}) => (
                    focused
                        ?
                        <Image source={require("./imgs/tab_mine_pressed.png")} style={{height: 20, width: 20}}/>
                        :
                        <Image source={require("./imgs/tab_mine_normal.png")} style={{height: 20, width: 20}}/>
                ),
            }
        },
    },
    {
        animationEnabled: true,
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        backBehavior: 'none',
        tabBarOptions: {
            activeTintColor: 'blue',
            inactiveTintColor: 'gray',
            showIcon: true,//是否显示图标
            showLabel: true,//是否显示文字
            indicatorStyle: {
                height: 0,
            },
            style: {
                backgroundColor: 'transparent',
                height: 60,
            },
            pressColor: 'gray',
            pressOpacity: 0.8,
            upperCaseLabel: false,
        },

    }
)

export const AppNavigator = StackNavigator(
    {
        Welcome: {
            screen: WelcomePage,
            navigationOptions: {
                header: null,
            }
        },
        Tab: {
            screen: tab
        },
        CustomKeyPage: {
            screen: CustomKeyPage,
            navigationOptions: {
                header: null,
            }
        },
        SortKeyPage: {
            screen: SortKeyPage,
            navigationOptions: {
                header: null,
            }
        },
        PopularDetailPage: {
            screen: PopularDetailPage,
            navigationOptions: {
                header: null,
            }
        },
        AboutAppPage: {
            screen: AboutAppPage,
            navigationOptions: {
                header: null,
            }
        },
        AuthorMainPage: {
            screen: AuthorMainPage,
            navigationOptions: {
                header: null,
            }
        },
        AboutAuthorPage: {
            screen: AboutAuthorPage,
            navigationOptions: {
                header: null,
            }
        },
        SearchTab: {
            screen: SearchTab,
            navigationOptions: {
                header: null,
            }
        }
    },
)




