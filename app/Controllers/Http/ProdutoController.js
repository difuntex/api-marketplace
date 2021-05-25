"use strict";
const Database = use("Database");

class ProdutoController {
  async buscaPorCategoria({ params }) {
    const produtoSQL = `
    SELECT produto_nome, produto_preco_venda
    FROM   produto where categoria_id = ?
`;
    let produtos = await Database.raw(produtoSQL, params.id);
    return produtos.rows;
  }
  async buscaPorNome({ request }) {
    let body = request.all();
    const produtoSQL = `
    SELECT produto_nome, produto_preco_venda, c.descricao
    FROM produto p, categoria c
    WHERE produto_nome like '%${body.produto_nome}%' and p.categoria_id = c.id
`;
    let produtos = await Database.raw(produtoSQL);

    return produtos.rows;
  }
}

module.exports = ProdutoController;
