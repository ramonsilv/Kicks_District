// Catálogo — única fonte dos produtos (usada em index.html e produtos.html).
// Sem preço/estoque: o proprietário não informou. Para ativar ordenação por preço,
// adicione "preco: 499.9" aos itens e veja o comentário em produtos.js.
window.PRODUTOS = [
  { id: 'jordan-1-chicago', nome: 'Air Jordan 1 Chicago', categoria: 'Hype', img: 'assets/img/produtos/produto-01.png', desc: 'Mais que tênis, é estilo de vida.', destaque: true },
  { id: 'pegasus-41', nome: 'Nike ZoomX Pegasus 41', categoria: 'Corrida', img: 'assets/img/produtos/produto-02.png', desc: 'Leveza, respirabilidade e alta performance.', destaque: true },
  { id: 'air-force-1', nome: 'Nike Air Force 1 Triple White', categoria: 'Clássicos', img: 'assets/img/produtos/produto-03.png', desc: 'O clássico nunca sai de moda.', destaque: true },
  { id: 'vans-old-skool', nome: 'Vans Old Skool Black/White', categoria: 'Clássicos', img: 'assets/img/produtos/produto-04.png', desc: 'Do seu jeito, em qualquer lugar.', destaque: false },
  { id: 'yeezy-700', nome: 'Adidas Yeezy 700 Analog', categoria: 'Hype', img: 'assets/img/produtos/produto-05.png', desc: 'Design inovador e máximo conforto.', destaque: false }
];
