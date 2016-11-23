import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { compose, createStore } from 'redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import persistState from 'redux-localstorage'
import registraions from './reducers';
import App from './components/App';
import Page2 from './components/Page2';
import Home from './components/Home';
import './sass/scaffold.scss';

const enhancer = compose(
    persistState()
);

const store = createStore(registraions, enhancer);

const history = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                <Route path="page2" component={Page2}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
