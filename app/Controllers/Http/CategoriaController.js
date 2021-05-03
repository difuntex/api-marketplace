"use strict";
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
    const data = request.only(["descricao"]);
    await Categoria.create(data);
    return { success: true, message: "Categoria cadastrada com sucesso" };
  }
}

module.exports = CategoriaController;
