import {AppNavigator} from "./AppNavigator";
import NavigatorService from "./pages/other/NavigatorService"
import React, {Component} from 'react';

export default class App extends Component<Props> {
    render() {
        return (
            <AppNavigator
                ref={navigatorRef => {
                    NavigatorService.setContainer(navigatorRef);
                }}

            />
        );
    }
}