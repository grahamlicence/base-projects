import React, { Component } from 'react';
import Header from '../common/Header';

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
        return (
            <main className="main-content">
                <Header />
                <p>{'{'} Insert app here {this.state.clap ? '🙏' : '🙌'} {'}'}</p>
            </main>
        );
    }
}

export default App;
