"use strict";
const Database = use("Database");

class ProdutoController {
  async show({ params }) {
    const produtoSQL = `
    SELECT produto_nome, produto_preco_venda
    FROM   produto where categoria_id = ?
`;

    let produtos = await Database.raw(produtoSQL, params.id);

    return produtos.rows;
  }
}

module.exports = ProdutoController;
