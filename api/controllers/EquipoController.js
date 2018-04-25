/**
 * EquipoController
 *
 * @description :: Server-side logic for managing Equipoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	'new': function(req, res) {
		res.view();
	},

	// get array of equipos
	index: function (req, res, next) {

		Equipo.find(function foundEquipos (err, equipos) {
			if (err) return next(err);

			res.view({
				equipos: equipos
			});
		});
	},

	create: function (req, res, next) {

		var equipoObj = {
			nombreCorto: req.param('nombreCorto'),
			nombreLargo: req.param('nombreLargo'),
			grupo: req.param('grupo'),
			posicInicial: req.param('posicInicial')
		}

		Equipo.create( equipoObj, function equipoCreated (err, user) {
			// if error entonces
			if (err) {
				//console.log(res.locals.flash);
				req.session.flash = {
					err: err
				}
				// if error redirije de nuevo a creacion de usuario
				return res.redirect('/equipo/new');
			}

			// Si el usuario es creado por un admin entonces no cambio el session.user , quedo logueado como admin
			if(req.session.authenticated == true) {
				return res.redirect('/equipo/show/' + equipo.id); 
			}


			// despues de crear respuesta.return redirije al objeto creado
			//res.json(user);

			//req.session.flash = {};
		});
	}
};

