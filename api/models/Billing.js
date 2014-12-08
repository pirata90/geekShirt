/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  
  schema: true,
  tableName: 'User',
  
  attributes: {

  	name: {
  		type: 'string',
  		required: true,
  	},

    lastName: {
      type: 'string',
      required: true,
    },

    direccion: {
      type: 'string',
      required: true,
    },

     ciudad: {
      type: 'string',
      required: true,
    },

     pais: {
      type: 'integer',
      required: true,
    },

     zip: {
      type: 'string',
      required: true,
    },

     telefono: {
      type: 'integer',
      required: true,
    }
    
  }

};
