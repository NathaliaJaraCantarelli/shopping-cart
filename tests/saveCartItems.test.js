const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('testa se ao executar saveCartItems com um cartItem o localStorae.setItem é chamado', () => {
    expect.assertions(1);
    saveCartItems('', '');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  })
  it('testa se ao executar saveCartItems com um cartItem o localStorae.setItem é chamado com os parametros', () => {
    expect.assertions(1);
    saveCartItems('ID: MLB1784298510 | TITLE: Monitor Gamer Samsung Ls22f350fh Led 21.5  Preto 100v/240v | PRICE: $799', '');
    const id = ('ID: MLB1784298510 | TITLE: Monitor Gamer Samsung Ls22f350fh Led 21.5  Preto 100v/240v | PRICE: $799');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', id);
  })
  it('testa se o conteudo não é vazio', () => {
    expect.assertions(1);
    const id = ('ID: MLB1784298510 | TITLE: Monitor Gamer Samsung Ls22f350fh Led 21.5  Preto 100v/240v | PRICE: $799');
    expect(saveCartItems(id, null)).toBe('ID: MLB1784298510 | TITLE: Monitor Gamer Samsung Ls22f350fh Led 21.5  Preto 100v/240v | PRICE: $799');
  })
});
