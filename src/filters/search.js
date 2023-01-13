import { getElement } from '../utils.js';
import display from '../displayProducts.js';

const productsContainer = getElement('.products-container');

//Keyup events
const setupSearch = (store) => {
  const form = getElement('.input-form');
  const nameInput = getElement('.search-input');

  form.addEventListener('keyup', function () {
    const value = nameInput.value;
    //if there is a value display a search items and if not display all items
    if (value) {
      const newStore = store.filter((product) => {
        let { name } = product;
        name = name.toLowerCase();
        if (name.startsWith(value)) {
          //if the items first letter matches--we can also use (includes)
          return product;
        }
      });
      display(newStore, productsContainer, true);
      if (newStore.length < 1) {
        productsContainer.innerHTML = `<h3 class="filter-error">no items to be displayed</h3>`;
      }
    } else {
      display(store, productsContainer);
    }
  });
};

export default setupSearch;
