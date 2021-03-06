"use strict";
const UnauthorizedException = use("App/Exceptions/UnauthorizedException");
const BadRequestException = use("App/Exceptions/BadRequestException");
const Database = use("Database");
const Produto = use("App/Models/Produto");
const Carrinho = use("App/Models/Carrinho");
class CarrinhoController {
  async store({ request, auth }) {
    const user = await auth.getUser();
    if (user.users_tipo != 2) {
      throw UnauthorizedException;
    }
    const data = request.only(["produto_id"]);
    data.ativo = 1;
    data.cliente_id = user.id;
    let produto = await Produto.findByOrFail("produto_id_pk", data.produto_id);
    data.produto_valor = produto.produto_preco_venda;
    await Carrinho.create(data);
    return {
      success: true,
      message: "Produto inserido ao carrinho com sucesso",
    };
  }
  async show({ auth }) {
    const user = await auth.getUser();
    const carrinhoSql = `
        SELECT *
        FROM   carrinho
        WHERE  cliente_id = ?
            AND ativo = 1      
    `;
    let carrinho = await Database.raw(carrinhoSql, user.id);
    const valorTotalDoCarrinhoSql = `
        SELECT Sum(produto_valor) as total
        FROM   carrinho
        WHERE  cliente_id = ?
            AND ativo = 1       
    `;
    let total = await Database.raw(valorTotalDoCarrinhoSql, user.id);

    //  carrinho.rows += [...carrinho.rows, total.rows];
    let valor_total = [];
    valor_total.valor = total.rows[0].total;
    console.log(valor_total);
    let valor = [...carrinho.rows, valor_total];

    return valor;
    return carrinho;
  }
}

module.exports = CarrinhoController;
