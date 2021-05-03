"use strict";
const Database = use("Database");

class CategoriaController {
  async index(request, auth) {
    const categoriasSQL = `
        SELECT descricao
        FROM   categoria   
    `;
    let categorias = await Database.raw(categoriasSQL);
    categorias = categorias[0];
    return categorias;
  }
}

module.exports = CategoriaController;
