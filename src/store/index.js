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
            // var newTotal = [...state.total];
            const idAdd = newCart.findIndex(item => item.id === action.payload.id);
            const addItem = {
                ...newCart[idAdd]
            };

            addItem.qty++;
            console.log('falai');
            console.log(state.total);
            console.log('falae agr');
            console.log(addItem.value);
            var sumTotal = state.total + addItem.value;
            sumTotal = parseFloat(sumTotal);
            if (addItem.qty > maxPurchase) {
                addItem.qty = maxPurchase;
            }
            newCart[idAdd] = addItem;
            // newTotal.total = newTotal.total + addItem.value;
            return { ...state, data: newCart, total: sumTotal };

        case 'RMV_QTY':

            const newCartRmv = [...state.data];
            var subTotal = state.total;
            const idRmv = newCartRmv.findIndex(item => item.id === action.payload.id);
            const rmvItem = {
                ...newCartRmv[idRmv]
            };

            if (rmvItem.qty > 0)  {
                subTotal -= rmvItem.value;
                subTotal = parseFloat(subTotal);
            } 

            rmvItem.qty--;

            if (rmvItem.qty <= 0) {
                rmvItem.qty = 0;
            }
            newCartRmv[idRmv] = rmvItem;
            
            return { ...state, data: newCartRmv, total: subTotal };

        case 'DEL_ITEM':
            const updatedCart = [...state.data];
            const updatedItemIndex = updatedCart.findIndex(item => item.id === action.payload.id);
            var delTotal = state.total;
            const delItem = {...updatedCart[updatedItemIndex]};
            
            updatedCart.splice(updatedItemIndex, 1);
            
            if (state.total > 0) {
                delTotal = delTotal - (delItem.qty * delItem.value);
            }
            
            return { ...state, data: updatedCart, total: delTotal };
        
        case 'ADD_TO_CART':
            const newCartAdd = [...state.data];
            var addTotal = state.total;
            const idNewAdd = newCartAdd.findIndex(item => item.id === action.payload.id);
            const addNewItem = {...newCartAdd[idNewAdd]};
                           
            addTotal =+ addNewItem.value;

            return {
                ...state,
                data: [...state.data, action.payload.idAdd],
                total: addTotal
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