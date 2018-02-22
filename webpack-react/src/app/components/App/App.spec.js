import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import App from './App';

describe('<App />', () => {

    describe('renders', () => {
        const wrapper = shallow(<App />);

        it('correctly', () => {
            expect(wrapper.find('.main-content')).to.have.length(1);
        });
    });

});
