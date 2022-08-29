import { Action, createReducer, on } from '@ngrx/store';
import { initialState } from './app.state';
import { updateCart } from './cart.action';

const _cartReducer = createReducer(
  initialState,
  on(updateCart, (state, action) => {
    let updatedCart = [...(action.items || [])];
    // updatedCart.push(action.value);

    return {
      ...state,
      cart: [...(updatedCart || [])],
    };
  }),
);

export function cartReducer(state:any, action:Action) {
  return _cartReducer(state, action);
}