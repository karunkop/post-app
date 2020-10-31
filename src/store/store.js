import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import { rootReducer } from '../reducers/rootReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const composeEnhancers = composeWithDevTools({ trace: true })

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store