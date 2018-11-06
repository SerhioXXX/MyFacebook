// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route, Redirect } from 'react-router-dom';

//Components
import Catcher from 'components/Catcher';
import Feed from 'components/Feed';
import Profile from 'components/Profile';
import StatusBar from 'components/StatusBar';
import Login from 'components/Login';
import { Provider } from 'components/HOC/withProfile';

//Instruments
import avatar from 'theme/assets/lisa';

@hot(module)
export default class App extends Component {

    constructor () {
        super();

        this.state = {
            avatar,
            currentUserFirstName: 'Сергей',
            currentUserLastName:  'Мельник',
            isAuthenticated:      false,
            _logOut:              this._logOut,
        };
    }

    componentDidMount () {

        this._ls();
    }

     _ls = () => {

         this.setState({
             isAuthenticated: !localStorage.getItem('isAuthenticated'),
         });
     };

    _logIn = () => {
        this.setState({
            isAuthenticated: true,
        });
        localStorage.setItem('isAuthenticated', true);
    }

    _logOut = () => {
        this.setState({
            isAuthenticated: false,
        });
        localStorage.setItem('isAuthenticated', false);
    }

    render () {
        const { isAuthenticated } = this.state;

        return (
            <Catcher>
                <Provider value = { this.state }>
                    <StatusBar />
                    <Switch>
                        <Route
                            path = '/login' render = { () => (
                                <Login _logIn = { this._logIn } />
                            ) }
                        />
                        { !isAuthenticated && <Redirect to = '/login' />}
                        <Route component = { Feed } path = '/feed' />
                        <Route component = { Profile } path = '/profile' />
                        <Redirect to = '/profile' />
                    </Switch>
                </Provider>
            </Catcher>
        );
    }
}
