/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

  	id: {
  		type: 'integer',
  		autoIncrement: true,
  		unique: true
  	},
  	
  	nombre: {
  		type: 'string',
  		required: true,
  		unique: true
  	},

    admin: {
      type: 'boolean',
      defaultsTo: false
    },

  	password: {
  		type: 'string',
  		required: true
  	},

    encryptedPassword: {
      type: 'string'
    },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      delete obj._csrf;
      delete obj.encryptedPassword;
      return obj;
    }
  },

  beforeCreate: function(values, next) {
    //this check to make sure the password and password confirmation match before creating record
    if(!values.password || values.password != values.passwordConfirm){
      return next({err: ["La contraseña y la confirmación non coinciden."]});
    }
    require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
      if (err) return next(err);
      values.encryptedPassword = encryptedPassword;
      next();
    });
  },

  beforeUpdate: function(values, next) {
    //this check to make sure the password and password confirmation match before creating record
    if(!values.password || values.password != values.passwordConfirm){
      return next({err: ["La contraseña y la confirmación non coinciden."]});
    }
    require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
      if (err) return next(err);
      values.encryptedPassword = encryptedPassword;
      next();
    });
  },

  beforeValidate: function(values, next){
    console.log(values)
    if (typeof values.admin !== 'undefined'){
      if (values.admin === 'unchecked') {
        values.admin = false;
      }else if (values.admin[1] === 'on') {
        values.admin = true;
      }
    }
    next();
  }
};

