import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware, { ThunkMiddleware } from 'redux-thunk'
import { rootReducer, State } from '../reducers/rootReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const composeEnhancers = composeWithDevTools({ trace: true })

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware as ThunkMiddleware<State>)))

export default store