import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.state';


const getAppState = createFeatureSelector<AppState>('cart');

export const getCartData = createSelector(getAppState, (state) => {
  return state.cart;
});
