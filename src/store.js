//purpose of these file is iterate over my products array and extract values
//and sending the values to the empty array that we will use for the entire project
//copying the items to the local storage since we use them from local storage in the products.html
import { getStorageItem, setStorageItem } from './utils.js';
//let store = []; but after we add items to the local storage we just assign store to the getstorageitems function[and loading items from the local storages]
let store = getStorageItem('store');
const setupStore = (products) => {
  store = products.map((product) => {
    const {
      id,
      fields: { featured, name, price, company, colors, image: img },
    } = product;

    const image = img[0].thumbnails.large.url; //since image is an array with one object inside it

    return { id, featured, name, price, company, colors, image };
  });
  setStorageItem('store', store); //store is a giant array which have all the items inside
};

//console.log(store);--it eill be an empty array because it will invoke the empty array we put in the first place but in the index js after the setup store it will load the items

//the main purpose of these function is we pass the id the function wil return the product[from the STORE]
const findProduct = (id) => {
  let product = store.find((product) => {
    return product.id === id;
  });
  return product;
};
export { store, setupStore, findProduct };
