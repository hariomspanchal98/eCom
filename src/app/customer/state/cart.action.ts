import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/services/product.model';


export const updateCart = createAction(
  'update cart',
  props<{ items: Product[] }>()
);