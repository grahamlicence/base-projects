import React, { Component } from 'react';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            count: 1
        };

        this.increaseCount = this.increaseCount.bind(this);
    }

    increaseCount() {
        this.setState({
            count: this.state.count + 1
        });
    }
    
    render() {
        return (
            <main className="main-content">
                <p>{'{'}Insert app here{'}'}</p>
                <p onClick={this.increaseCount}>Tot: {this.state.count}</p>
            </main>
        );
    }
}

export default App;
