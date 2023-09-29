const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('testa se ao executar getSavedCartItems o localStorae.setItem é chamado', async () => {
    expect.assertions(1);
    await getSavedCartItems();
    expect(localStorage.getItem).toBeCalledTimes(1);
  })
  it('testa se ao executar getSavedCartItems o localStorae.setItem é chamado com o cartItems', async () => {
    expect.assertions(1);
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  })
});
