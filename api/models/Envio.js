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

  	envio: {
  		type: 'boolean',
  		required: true,
  	}   
  }

};
