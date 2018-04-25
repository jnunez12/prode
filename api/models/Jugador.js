/**
 * Jugador.js
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

  	equipo: {
  		type: 'string'
  	},

  	posicion: {
  		type: 'string',
  		required: true
  	},
  	
  	nombre: {
  		type: 'string',
  		required: true,
  		unique: true
  	},

  	apellido: {
  		type: 'string',
  		required: true,
  		unique: true
  	},

  	edad: {
  		type: 'integer',
  		required: true
  	},

  	pj: {
  		type: 'integer',
  		defaultsTo: 0
  	},

  	amarillas: {
  		type: 'integer',
  		defaultsTo: 0
  	},

  	rojas: {
  		type: 'integer',
  		defaultsTo: 0
  	},

  	goles: {
  		type: 'integer',
  		defaultsTo: 0
  	},

  	img: {
  		type: 'string'
  	}
  }
};

