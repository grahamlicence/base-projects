import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import count from './count'

const registraions = combineReducers({
    count,
    routing: routerReducer,
    form: formReducer 
})

export default registraions