the API is structured in two diffrent setups one for all products and one for single products
->the single product API has a diffrent property description
->and also the single product url has a query ? and then id which is unique to all single products
->`https://course-api.com/javascript-store-single-product?id=rec43w3ipXvP28vog`

//_GENERAL_
in general we have three main global imports which we wnat them in all of our pages
->sidebar ->toggleCart ->setupCart

//_Utils.js_
the main purpose of these file is
-> export the API url -> getElement and formatPrice function
->export getStorageItem and SetStorageItem

// _fetchProducts.js_
the main purpose of these file is to fetch the allProducts url API and convert to json()..

//_displayProducts.js_
the display function takes 3 parameters (products,element,filters)
->products[is a bunch of products in an array and then we will use map to iterate over them and we destructure
the properties name,id,image,price ]

->after we iterate over the products we will replace the innerHTML of the element.

-><!--TODO: the filter parameter will check if there is filter exist(it means that we add event listener after
we iterate over and replace the innerHTML so when we filter items it will add each and every items so to prevent that)

```js
 if (filters) return; it means just don't add event listner
```

so when we invoke the call back fun for filters we set the filter argument 'true'[for btn filter,search filter,and range filter]

```js
display(newStore, productsContainer, true);
```

but if not we will add the event listner (e) after we click on the cart icon it will add the parent container id
to the addToCart(id) function.

// _toggleSidebar.js_
the main aim of these file is to open the sidebar and close it

//_store.js_ is ARRAY- will fire when the DOMContentLoaded in the index.js
in the **displayproducts** func we extract properties and display them in the DOM(screen) but in these
section we will deal with localstorage.
->so `let store = getStorageItem('store')` if there is file in the local storgae by the name of store
->so to set items in the store we use a function **setUpStore** which iterate over the products and extract properties and `return { id, featured, name, price, company, colors, image }`
->since setStorageItem recive two arguments name and item we will set them as
` setStorageItem('store', store)`
->findProduct

// _index.js_
when a homepage loads
`'DOMContentLoaded'`

```js
const products = await fetchProducts(); //fetching
setupStore(products); //keeping them in the store
//since we have store object that come from localstorage(json.parse)
const featured = store.filter((product) => product.featured === true); //featured data type=boolean attribute
display(featured, getElement('.featured-center')); //since filter returns an array
```

//_FEATURED products_
-in this part we select the products which there featured property is ture and load them in the homepage

**PAGES**
_about.js_
in the about we dont have any unique functionallity but there are common features we want like tooglesidebar,toggle cart,and setupcart so we import the global imports

_products.js_->all products
so beside with the global imports we have specific imports for FILTERS
->as i mentioned earlier the filters

-**setUpSearch**
we have setupSearch function and it fires a keyup event for the form and takes input.value from the input
->so if there is value to the input form,then we iterate over the 'store' array each products and destructure the name property and `if(name.startsWith(value))` return the product and place it to the
newStore array and we will display it

**companies.js**
in these filter approach we select the unique company name from the store and map over each product and select them in to companies array and also add 'all' to the array
`let companies = ['all', ...new Set(store.map((product) => product.company))]`
then we will use these array to fill the inner HTML of btns container
->then we will add the event listner to the btn and grab the text content and compare it with the products company property value.

```js
if (element.classList.contains('company-btn')) {
  //if what we click is a btn
  let newStore = [];
  if (element.textContent === 'all') {
    newStore = [...store]; //it means copy from the store array
  } else {
    newStore = store.filter(
      (product) => product.company === element.textContent
    ); //returns array
  }
  display(newStore, productsContainer, true);
}
```

**price.js**
`html [ type="range"
              class="price-filter"
              min="0"
              value="50"
              max="100"]`<!--TODO: we will replace the value and max value dynamically>
these one is the crucial one which have a setUpPrice function which take a store array and grab the price values from each product and store them in the MaxPrice array.
->using Math.Max method it returns the maximum value (we use the (...maxPrice) spread operator to destructure the values)
->then after grabbing the maxprice we replace the max and value attribute ..
so by default it look like these
`priceValue.textContent =`value:$ ${maxPrice}`
->so we add eventlistner to the range->`input event`  
so after the user toggles the range

```js
const value = parseInt(priceInput.value); //since we want intiger
priceValue.textContent = `value:$ ${value}`;
```

so after grabbing the latest value from the range we filter the products based on that

```js
let newStore = store.filter((product) => {
  return product.price / 100 <= value;
});
```

_product.js_ single products page
using `window.location.search` we can grab the id from the bar(search extract the id) that specific data..for **fetch request**
->so after `fetching` we use the id of product to add in the cart...[note that for **redirecting** we already setup the link in the search icon `href="product.html?id=${id}"` displayproducts.js]

```js
//grab data
const { id, fields } = product;
productID = id;
//then use these id for addtoCart function
cartBtn.addEventListener('click', function () {
  addToCart(productID);
});
```

->and also we have a cart btn so we can also add it to the cart

_CART_

_addtoCartDOM.js_
these function is responsible for displaying items in the cart sidebar..it takes object as argument and destructure its properties and it creats article and add the values to the article and finally we will append it to the `cartItemsDOM.appendChild(article)`

_setupCart_
->just like we create a store in local storage ..now we will create another item in the l.storage
->addtocart function exported 3 places on home page/featured products...products page...and single products page
-> so in the add to cart function we pass the id and it grab the item from the cart l.storage
->it invoke 4 functions inside

```js
//add one to the item count
displayCartItemCount();
//display cart totals
displayCartTotal();
//setcart in local storage
setStorageItem('cart', cart);
//open cart
openCart();
```

->so we have two conditions
1]if the item is not there [l.storage]
` let product = findProduct(id);`we will grab that product from store l.storage
`product = { ...product, amount: 1 }`; //adding new property to the object ->amount-- redeclare product
`cart = [...cart, product];` //for the first time it will be an array with one object ...if it has already grab all other products and add these product too

finally as i mentioned earlier addtoCartDOM takes object so ` addToCartDOM(product);` display in the cartDOM

2]if the item is in a cart-_UPDATE_ values
we use increase amount function to update amount value.
but to display it to the DOM we should grab all the mount values and find that specific value(by its id)

```js
//our cart item amounts
const items = [...cartItemsDOM.querySelectorAll('.cart-item-amount')];
//since amount has a specific data-id we can match and find it
const newAmount = items.find((value) => value.dataset.id === id);

newAmount.textContent = amount;
```
