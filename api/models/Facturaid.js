/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  
  schema: true,
  tableName: 'factura_Detalle',
  
  attributes: {

  	idUsuario: {
  		type: 'string',
  		required: true
  	},
    
  	estadoFactura: {
      type: 'boolean',
      defaultsTo: false
  	},

    envio: {
      type: 'integer',
      defaultsTo: 0
    }
    
  }

};
