import React from 'react';
import { render } from 'react-dom';
import App from './components/App/AppContainer';

import '../sass/scaffold.scss';

render(<App />, document.querySelector('.app'));
