import React from 'react';
import { connect } from 'react-redux';
import { up, down } from '../actions';

const mapStateToProps = (state) => {
    return {
        amount: state.count.amount
    }
};

const TotalAmount = ({ dispatch, amount }) => {
    const upClick = () => dispatch(up());
    const downClick = () => dispatch(down());

    return (
        <div className="amount">
            <p>{amount}</p>
            <button onClick={upClick}>up ⬆</button>
            <button onClick={downClick}>down ⬇</button>
        </div>
    )
};

const Amount = connect(mapStateToProps)(TotalAmount);

export default Amount;