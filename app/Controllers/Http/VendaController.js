"use strict";

const Database = use("Database");
const BadRequestException = use("App/Exceptions/BadRequestException");

class VendaController {
  async venda({ request, auth }) {
    const user = await auth.getUser();
    const body = request.all();
    try {
      const carrinhoSql = `
        select produto_id from carrinho where ativo = 1 and cliente_id =?
    `;
      let produtos_id = await Database.raw(carrinhoSql, user.id);

      let ids = "";
      for (let i in produtos_id.rows) {
        ids += produtos_id.rows[i].produto_id + ",";
      }

      ids = ids.replace(/,\s*$/, "");

      const inserir_venda_sql = `
        INSERT INTO VENDA (produtos_id,valor,cliente_id, forma_pagamento,situacao_id)
        VALUES('${ids}',${body.valor},${user.id},'${body.forma_pagamento}',-3)
        `;
      await Database.raw(inserir_venda_sql);

      const atualizaCarrinhoSql = ` 
        update carrinho set ativo = 0 where cliente_id = ${user.id}
    `;
      await Database.raw(atualizaCarrinhoSql);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        "Erro ao processar venda, tente novamente mais tarde"
      );
    }
    return { success: true, message: "Venda concluida com sucesso" };
    
  }
}

module.exports = VendaController;
