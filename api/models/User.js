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

    days: {
      type: 'integer'
    },

    months: {
      type: 'integer'
    },

    years: {
      type: 'integer'
    },

  	email: {
  		type: 'string',
  		email: true,
  		required: true,
  		unique: true
  	},

  	encryptedPassword: {
  		type: 'string',
      minLength: 6,
      maxLength: 50
  	},

    estadoCuenta: {
      type: 'boolean',
      defaultsTo: true
    },

    admin: {
      type: 'boolean',
      defaultsTo: false
    },

    envio: {
      type: 'boolean',
      defaultsTo: false
    },

    direccion: {
      type: 'string',
      defaultsTo: 'direccion'
    },

    ciudad: {
      type: 'string',
      defaultsTo: 'ciudad'
    },

    ciudad: {
      type: 'integer',
      defaultsTo: 51
    },

    zip: {
      type: 'string',
      defaultsTo: 'zip'
    },

  	toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      delete obj.confirmation;
      delete obj.encryptedPassword;
      delete obj._csrf;
      return obj;
    }
    
  },

   beforeValidation: function (values, next) {
    if (typeof values.admin !== 'undefined') {
      if (values.admin === 'unchecked') {
        values.admin = false;
      } else  if (values.admin[1] === 'on') {
        values.admin = true;
      }
    }
     next();
  },

  beforeCreate: function (values, next) {

    // This checks to make sure the password and password confirmation match before creating record
    if (!values.password || values.password != values.confirmation) {
       //console.log(values.password);
       //console.log(values.confirmation);
      return next({err: ["Password doesn't match password confirmation."]});
    }

    require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
      if (err) return next(err);
      values.encryptedPassword = encryptedPassword;
      // values.online= true;
      next();
    });
  }

};
