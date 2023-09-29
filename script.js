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
let totalPreco = listaCarrinhoPreco.innerText;
let totalPrecoNumber = parseFloat(totalPreco);
const carrinhoComprasEspaço = document.getElementsByTagName('ol')[0];
const botaoRemoveCarrinho = document.getElementsByClassName('empty-cart')[0];

botaoRemoveCarrinho.addEventListener('click', () => {
  const produtosCarrinho = carrinhoComprasEspaço.getElementsByTagName('li');
  for (let index2 = produtosCarrinho.length - 1; index2 >= 0; index2 -= 1) {
    carrinhoComprasEspaço.removeChild(produtosCarrinho[index2]);
  }
  listaCarrinhoPreco.innerText = 0;
  localStorage.setItem('cartItems', '');
});

carrinhoComprasEspaço.addEventListener('click', (event) => {
  const elemento = event.target;
  if (event.target.tagName === 'LI') {
    const arrayAnterior = localStorage.getItem('cartItems');
    const novoArray = arrayAnterior.replace(elemento.innerText, '');
    console.log(novoArray);
    localStorage.setItem('cartItems', novoArray);
    // listaCarrinhoPreco = document.getElementById('price-total');
    totalPreco = listaCarrinhoPreco.innerText;
    totalPrecoNumber = parseFloat(totalPreco);
    const frase = elemento.innerText;
    const posicao = frase.substring(frase.indexOf('PRICE') + 8, frase.length);
    const valor = parseFloat(posicao);
    totalPrecoNumber -= valor;
    listaCarrinhoPreco.innerText = totalPrecoNumber; // .toLocaleString('pt-BR', { style: 'currency', currency: 'USD' }); 
    elemento.remove();
  }
});

const criaElementoCarrinho = async (idSelecionado, listaCarrinho) => {
  const listaLocalStorage = localStorage.getItem('cartItems');
  const objetoRetorno = await fetchItem(idSelecionado);
  const descricaoProduto = listaCarrinho.appendChild(createCartItemElement(objetoRetorno));
  const novoPreco = parseFloat(objetoRetorno.price);
  // listaCarrinhoPreco = document.getElementById('price-total');
  totalPreco = listaCarrinhoPreco.innerText;
  totalPrecoNumber = parseFloat(totalPreco);
  totalPrecoNumber += novoPreco;
  listaCarrinhoPreco.innerText = totalPrecoNumber; // .toLocaleString('pt-BR', { style: 'currency', currency: 'USD' });
  await saveCartItems(descricaoProduto.innerText, listaLocalStorage);
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
  const carregando = document.getElementsByClassName('loading')[0];
  const listaElementos = document.getElementsByClassName('items')[0];
  const retornoElementos = await fetchProducts('computador');
  carregando.remove();
  retornoElementos.results
    .forEach((element) => listaElementos.appendChild(createProductItemElement(element)));
  requisito4();
};

const seHaverConteudo = (conteudoLocalStorage) => {
  const carrinhoCarregado = document.getElementsByClassName('cart__items')[0];
    // listaCarrinhoPreco3 = document.getElementById('price-total');
    totalPrecoNumber = 0;
    const id = 'ID: ';
    const array = conteudoLocalStorage.split('ID: ');
    array.forEach((element) => {
      if (element !== '') {
        const novoLi = document.createElement('li');
        const criaCarrinho = carrinhoCarregado.appendChild(novoLi);
        criaCarrinho.innerText = id.concat(element);
        const posicao = element.substring(element.indexOf('PRICE') + 8, element.length);
        const valor = parseFloat(posicao);
        totalPrecoNumber += valor;
        listaCarrinhoPreco.innerText = totalPrecoNumber;
      }
    });
};

window.onload = () => {
  requisito2();
  const valorInicial = 0;
  listaCarrinhoPreco.innerText = valorInicial;
    // .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const conteudo = getSavedCartItems();
  console.log(conteudo);
  if (conteudo !== null) {
    seHaverConteudo(conteudo);
  }
};
