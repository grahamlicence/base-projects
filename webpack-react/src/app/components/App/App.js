import React, { Component } from 'react';
import Header from '../common/Header';

import './App.scss';

class App extends Component {

    constructor(props) {
        super(props);

        console.log('we have an app 🙌');

        this.state = {
            clap: true
        };

        this.interval = null;

        this.clap = this.clap.bind(this);
    }

    componentDidMount() {
        this.interval = setInterval(this.clap, 500);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    clap() {
        this.setState({
            clap: !this.state.clap
        });
    }
    
    render() {
        const hands = this.state.clap ? '🙏' : '🙌';

        return (
            <main className="main-content">
                <Header />
                <p>{'{'} Insert app here {hands} {'}'}</p>
            </main>
        );
    }
}

export default App;
