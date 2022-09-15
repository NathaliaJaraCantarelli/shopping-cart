

const getSavedCartItems = () => {
  const conteudoLocalStorage = localStorage.getItem('cartItems');
  if ((conteudoLocalStorage !== null) || (conteudoLocalStorage !== 'undefined')) {
    return conteudoLocalStorage;  
  }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
