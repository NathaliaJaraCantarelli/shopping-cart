// const { error } = require("cypress/types/jquery");

const fetchProducts =  async(product) => {
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
    const retorno = await fetch(url);
    const objeto = await retorno.json();
    return objeto;
  } catch {
    throw new Error ('You must provide an url');
  }
};

// console.log(fetchProducts());

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
