/**
 * Allow any authenticated user.
 */
module.exports = function (req, res, ok) {

  // User is allowed, proceed to controller
  if (req.session.User && req.session.User.admin) {
    return ok();
  }

  // User is not allowed
  else {
  	var requireAdminError = [{name: 'requireAdminError', message: 'Se necesita privilegios de administrador.'}]
		req.session.flash = {
			err: requireAdminError
		}
    res.redirect('/session/new');
    return;
  }
};