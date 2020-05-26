import { ADD_QTY, RMV_QTY, DEL_ITEM, ADD_TO_CART, SHOW_CASE } from './types';

export function addProduct({ value }) {
  return {
    type: ADD_QTY,
    payload: { id: value },
  };
}

export function removeProduct({ value }) {
  return {
    type: RMV_QTY,
    payload: { id: value },
  };
}

export function deleteProduct({ value }) {
  return {
    type: DEL_ITEM,
    payload: { id: value },
  };
}

export function insertCart({ idAdd }) {
  return {
    type: ADD_TO_CART,
    payload: { idAdd },
  };
}

export function funcSubcategory({ value }) {
  return {
    type: SHOW_CASE,
    payload: { showCase: value },
  };
}
