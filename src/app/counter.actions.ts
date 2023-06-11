// import { createAction, props } from '@ngrx/store';

// export const increment = createAction('[Counter Component] Increment');
// export const decrement = createAction('[Counter Component] Decrement');
// export const reset = createAction('[Counter Component] Reset');
// export const incrementByValue = createAction('[Counter Component] IncrementByValue', props<{ value: number}>());

// method 2
import { Action } from '@ngrx/store';

export enum ActionTypes {
  IncrementCount = '[Counter Component] Increment',
  DecrementCount = '[Counter Component] Decrement',
  ResetCount = '[Counter Component] Reset',
  IncrementByValue = '[Counter Component] IncrementByValue',
}

export class IncrementCount implements Action {
  readonly type = ActionTypes.IncrementCount;
}

export class DecrementCount implements Action {
  readonly type = ActionTypes.DecrementCount;
}

export class ResetCount implements Action {
  readonly type = ActionTypes.ResetCount;
}

export class IncrementCountByValue implements Action {
  readonly type = ActionTypes.IncrementByValue;

  constructor(public payload: { value: number }) {}
}

export type ActionsUnion =
  | IncrementCount
  | DecrementCount
  | ResetCount
  | IncrementCountByValue;