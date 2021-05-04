"use strict";
const UnauthorizedException = use("App/Exceptions/UnauthorizedException");
const BadRequestException = use("App/Exceptions/BadRequestException");
const Database = use("Database");
const Categoria = use("App/Models/Categoria");

class CategoriaController {
  async index() {
    const categoriasSQL = `
        SELECT *
        FROM   categoria   
    `;
    let categorias = await Database.raw(categoriasSQL);
    console.log(categorias.rows);
    return categorias.rows;
  }
  async store({ request, auth }) {
    const user = await auth.getUser();
    if (user.users_tipo != 1) {
      throw UnauthorizedException;
    }
    const data = request.only(["descricao"]);
    const categoriaExistenteSQL = `
      select * from categoria where descricao like '%${data.descricao}%'
    `;
    let categoriaExistente = await Database.raw(categoriaExistenteSQL);
    if (categoriaExistente.rows == []) {
      console.log(categoriaExistente.rows);
      throw BadRequestException;
    }
    await Categoria.create(data);
    return { success: true, message: "Categoria cadastrada com sucesso" };
  }
  async update({ request, auth }) {
    const user = await auth.getUser();
    if (user.users_tipo != 1) {
      throw UnauthorizedException;
    }
    const data = request.only(["id", "descricao"]);
    const categoria = await Categoria.findByOrFail("id", data.id);
    //console.log(categoria);
    delete data.id;
    try {
      categoria.merge(data);
      await categoria.save();
      return { success: true, message: "Categoria alterada com sucesso!" };
    } catch (error) {
      throw BadRequestException;
    }
  }
  async delete({ request, auth }) {
    const user = await auth.getUser();
    if (user.users_tipo != 1) {
      throw UnauthorizedException;
    }
    const data = request.only(["id"]);
    const categoria = await Categoria.findByOrFail("id", data.id);
    if (!categoria) {
      throw BadRequestException;
    }
    await categoria.delete();
    return { success: true, message: "A categoria foi excluida com sucesso!" };
  }
}

module.exports = CategoriaController;
