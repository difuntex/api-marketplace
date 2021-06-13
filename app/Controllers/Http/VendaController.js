"use strict";

const Database = use("Database");

class VendaController {
  async venda({ request, auth }) {
    let body = request.all();
    const inserir_venda_sql = `
        INSERT INTO VENDA (carrinho_id,valor,cliente_id, forma_pagamento,situacao_id)
        VALUES(?,?,?,?,?)
      `;
    let binds = [
      body.carrinho_id,
      body.valor,
      body.cliente_id,
      body.forma_pagamento,
      body.situacao_id,
    ];
    let resultado = await Database.raw(inserir_venda_sql,binds);
  }
}

module.exports = VendaController;
