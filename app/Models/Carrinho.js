'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Carrinho extends Model {
    static get table() {
        return "carrinho";
      }
      static get primaryKey() {
        return "id";
      }
      produtos() {
        return this.hasMany("App/Models/Produto");
      }
}

module.exports = Carrinho
