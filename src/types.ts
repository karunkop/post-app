import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { State } from './reducers/rootReducer'

/** A basic Redux action creator thunk with no arguments. */
export type ActionCreator = ((dispatch: ThunkDispatch<State, never, Action<string>>, getState: () => State) => any)