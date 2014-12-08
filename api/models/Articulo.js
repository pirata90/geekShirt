/**
 * Inventario
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  
  schema: true,
  tableName: 'Factura',

  attributes: {
     estadoCompra: {
      type: 'boolean',
      required: true
    }
  }

};
