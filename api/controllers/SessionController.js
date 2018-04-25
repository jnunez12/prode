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

				// Change status to online
				user.online = true;
				user.save(function(err) {
					if (err) return next(err);

					// Inform other sockets that this user is now logged in
					
					User.publishUpdate(user.id, {
						loggedIn: true,
						id: user.id
					});
					
					
					// Si es admin va directamente al panel de administracion
					if(req.session.User.admin) {
						res.redirect('/user');
						return;	
					}		
					// Si no es admin que se vaya a ver el mismo
					res.redirect('/user/show/' + user.id); 
						
				});
			});
		});	
	},

	destroy: function(req, res, next) {
		
		User.findOne(req.session.User.id, function foundUser (err, user) {

			var userId = req.session.User.id;

			user.online = false;
			user.save(function(err) {
				if (err) return next(err);

				// Wipe out the session (log out)
				req.session.destroy();

				// Redirect the browser to the sign-in screen
				res.redirect('/session/new');
						
			});
			// The user is "logging out" (e. g. destroying the session) so change the online attribute to false.
			//user.password = user.password;
			//user.passwordConfirm = user.password;
			//User.update(user, {
			//	online: false
			//}, function (err) {
			//	if(err) return next(err);
				// Wipe out the session (log out)
				//req.session.destroy();

				// Redirect the browser to the sign-in screen
				//res.redirect('/session/new');
			//});
		});

		
	}
};
