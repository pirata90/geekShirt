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

  	idArticulo: {
  		type: 'string',
  		required: true
  	},

  	idUsuario: {
  		type: 'string',
  		required: true
  	},

  	idFactura: {
  		type: 'string',
  	},

  	nombreArticulo: {
  		type: 'string',
  	},

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
  	},

  	estadoCompra: {
      type: 'boolean',
      defaultsTo: false
  	}
    
  }

};
