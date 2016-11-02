import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

const registraions = combineReducers({
    routing: routerReducer,
    form: formReducer 
})

export default registraions