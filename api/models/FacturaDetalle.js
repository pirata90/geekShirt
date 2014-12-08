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

  	totalSuma: {
  		type: 'integer',
  		required: true
  	},

    impuesto: {
      type: 'integer',
      required: true
    },

     totalFactura: {
      type: 'integer',
      required: true
    }

  	// estadoFactura: {
   //    type: 'boolean',
   //    defaultsTo: false
  	// }
    
  }

};
