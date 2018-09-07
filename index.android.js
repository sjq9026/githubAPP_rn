import {AppRegistry, Image, BackHandler, ToastAndroid} from 'react-native';
import React, {Component} from 'react';
import {AppNavigator} from "./App";
import {StackNavigator, TabNavigator} from 'react-navigation';
import App from './App';
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




AppRegistry.registerComponent('githubApp', () => App);
