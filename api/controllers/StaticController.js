/**
 * StaticController
 *
 * @description :: Server-side logic for managing statics
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	index: function(req, res) {
    Inventario.find({ limit : 4 },function foundCategoria(err, articulos) {
              if (err) return next(err);

	Inventario.find({ limit : 8 },function foundCategoria(err, productos) {
	         if (err) return next(err);

              res.view({
                articulos: articulos,
                productos: productos
	          });
	      });
		 });
	  },

   contacto: function(req, res) {
    res.view();
  },

   enviar: function(req, res) {
			var userObj = {
      name: req.param('nombre'),
      email: req.param('email'),
      mensaje: req.param('mensaje')
    }
    Contacto.create(userObj, function userCreated(err, user) {

    if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        }
       
        return res.redirect('/contacto');
    }
      res.redirect('/');
    });

	 },

	 mensaje: function(req, res, next) {

    // Get an array of all users in the User collection(e.g. table)
    Contacto.find(function foundUsers(err, mensajes) {
      if (err) return next(err);
      // pass the array down to the /views/index.ejs page
	      res.view({
	        mensajes: mensajes
	      });
	    });
	  },

   video: function(req, res) {
    res.view();
  },

   terminos: function(req, res) {
    res.view();
  }

		
};

