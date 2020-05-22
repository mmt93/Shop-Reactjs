import { createStore } from 'redux';

const INITIAL_STATE = {
    data: [], 
    showCase: 'Promocao',
    total: 0
}

function courses(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'ADD_QTY':

            const maxPurchase = 10;
            const newCart = [...state.data];
            const idAdd = newCart.findIndex(item => item.id === action.payload.id);
            const addItem = {
                ...newCart[idAdd]
            };

            addItem.qty++;

            if (addItem.qty > maxPurchase) {
                addItem.qty = maxPurchase;
            }
            newCart[idAdd] = addItem;

            return { ...state, data: newCart };

        case 'RMV_QTY':

            const newCartRmv = [...state.data];

            const idRmv = newCartRmv.findIndex(item => item.id === action.payload.id);
            const rmvItem = {
                ...newCartRmv[idRmv]
            };

            rmvItem.qty--;

            if (rmvItem.qty <= 0) {
                rmvItem.qty = 0;
            }
            newCartRmv[idRmv] = rmvItem;

            return { ...state, data: newCartRmv };

        case 'DEL_ITEM':

            const updatedCart = [...state.data];
            const updatedItemIndex = updatedCart.findIndex(item => item.id === action.payload.id);

            updatedCart.splice(updatedItemIndex, 1);

            return {
                ...state,
                data: updatedCart
            }

        case 'ADD_TO_CART':
            return {
                ...state,
                data: [...state.data, action.payload.idAdd]
            }

        case 'SHOW_CASE':
            return {
                ...state,
                showCase: action.payload
            }    

        default:
            return state;

    }

}



const store = createStore(courses);

export default store;