/**
 * Grupo.js
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
  	
  	nombreCorto: {
  		type: 'string',
  		required: true,
  		unique: true
  	},

  	nombreLargo: {
  		type: 'string',
  		required: true,
  		unique: true
  	},

  	toJSON: function() {
      var obj = this.toObject();
      return obj;
    }
  }

};
