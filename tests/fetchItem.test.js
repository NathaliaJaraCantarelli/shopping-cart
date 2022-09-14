require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Testa se fetchItem é uma função', () => {
    expect.assertions(1);
    expect(typeof fetchItem()).toBe('function');
  })
  it('Testa se fetchItem chama o fetch com o argumento MLB1615760527', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledTimes(1);
  })
  it('Testa se fetchItem chama o fetch com o argumento MLB1615760527 utiliza o url correto', async () => {
    expect.assertions(1);
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(url);
  })
  it('Testa se fetchItem com o argumento MLB1615760527 retorna o objeto item', async () => {
    expect.assertions(1);
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  })
  it('Testa se fetchItem sem argumento retorna erro', async () => {
    expect.assertions(1);
    try {
      const dados = await fetchItem();
      console.log(dados);
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  })
});
