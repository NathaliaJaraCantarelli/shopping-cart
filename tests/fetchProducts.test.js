require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Testa se é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  })
  it('Testa se ao passar o argumento computador o fetch é chamado', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledTimes(1);
  })
  it('Testa se ao passar o argumento computador utiliza o endpoint correto', async () => {
    expect.assertions(1);
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador')
    expect(fetch).toHaveBeenCalledWith(url);
  })
  it('Testa se ao passar o argumento computador o retorno é o objeto computadorSearch', async () => {
    expect.assertions(1);
    expect(await fetchProducts('computador')).toEqual(computadorSearch);
  })
  it('Testa se não passar argumentos retorna um erro', async () => {
    expect.assertions(1);
    try {
      const dados = await fetchProducts();
      console.log(dados);
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
    
  })
});
