'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Produto extends Model {
    static get table() {
        return "produto";
      }
      static get primaryKey() {
        return "produto_id_pk";
      }
}

module.exports = Produto
