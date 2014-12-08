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

     fileName: {
       type: 'string'
    },
     fileMediana: {
       type: 'string'
    },
     fileGrande: {
       type: 'string'
    }
  }

};
