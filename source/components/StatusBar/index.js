//Core
import React, { Component } from 'react';
import cx from 'classnames';

//Components
import { withProfile } from 'components/HOC/withProfile';

//Instruments
import Styles from './styles.m.css';
import { socket } from 'socket/init';

@withProfile
export default class StatusBar extends Component {
    state = {
        online: false,
    };

    componentDidMount () {
        socket.on('connect', () => {
            this.setState({
                online: true,
            });
        });

        socket.on('disconect', () => {
            this.setState({
                online: false,
            });
        });
    }

    componentWillUnmount () {
        socket.removeListener('connect');
        socket.removeListener('disconect');
    }

    render () {
        const { avatar, currentUserFirstName, currentUserLastName } = this.props;
        const { online, offline } = this.state;

        const statusStyle = cx(Styles.status, {
            [Styles.online]:  online,
            [Styles.offline]: !online,
        });

        const statusMessage = online ? 'Online' : 'Offline';

        console.log('online', online);
        console.log('offline', offline);

        return (
            <section className = { Styles.statusBar }>
                <div className = { statusStyle }>
                    <div>{statusMessage}</div>
                    <span />
                </div>
                <button>
                    <img src = { avatar } />
                    <span>{ currentUserFirstName }</span>
                &nbsp;
                    <span>{ currentUserLastName }</span>
                </button>
            </section>
        );
    }
}
