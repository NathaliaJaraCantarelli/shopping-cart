const saveCartItems = (descricaoProduto, listaAntiga) => {
  const conteudoAnterior = listaAntiga;
  let novoConteudo;
  if (conteudoAnterior === null) {
    novoConteudo = descricaoProduto;
  } else {
    novoConteudo = conteudoAnterior.concat(descricaoProduto);
  }
  localStorage.setItem('cartItems', novoConteudo);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
