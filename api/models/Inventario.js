/**
 * Inventario
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  
  schema: true,
  tableName: 'Inventario',

  attributes: {
  	name: {
  		type: 'string',
  		required: true,
  	},

    cantidad: {
      type: 'integer',
      required: true,
    },

    precio: {
      type: 'integer',
      required: true,
    },

     marca: {
      type: 'string'
    },

     categoria: {
       type: 'string'
    },

    fileName: {
       type: 'string'
    }
  }

};
