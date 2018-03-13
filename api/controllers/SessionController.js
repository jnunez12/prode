/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require('bcrypt');

module.exports = {
	'new': function(req, res) {

		res.view('session/new');
	},

	create: function(req, res, next) {

		// check for username and password 
		if (!req.param('nombre') || !req.param('password')) {

			var usernamePasswordRequiredError = [{name: 'usernamePasswordRequired', message: 'Ingrese usuario y contraseña.'}]

			req.session.flash = {
				err: usernamePasswordRequiredError
			}

			res.redirect('/session/new');
			return;
		}

		User.findOneByNombre(req.param('nombre'), function foundUser (err, user) {
			if (err) return next(err);

			if (!user) {
				var noAccountError = [{name: 'noAccount', message: 'El usuario ' + req.param('nombre') + ' no existe.'}]
				req.session.flash = {
					err: noAccountError
				}
				res.redirect('/session/new');
				return;
			}
		
			bcrypt.compare(req.param('password'), user.encryptedPassword, function(err, valid) {
				if (err) return next(err);

				if (!valid) {
					var usernamePasswordMismatchError = [{name: 'usernamePasswordMismatch', message: 'Usuario y contraseña inválidos.'}]
					req.session.flash = {
						err: usernamePasswordMismatchError
					}
					res.redirect('/session/new');
					return;		
				}
				
				// Log in user
				req.session.authenticated = true;
				req.session.User = user;

				// Si es admin va directamente al panel de administracion
				if(req.session.User.admin) {
					res.redirect('/user');
					return;	
				}		
				
				// Si no es admin que se vaya a ver el mismo
				res.redirect('/user/show/' + user.id); 
			});
		});	
	},

	destroy: function(req, res, next) {
		req.session.destroy();

		res.redirect('/session/new');
	}
}
