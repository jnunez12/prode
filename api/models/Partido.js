/**
 * Partido.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

  	id: {
  		type: 'integer',
  		unique: true
  	},

  	equipo1: {
  		type: 'string',
  		required: true
  	},

  	equipo2: {
  		type: 'string',
  		required: true
  	},

  	win: {
  		type: 'string',
  		required: true
  	}
  }
};

