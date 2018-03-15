/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	'new': function(req, res) {
		res.view();
	},

	create: function (req, res, next) {
		User.create( req.params.all(), function userCreated (err, user) {
			// if error entonces
			if (err) {
				//console.log(res.locals.flash);
				req.session.flash = {
					err: err
				}
				// if error redirije de nuevo a creacion de usuario
				return res.redirect('/user/new');
			}

			// despues de crear respuesta.return redirije al objeto creado
			//res.json(user);
			req.session.authenticated = true;
			req.session.User = user;

			// Change status to online
			user.online = true;
			user.save(function(err, user) {
				if (err) return next(err);
				
				// After successfully creating the user
				// redirect to the show action
				res.redirect('/user/show/' + user.id); 		
			});
			
			//req.session.flash = {};
		});
	},

	// render /views/shows.ejs
	show: function (req, res, next) {
		User.findOne(req.param('id'), function foundUser (err, user) {
			if (err) return next(err);
			if (!user) return next();
			res.view({
				user: user
			});
		});
	},

	// get array of users
	index: function (req, res, next) {

		User.find(function foundUsers (err, users) {
			if (err) return next(err);

			res.view({
				users: users
			});
		});
	},

	edit: function (req, res, next) {
		User.findOne(req.param('id'), function foundUser(err, user) {
			if (err) return next(err);
			if (!user) return next('El usuario no existe');

			res.view({
				user: user
			});
		});
	},
	
	update: function (req, res, next) {
		User.update(req.param('id'), req.params.all(), function foundUser(err) {
			if (err) {
				console.log(res.locals.flash);
				req.session.flash = {
					err: err
				}
				return res.redirect('/user/edit/' + req.param('id'));
			}

			res.redirect('/user/show/' + req.param('id'));
		});
	},

	destroy: function (req, res, next) {
		User.findOne(req.param('id'), function foundUser(err, user) {
			if (err) return next(err);
			if (!user) return next('El usuario no existe');

			User.destroy(req.param('id'), function userDestroyed(err) {
				if (err) return next(err);
			});

			res.redirect('/user');
		});
	}
	
};

