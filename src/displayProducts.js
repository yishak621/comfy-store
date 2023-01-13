import { formatPrice } from './utils.js';
import { addToCart } from './cart/setupCart.js';
const display = (products, element, filters) => {
  const newArticle = products
    .map((product) => {
      const { id, name, image, price } = product;
      return `<article class="product">
    
           <div class="product-container">
            <img src="${image}" class="product-img img" alt="" />
         
            <div class="product-icons">
              <a href="product.html?id=${id}"  class="product-icon">
                <i class="fas fa-search"></i>
              </a>
              <button class="product-cart-btn product-icon" data-id="${id}">
                <i class="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
          <footer>
            <p class="product-name">
              ${name}
              <h4 class="product-price">${formatPrice(price)}</h4>
            </p>
          </footer> 
        </article>`;
    })
    .join('');
  element.innerHTML = newArticle;
  //using event bubbling i can acess up to the DOM tree

  if (filters) return; //we dont wanna add the event listner if filters exist
  element.addEventListener('click', function (e) {
    //logic-if the parent of e.target contains product-cart-btn
    const parent = e.target.parentElement;
    if (parent.classList.contains('product-cart-btn')) {
      //shopping cart icon
      addToCart(parent.dataset.id);
    }
  });
};

export default display;

//NOTE-the price in the API is set as in cents..that means the payment processor is looking for the smallest unit
//it will help us to calculate the total costs

//<!--TODO: we add one parameter filter to fix the bug ...the problem was since we were adding that event listner after
//that element existed so whenever the products page load by filters btn/search or range it will add eventlistner everytime
//so to prevent that we add a boolean attribute 'true ' all our filters
