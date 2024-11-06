// actions.js
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: product,
});

export const deleteProduct = (productId) => ({
  type: DELETE_PRODUCT,
  payload: productId,
});

export const updateProduct = (product) => ({
  type: UPDATE_PRODUCT,
  payload: product,
});
