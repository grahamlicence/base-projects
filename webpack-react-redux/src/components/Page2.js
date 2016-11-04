import React from 'react';
import { Link } from 'react-router';
import Amount from '../containers/Amount';

const Page2 = () => (
  <div>
    <Link to="/">Home</Link>
    <p>page 2</p>
    <Amount />
  </div>
);

export default Page2;