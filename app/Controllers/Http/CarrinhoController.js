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
    return { success: true, message: "Produto inserido ao carrinho com sucesso" };
    
  }
}

module.exports = CarrinhoController;
