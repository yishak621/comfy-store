import { getElement } from '../utils.js';
import display from '../displayProducts.js';

const productsContainer = getElement('.products-container');
//in these part we want to grab unique company names and add a btn dynamically
//new Set() is a constructor function which will return a unique value instead of using reduce method
const setupCompanies = (store) => {
  let companies = ['all', ...new Set(store.map((product) => product.company))]; //converting object to array[...] ,and also we add 'all' to the array
  //iterate over and innerHTML and then targeting btns from the DOM
  //!<--TODO: remember that we select the companies from the DOM and we will fill the innerhtml from the companies array
  const companiesDOM = getElement('.companies');
  companiesDOM.innerHTML = companies
    .map((company) => {
      return ` <button class="company-btn">${company}</button>`;
    })
    .join('');
  //Event listner for btns
  companiesDOM.addEventListener('click', function (e) {
    const element = e.target;

    if (element.classList.contains('company-btn')) {
      //if what we click is a btn
      let newStore = [];
      if (element.textContent === 'all') {
        newStore = [...store]; //returns array
      } else {
        newStore = store.filter(
          (product) => product.company === element.textContent
        ); //returns array
      }
      display(newStore, productsContainer, true);
    }
  });
};

export default setupCompanies;
// ` <button class="company-btn">{}</button>`;
