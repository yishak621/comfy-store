import { getElement } from '../utils.js';
import display from '../displayProducts.js';
//declaration
const priceInput = getElement('.price-filter');
const priceValue = getElement('.price-value');
const productsContainer = getElement('.products-container');

const setupPrice = (store) => {
  //setup filter
  let maxPrice = store.map((product) => {
    return product.price;
  });

  //map returns an array so in the Math.max method it cant work with arrays so we use a spread operator [...maxprice] to destructure the values
  maxPrice = Math.max(...maxPrice);
  maxPrice = Math.ceil(maxPrice / 100); //to covert the price from coin to the bill
  //then replacing the price input values dynamically
  priceInput.value = maxPrice;
  priceInput.max = maxPrice;
  priceInput.min = 0;
  //the value text
  priceValue.textContent = `value:$ ${maxPrice}`;
  //<!--TODO: input event listner for the range-fires when a value of a input elment changed
  priceInput.addEventListener('input', function () {
    const value = parseInt(priceInput.value);
    priceValue.textContent = `value:$ ${value}`;

    //filtering based on product price
    let newStore = store.filter((product) => {
      return product.price / 100 <= value;
    });
    display(newStore, productsContainer, true);

    //if there is no item
    if (newStore.length < 1) {
      productsContainer.innerHTML = `<h3 class="filter-error">no items to be displayed</h3>`;
    }
  });
};

export default setupPrice;

/**The map() method in JavaScript creates an array by calling a specific function on each element present in the parent array. It is a non-mutating method. */
