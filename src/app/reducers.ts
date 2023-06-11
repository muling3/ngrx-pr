import { State,  counterReducer } from './counter.reducer';
import { ActionReducerMap } from '@ngrx/store';


export const rootReducer = {};

export interface AppState {
    count: State;
};


export const reducers: ActionReducerMap<AppState, any> = {
    count: counterReducer
};