

export const initialState = {
    basket: [],
    user: JSON.parse(localStorage.getItem('user')),
    address: []
};

export const getBasketTotal = (basket) => basket?.reduce((amount,item) => 
        item.price + amount,0
)


const reducer = (state, action) => {

    console.log('acion:  ',action);

    switch(action.type) {

        case 'REMOVE_FROM_BASKET':

        const index = state.basket.findIndex(
            (basketItem) => basketItem.id === action.id
        );

        let newBasket = [...state.basket];

        if (index >= 0) {
            newBasket.splice(index,1)           /*'splice' means the product will be removed from the basket! */
        } else {
            console.warn(`
            can't remove product whose id is ${index}
            `)
        }

        return {
            ...state,
            basket: newBasket
        }

        case 'SET_ADDRESS':

        return {
            ...state,
            address: {...action.item}
        }

        case 'EMPTY_BASKET':
            return {
                ...state,
                basket: []
            }


        case 'ADD_TO_BASKET':

        return {
            ...state,
            basket: [...state.basket,action.item]
        };


        case 'SET_USER':

        return {
            ...state,
            user: action.user
        }
        default: 
        return state
    }
}

export default reducer