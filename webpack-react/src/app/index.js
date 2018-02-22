import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/App/App';

import '../sass/scaffold.scss';

const rootEl = document.querySelector('.app');

render(
    <AppContainer>
        <App />
    </AppContainer>,
    rootEl
);

if (module.hot) {
    module.hot.accept('./components/App', () => {
        const App = require('./components/App').default;

        render(
            <AppContainer>
                <App />
            </AppContainer>,
        rootEl);
    });
}
