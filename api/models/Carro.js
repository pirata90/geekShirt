/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  
  schema: true,
  tableName: 'Factura',
  
  attributes: {

  	cantidad: {
  		type: 'integer',
  		required: true
  	},

  	talla: {
  		type: 'string',
  		required: true
  	},

  	precio: {
  		type: 'integer',
  	},

  	totalArticulo: {
  		type: 'integer',
  		required: true
  	}
    
  }

};
