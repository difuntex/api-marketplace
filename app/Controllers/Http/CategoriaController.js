"use strict";
const Database = use("Database");

class CategoriaController {
  async index() {
    const categoriasSQL = `
        SELECT *
        FROM   categoria   
    `;
    let categorias = await Database.raw(categoriasSQL);
    //categorias = categorias[0];
    //console.log(await Database.raw(categoriasSQL));
    console.log(categorias.rows)
    return categorias.rows;
  }
}

module.exports = CategoriaController;
