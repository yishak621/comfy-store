// global imports
import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';
// specific
import { addToCart } from '../cart/setupCart.js';
import { singleProductUrl, getElement, formatPrice } from '../utils.js';

// selections
const loading = getElement('.page-loading');
const centerDOM = getElement('.single-product-center');
const pageTitleDOM = getElement('.page-hero-title');
const imgDOM = getElement('.single-product-img');
const titleDOM = getElement('.single-product-title');
const companyDOM = getElement('.single-product-company');
const priceDOM = getElement('.single-product-price');
const colorsDOM = getElement('.single-product-colors');
const descDOM = getElement('.single-product-desc');
const cartBtn = getElement('.addToCartBtn');

// cart product
let productID;

// show single product when page loads
window.addEventListener('DOMContentLoaded', async function () {
  const urlID = window.location.search; //location is object and inside we have search property with a value of unique ids ..to acess id of single product window.location.search
  //The search property of the Location interface is a search string, also called a query string; that is, a string containing a '?' followed by the parameters of the URL.
  //console.log(window.location);->?id=rec43w3ipXvP28vog

  //Catching error
  try {
    const response = await fetch(`${singleProductUrl}${urlID}`); //using the urlID we can go to single product API and acess
    if (response.status >= 200 && response.status <= 299) {
      const product = await response.json();

      //grab data
      const { id, fields } = product;
      productID = id;

      //destructuring
      const { name, company, price, colors, description } = fields; //since fields is object we can destructure its properties
      const image = fields.image[0].thumbnails.large.url;

      //set values-including the document title
      document.title = `${name.toUpperCase()} | Comfy`; //document title
      pageTitleDOM.textContent = `Home / ${name}`; //hero title

      imgDOM.src = image;
      titleDOM.textContent = name;
      companyDOM.textContent = `by ${company}`;
      priceDOM.textContent = formatPrice(price);
      descDOM.textContent = description;

      //displaying colors from array--the items color that are avaliable
      colors.forEach((color) => {
        const span = document.createElement('span');
        span.classList.add('product-color');
        span.style.backgroundColor = `${color}`;
        colorsDOM.appendChild(span);
      });
    } else {
      console.log(response.status, response.statusText);
      centerDOM.innerHTML = `<div><h3 class="error">sorry ,something went wrong</h3><a href="index.html" class="btn">back home</a></div>`;
    }
  } catch (error) {
    console.log(error);
  }

  //hiding the loading gif
  loading.style.display = 'none';
});
cartBtn.addEventListener('click', function () {
  addToCart(productID);
});
//fetch error-/network error(404) -A fetch() promise only rejects when a network error is encountered (which is usually when there's a permissions issue or similar)
//but in our case if the product doesnt exist we have diffrent type of error
