const count = (state = {}, action) => {
    switch (action.type) {
        case 'UP':
        return {
            amount: state.amount + 1
        };
        
        case 'DOWN':
        return {
            amount: state.amount - 1
        };
        
        default:
        return state;
    }
}

export default count;