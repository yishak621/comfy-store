// global imports-for all pages
import './src/toggleSidebar.js';
import './src/cart/toggleCart.js';
import './src/cart/setupCart.js';
// specific imports
import fetchProducts from './src/fetchProducts.js';
import { setupStore, store } from './src/store.js';
import display from './src/displayProducts.js';
import { getElement } from './src/utils.js';

const init = async () => {
  const products = await fetchProducts();

  setupStore(products);
  // console.table(store);
  const featured = store.filter((product) => product.featured === true); //featured data type=boolean attribute
  display(featured, getElement('.featured-center')); //since filter returna an array
};

window.addEventListener('DOMContentLoaded', init);
