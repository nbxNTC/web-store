const INITIAL_STATE = {
  totalValue: 0,
  cart: []
}

export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === 'ADD_PRODUCT') {
    const addedItem = state.cart.find(item => item.product.id === action.item.product.id);
    if (addedItem) {
      addedItem.amount++;
      return {
        ...state, 
        totalValue: state.totalValue + action.item.product.value
      };
    } else {
      return {
        ...state,
        totalValue: state.totalValue + action.item.product.value,
        cart: [...state.cart, action.item]
      };
    }
  }
  if (action.type === 'REMOVE_PRODUCT') {
    const removedItem = state.cart.find(item => item.product.id === action.id);
    const valueToRemove = removedItem.amount * removedItem.product.value;
    return {
      ...state,
      totalValue: state.totalValue - valueToRemove,
      cart: [...state.cart.filter(item => item.product.id !== action.id)]
    };    
  }
  if (action.type === 'REMOVE_ONE_PRODUCT') {  
    const removedItem = state.cart.find(item => item.product.id === action.id);
    if (removedItem) {
      removedItem.amount--;
      const newValue = state.totalValue - removedItem.product.value;
      if (removedItem.amount === 0) {
        return {
          ...state,
          totalValue: newValue,
          cart: [...state.cart.filter(item => item.product.id !== action.id)]
        };   
      } else {
        return {
          ...state,
          totalValue: newValue,
          // cart: [...state.cart]
        };  
      }
    }
  }
  if (action.type === 'REMOVE_ALL_PRODUCT') {
    return {
      ...state,
      totalValue: 0,
      cart: []
    }
  }
  return state;
}

export const addProduct = (item) => {
  return {
    type: 'ADD_PRODUCT',
    item
  };
}

export const removeProduct = (id) => {
  return {
    type: 'REMOVE_PRODUCT',
    id
  };
}

export const removeOneProduct = (id) => {
  return {
    type: 'REMOVE_ONE_PRODUCT',
    id
  };
}

export const removeAllProducts = () => {
  return {
    type: 'REMOVE_ALL_PRODUCT'
  };
}