/**
* Allow a logged-inuser to see, edit and update his own profile
* Allowadminsto see everyone
*/

module.exports = function(req, res, ok) {

	var sessionUserMatchesId = req.session.User.id == req.param('id');
	var isAdmin = req.session.User.admin;

	// The requeriment is does not match the user's id
	// and this is not an andmin
	if(!(sessionUserMatchesId || isAdmin)) {
		var noRightsError = [{name: 'noRights', message: 'userCasePolicy'}]
		req.session.flash = {
			err: noRightsError
		}
		res.redirect('/session/new');
		return;
	}

	return ok();
};