// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
const getIdFromProductItem = (product) => product.querySelector('span.item_id').innerText;

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */
const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  return li;
};

const listaCarrinhoPreco = document.getElementById('price-total');
const totalPreco = listaCarrinhoPreco.innerText;
let totalPrecoNumber = parseFloat(totalPreco);
const carrinhoComprasEspaço = document.getElementsByTagName('ol')[0];

carrinhoComprasEspaço.addEventListener('click', (event) => {
  const elemento = event.target;
  if (event.target.tagName === 'LI') {
    const frase = elemento.innerText;
    const posicao = frase.substring(frase.indexOf('PRICE') + 8, frase.length);
    const valor = parseFloat(posicao);
    totalPrecoNumber -= valor;
    listaCarrinhoPreco.innerText = totalPrecoNumber;//.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' });
    elemento.remove();
  }
});

const criaElementoCarrinho = async (idSelecionado, listaCarrinho) => {
  const objetoRetorno = await fetchItem(idSelecionado);
  listaCarrinho.appendChild(createCartItemElement(objetoRetorno));
  const novoPreco = parseFloat(objetoRetorno.price);
  totalPrecoNumber += novoPreco;
  listaCarrinhoPreco.innerText = totalPrecoNumber;//.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' });
};

const requisito4 = () => {
  const element = document.getElementsByClassName('item__add');
  const listaCarrinho = document.getElementsByClassName('cart__items')[0];
  for (let index = 0; index < element.length; index += 1) {
    element[index].addEventListener('click', () => {
      const pai = element[index].parentNode;
      const idSelecionado = pai.children[0].innerText;
      criaElementoCarrinho(idSelecionado, listaCarrinho);
    });
  }
};

const requisito2 = async () => {
  const listaElementos = document.getElementsByClassName('items')[0];
  const retornoElementos = await fetchProducts('computador');
  retornoElementos.results
    .forEach((element) => listaElementos.appendChild(createProductItemElement(element)));
  requisito4();
};

window.onload = () => {
  requisito2();
  const valorInicial = 0;
  listaCarrinhoPreco.innerText = valorInicial.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};
