// import { createReducer, on } from '@ngrx/store';
// import { increment, decrement, reset, incrementByValue } from './counter.actions';

// export const initialState = 0;

// export const counterReducer = createReducer(
//   initialState,
//   on(increment, (state) => state + 1),
//   on(decrement, (state) => state - 1),
//   on(incrementByValue, (state, payload) => state + payload.value),
//   on(reset, (state) => 0)
// );

// method 2
import { ActionTypes, ActionsUnion } from './counter.actions';

export type State = number;

export const initialState: State = 0;

export const counterReducer = (
  state = initialState,
  action: ActionsUnion
): State => {
  switch (action.type) {
    case ActionTypes.IncrementCount: {
      return state + 1;
    }

    case ActionTypes.DecrementCount: {
      return state - 1;
    }

    case ActionTypes.ResetCount: {
      return 0;
    }

    case ActionTypes.IncrementByValue: {
      return state + action.payload.value;
    }

    default: {
      return state;
    }
  }
};
