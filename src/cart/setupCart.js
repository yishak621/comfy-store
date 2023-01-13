//these functionallity deals with adding items to the cart
//two basic consepts Adding items to the cart and adding items to the DOM
// import
import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from '../utils.js';
import { openCart } from './toggleCart.js';
import { findProduct } from '../store.js';
import addToCartDOM from './addToCartDOM.js';
import display from '../displayProducts.js';
// set items
const cartItemsCountDOM = getElement('.cart-item-count');
const cartItemsDOM = getElement('.cart-items');
const cartTotalDOM = getElement('.cart-total');

let cart = getStorageItem('cart'); //if there is

//the id refers to product id from product.js(single item)
//addtocart function exported 3 places on home page/featured products...products page...and single products page
export const addToCart = (id) => {
  //grab me that cartitem from the CART
  let item = cart.find((cartItem) => cartItem.id === id);

  if (!item) {
    //if the item is not in the cart
    let product = findProduct(id);

    //add item to the cart[just because we add items to the cart doesnt display anything to the screen so we use another setup for the DOM]
    product = { ...product, amount: 1 }; //adding new property to the object ->amount

    cart = [...cart, product]; //for the first time it will be an array with one object
    console.log(cart);
    //add items to the DOM
    addToCartDOM(product);
  } else {
    //if the item is in a cart-UPDATE values
    const amount = increaseAmount(id);
    //our cart item amounts
    const items = [...cartItemsDOM.querySelectorAll('.cart-item-amount')];
    //since amount has a specific data-id we can match and find it
    const newAmount = items.find((value) => value.dataset.id === id);

    newAmount.textContent = amount;
  }
  //add one to the item count
  displayCartItemCount();
  //display cart totals
  displayCartTotal();
  //setcart in local storage
  setStorageItem('cart', cart);
  //open cart
  openCart();
};

//this function is responsible for notification number on the cart
function displayCartItemCount() {
  const amount = cart.reduce((total, cartItem) => {
    //accumulator and item
    return (total += cartItem.amount);
  }, 0); //0 is to say that we return a number
  cartItemsCountDOM.textContent = amount;
}

//this function is responisble for the total calculation
function displayCartTotal() {
  let total = cart.reduce((total, cartItem) => {
    return (total += cartItem.price * cartItem.amount);
  }, 0);
  //<!--TODO: note that we format the price only when we display it to the screen -but when we pass the total value to the payment processor we pass itin cents we dont have to convert it
  cartTotalDOM.textContent = `Total:${formatPrice(total)}`;
}
//display items in a cart wherever page we are
function displayCartItemsDOM() {
  //if we have 3 items in a cart it will iterate over them and grab object andd add it to the fun
  cart.forEach((cartItem) => {
    addToCartDOM(cartItem);
  });
}

//TARGET-when an item is there update amount
function increaseAmount(id) {
  let newAmount; //to display in the DOM
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount + 1;
      cartItem = { ...cartItem, amount: newAmount }; //it means that copy every porperties of that item but for the amount add 1
    }
    return cartItem; //if the id is not matched return the item the way it is
  });
  return newAmount;
}
//TARGET-decrease the amount
function decreaseAmount(id) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount - 1;
      if (cartItem.amount <= 0) {
        newAmount = 0;
      }
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  return newAmount;
}

//remove item
function removeItem(id) {
  cart = cart.filter((cartItem) => cartItem.id !== id); //these means that our new cart-it collects the items that dont match the id that leaves the matched id alone(deleted)
}

function setupCartFunctionality() {
  cartItemsDOM.addEventListener('click', function (e) {
    const element = e.target;
    const parent = e.target.parentElement;
    const id = e.target.dataset.id;
    const parentID = e.target.parentElement.dataset.id;
    //remove
    if (element.classList.contains('cart-item-remove-btn')) {
      removeItem(id);
      //updating the DOM
      parent.parentElement.remove();
    }
    //increase
    if (parent.classList.contains('cart-item-increase-btn')) {
      //remember that next to the a parent there is cart item amount so we should update that
      const newAmount = increaseAmount(parentID);
      parent.nextElementSibling.textContent = newAmount;
    }
    //decrease
    if (parent.classList.contains('cart-item-decrease-btn')) {
      const newAmount = decreaseAmount(parentID);
      if (newAmount === 0) {
        removeItem(id); //remove the data from cart
        parent.parentElement.parentElement.remove(); //remove section from DOM
      } else {
        parent.previousElementSibling.textContent = newAmount;
      }
    }

    displayCartItemCount();
    displayCartTotal();
    setStorageItem('cart', cart);
  });
}

//a function each and every time deals with cart -in every page since we import it as a global import
const init = () => {
  //dispaly amount of cart items
  displayCartItemCount();
  //display total
  displayCartTotal();
  //add all cart items to the DOM
  displayCartItemsDOM();
  //setup cart functionallity
  setupCartFunctionality();
};
init();
