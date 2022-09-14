const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('testa se ao executar saveCartItems com um cartItem o localStorae.setItem é chamado', async () => {
    expect.assertions(1);
    await saveCartItems('cartItem');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  })
  it('testa se ao executar saveCartItems com um cartItem o localStorae.setItem é chamado com os parametros', async () => {
    expect.assertions(2);
    await saveCartItems('cartItem');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems',);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItem');
  })
});
