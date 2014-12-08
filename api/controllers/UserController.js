/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  'new': function(req, res) {
    res.view();
  },

	create: function(req, res, next) {

    var userObj = {
      name: req.param('nombre'),
      lastName: req.param('apellidos'),
      days: req.param('days'),
      months: req.param('months'),
      years: req.param('years'),
      email: req.param('email'),
      password: req.param('password'),
      confirmation: req.param('confirmation')
    }
      //console.log(req.param('password'));
      //console.log(req.param('confirmation'));

    // Create a User with the params sent from 
    // the sign-up form 
    User.create(userObj, function userCreated(err, user) {

    if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        }
       
        //res.locals.flash = _.clone(req.session.flash);

         // If error redirect back to sign-up page
        return res.redirect('/user/new');
    }
    	//res.json(user);
      res.redirect('/');
    });

  }, // End create

   // render the profile view (e.g. /views/show.ejs)
  show: function(req, res, next) {
    var moment = require('moment');
   //var ejs = require('ejs');
    User.findOne(req.param('id'), function foundUser(err, user) {
      if (err) return next(err);
      if (!user) return next();
      res.view({
        user: user,
        moment: moment
      });
    });
  },

  index: function(req, res, next) {

    // Get an array of all users in the User collection(e.g. table)
    User.find(function foundUsers(err, users) {
      if (err) return next(err);
      // pass the array down to the /views/index.ejs page
      res.view({
        users: users
      });
    });
  },

  // render the edit view (e.g. /views/edit.ejs)
  edit: function(req, res, next) {

    // Find the user from the id passed in via params
    User.findOne(req.param('id'), function foundUser(err, user) {
      if (err) return next(err);
      if (!user) return next('User doesn\'t exist.');

      res.view({
        user: user
      });
    });
  },

  // process the info from edit view
  update: function(req, res, next) {

      if (req.session.User.admin) {
          var userObj = {
              name: req.param('nombre'),
              lastName: req.param('apellidos'),
              days: req.param('days'),
              months: req.param('months'),
              years: req.param('years'),
              email: req.param('email'),
              admin: req.param('admin')
            }

      User.update(req.param('id'), userObj, function userUpdated(err) {
            if (err) {
              return res.redirect('/user/edit/' + req.param('id'));
            }

            res.redirect('/user/');
          });

      }else {
            var userObj = {
                  name: req.param('nombre'),
                  lastName: req.param('apellidos'),
                  days: req.param('days'),
                  months: req.param('months'),
                  years: req.param('years')
                }

          UserEdit.update(req.param('id'), userObj, function userUpdated(err) {
                if (err) {
                  return res.redirect('/user/edit/' + req.param('id'));
                }

                res.redirect('/user/account/');
              });
          }

  },

  'account': function(req, res) {
    res.view();
  },

    editpass: function(req, res, next) {

    // Find the user from the id passed in via params
    User.findOne(req.param('id'), function foundUser(err, user) {
      if (err) return next(err);
      if (!user) return next('User doesn\'t exist.');

      res.view({
        user: user
      });
    });
  },

    // process the info from edit view
  updatepass: function(req, res, next) {

      if (req.session.User.admin) {
          var userObj = {
              password: req.param('password'),
              confirmation: req.param('confirmation')
            }
            //console.log(req.param('password'));
            //console.log(req.param('confirmation'));

      PassEdit.update(req.param('id'), userObj, function userUpdated(err) {
            if (err) {
              return res.redirect('/user/editpass/' + req.param('id'));
            }

            res.redirect('/user/');
          });

      }else {
            var userObj = {
                  password: req.param('password'),
                  confirmation: req.param('confirmation')
                }

          PassEdit.update(req.param('id'), userObj, function userUpdated(err) {
                if (err) {
                  return res.redirect('/user/editpass/' + req.param('id'));
                }

                res.redirect('/user/account/');
              });
          }

  },

   orden: function(req, res) {
       var moment = require('moment');

       if (req.session.User.admin) {
            Facturaid.find({estadoFactura: true}, function foundCategoria(err, estados) {
                  if (err) return next(err);
                               res.view({
                                estados:estados,
                                moment: moment,
                              });
                       });
         }else {
            Facturaid.find({idUsuario: req.param('id')}, function foundCategoria(err, facturaUser) {
                  if (err) return next(err);
                     if (!facturaUser) return next('Articulo doesn\'t exist.');

            Facturaid.find({idUsuario: req.param('id'), estadoFactura: true}, function foundCategoria(err, estados) {
              if (err) return next(err);
                           res.view({
                            estados:estados,
                            moment: moment,
                          });
                   }); 
             }); 
         }
  }


  
}; // End module
