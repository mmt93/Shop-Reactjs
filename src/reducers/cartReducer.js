import {
  ADD_QTY,
  RMV_QTY,
  DEL_ITEM,
  ADD_TO_CART,
  SHOW_CASE,
} from '../actions/types';

const INITIAL_STATE = {
  data: [],
  showCase: 'Higiene',
  total: 0,
};

export default function courses(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_QTY: {
      const maxPurchase = 10;
      const newCart = [...state.data];
      const idAdd = newCart.findIndex((item) => item.id === action.payload.id);
      const addItem = {
        ...newCart[idAdd],
      };

      addItem.qty += 1;

      let sumTotal = state.total + addItem.value;
      sumTotal = parseFloat(sumTotal);
      if (addItem.qty > maxPurchase) {
        addItem.qty = maxPurchase;
      }
      newCart[idAdd] = addItem;

      return { ...state, data: newCart, total: sumTotal };
    }

    case RMV_QTY: {
      const newCartRmv = [...state.data];
      let subTotal = state.total;
      const idRmv = newCartRmv.findIndex(
        (item) => item.id === action.payload.id
      );
      const rmvItem = {
        ...newCartRmv[idRmv],
      };

      if (rmvItem.qty > 0) {
        subTotal -= rmvItem.value;
        subTotal = parseFloat(subTotal);
      }

      rmvItem.qty -= 1;

      if (rmvItem.qty <= 0) {
        rmvItem.qty = 0;
      }
      newCartRmv[idRmv] = rmvItem;

      return { ...state, data: newCartRmv, total: subTotal };
    }
    case DEL_ITEM: {
      const updatedCart = [...state.data];
      const updatedItemIndex = updatedCart.findIndex(
        (item) => item.id === action.payload.id
      );
      let delTotal = state.total;
      const delItem = { ...updatedCart[updatedItemIndex] };

      updatedCart.splice(updatedItemIndex, 1);

      if (state.total > 0) {
        delTotal -= delItem.qty * delItem.value;
      }

      return { ...state, data: updatedCart, total: delTotal };
    }

    case ADD_TO_CART: {
      let addTotal = state.total;
      addTotal += action.payload.idAdd.value;

      return {
        ...state,
        data: [...state.data, action.payload.idAdd],
        total: addTotal,
      };
    }

    case SHOW_CASE: {
      return {
        ...state,
        showCase: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
