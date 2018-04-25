/**
 * Equipo.js
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

  	grupo: {
  		type: 'integer',
  		required: true
  	},

  	posicInicial: {
  		type: 'integer',
  		required: true
  	},

  	pj: {
  		type: 'integer',
  		defaultsTo: 0
  	},

  	win: {
  		type: 'integer',
  		defaultsTo: 0
  	},

  	loss: {
  		type: 'integer',
  		defaultsTo: 0
  	},

  	draw: {
  		type: 'integer',
  		defaultsTo: 0
  	},

  	gf: {
  		type: 'integer',
  		defaultsTo: 0
  	},

  	gc: {
  		type: 'integer',
  		defaultsTo: 0
  	},

  	gd: {
  		type: 'integer',
  		defaultsTo: 0
  	},



  	toJSON: function() {
      var obj = this.toObject();
      return obj;
    }
  }

};

