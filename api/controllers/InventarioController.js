/**
 * InventarioController
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

	 'index': function(req, res) {
    Inventario.find(function foundUsers(err, articulos) {
      if (err) return next(err);

       Marca.find(function foundUsers(err, brands) {
          if (err) return next(err);

           Categoria.find(function foundCategoria(err, categorias) {
              if (err) return next(err);

              res.view({
                articulos: articulos,
                categorias: categorias,
                brands: brands
              });
            });

        });
    });
  },

  'marca': function(req, res) {
    Marca.find(function foundUsers(err, brands) {
      if (err) return next(err);
      // pass the array down to the /views/index.ejs page
      res.view({
        brands: brands
      });
    });
  },

  'nuevamarca': function(req, res) {
    res.view();
  },

  'crearmarca': function(req, res) {
    var userObj = {
      name: req.param('nombre')
    }
      //console.log(req.param('password'));
      //console.log(req.param('confirmation'));

    // Create a User with the params sent from 
    // the sign-up form 
    Marca.create(userObj, function userCreated(err, user) {

    if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        }
       
        //res.locals.flash = _.clone(req.session.flash);

         // If error redirect back to sign-up page
        return res.redirect('/inventario/nuevamarca');
    }
    	//res.json(user);
      res.redirect('/inventario/marca');
    });

  },

  // render the edit view (e.g. /views/edit.ejs)
  'editmarca': function(req, res, next) {

    // Find the user from the id passed in via params
    Marca.findOne(req.param('id'), function foundBrand(err, brand) {
      if (err) return next(err);
      if (!brand) return next('Brand doesn\'t exist.');

      res.view({
        brand: brand
      });
    });
  },

  // process the info from edit view
  'updatemarca': function(req, res, next) {

    var userObj = {
        name: req.param('nombre')
      }

    Marca.update(req.param('id'), userObj, function brandUpdated(err) {
      if (err) {
        return res.redirect('/inventario/editmarca/' + req.param('id'));
      }

      res.redirect('/inventario/marca/');
    });
  },

  'categoria': function(req, res) {
    Categoria.find(function foundCategoria(err, categorias) {
      if (err) return next(err);
      // pass the array down to the /views/index.ejs page
      res.view({
        categorias: categorias
      });
    });
  },

  'nuevacategoria': function(req, res) {
    res.view();
  },

  'crearcategoria': function(req, res) {
    var userObj = {
      name: req.param('nombre')
    }
      //console.log(req.param('password'));
      //console.log(req.param('confirmation'));

    // Create a User with the params sent from 
    // the sign-up form 
    Categoria.create(userObj, function userCreated(err, user) {

    if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        }
       
         // If error redirect back to sign-up page
        return res.redirect('/inventario/nuevacategoria');
    }
      //res.json(user);
      res.redirect('/inventario/categoria');
    });

  },

  // render the edit view (e.g. /views/edit.ejs)
  'editcategoria': function(req, res, next) {

    // Find the user from the id passed in via params
    Categoria.findOne(req.param('id'), function foundCategoria(err, categoria) {
      if (err) return next(err);
      if (!categoria) return next('Categoria doesn\'t exist.');

      res.view({
        categoria: categoria
      });
    });
  },

  // process the info from edit view
  'updatecategoria': function(req, res, next) {

    var userObj = {
        name: req.param('nombre')
      }

    Categoria.update(req.param('id'), userObj, function categoriaUpdated(err) {
      if (err) {
        return res.redirect('/inventario/editcategoria/' + req.param('id'));
      }

      res.redirect('/inventario/categoria/');
    });
  },

  'nuevoarticulo': function(req, res) {
    var cat = [];
    var bra = [];

    Categoria.find(function foundCategoria(err, categorias) {      
      if (err) return next(err);
        _.each(categorias, function (item, index) {
            cat.push(item);
          });
       
       Marca.find(function foundUsers(err, brands) {
      if (err) return next(err);
       _.each(brands, function (item, index) {
            bra.push(item);
          });

       console.log("UnderEsp"); 
       console.log(cat);
       console.log("BraSP"); 
       console.log(bra);

      res.view({
        categorias: cat,
        brands: bra
      });

    });

    });
  },

  'creararticulo': function(req, res) {
    var userObj = {
      name: req.param('nombre'),
      cantidad: req.param('cantidad'),
      precio: req.param('precio'),
      marca: req.param('marca'),
      categoria: req.param('categoria')
    }
      //console.log(req.param('password'));
      //console.log(req.param('confirmation'));

    // Create a User with the params sent from 
    // the sign-up form 
    Inventario.create(userObj, function userCreated(err, user) {

    if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        }
       
         // If error redirect back to sign-up page
        return res.redirect('/inventario/nuevoarticulo');
    }
      //res.json(user);
      res.redirect('/inventario/');
    });

  },

  'editarticulo': function(req, res, next) {

    // Find the user from the id passed in via params
    Inventario.findOne(req.param('id'), function foundCategoria(err, articulo) {
      if (err) return next(err);
      if (!articulo) return next('Articulo doesn\'t exist.');

      Marca.find(function foundUsers(err, brands) {
          if (err) return next(err);

           Categoria.find(function foundCategoria(err, categorias) {
              if (err) return next(err);

              res.view({
                articulo: articulo,
                categorias: categorias,
                brands: brands
              });
            });

        });

    });
  },

  'updatearticulo': function(req, res, next) {

    var userObj = {
        name: req.param('nombre'),
        cantidad: req.param('cantidad'),
        precio: req.param('precio'),
        marca: req.param('marca'),
        categoria: req.param('categoria')
      }

    Inventario.update(req.param('id'), userObj, function categoriaUpdated(err) {
      if (err) {
        return res.redirect('/inventario/editarticulo/' + req.param('id'));
      }

      res.redirect('/inventario/');
    });
  },

  'file': function(req, res) {
    Inventario.findOne(req.param('id'), function foundCategoria(err, articulo) {
      if (err) return next(err);
      if (!articulo) return next('Articulo doesn\'t exist.');

              res.view({
                articulo: articulo
              });
            });
  },

  'uploadfile': function  (req, res) {
    var uploadPath = '../../assets/images/upload';
    req.file('uploadfile').upload({ dirname: uploadPath },function (err, files) {
      if (err)
        return res.serverError(err);

       var origifile = files[0].stream.fd;
       var output = origifile.split(/[\\ ]+/).pop();
      
   if (req.param('radio') == "estandar") {
       var userObj = {fileName: output}
   };
   if (req.param('radio') == "mediana") {
        var userObj = {fileMediana: output}
   };
 
    Imagen.update(req.param('id'), userObj, function categoriaUpdated(err) {
      if (err) {
        return res.redirect('/inventario/file/' + req.param('id'));
      }

      res.redirect('/inventario/');
    });

       //console.log(output);
      // return res.json({
      //   message: files.length + ' file(s) uploaded successfully!',
      //   path:uploadPath,
      //   nombre:files.filename,
      //   file:files,
      //   textParams: req.params.all()
      // });
    });

  },

  'catalogo': function(req, res) {
    Inventario.find(function foundCategoria(err, articulos) {
              if (err) return next(err);

              res.view({
                articulos: articulos
          });
      });
  },

  'producto': function(req, res) {
    Inventario.findOne(req.param('id'), function foundCategoria(err, articulo) {
              if (err) return next(err);

    Inventario.find({ limit : 6 },function foundRelacionados(err, relacionados) {
              if (err) return next(err);
              res.view({
                articulo: articulo,
                relacionados: relacionados
            });
        });     //
      });
  },

    'comentarios': function(req, res) {
       var moment = require('moment');
    User.find(function foundArticulo(err, users) {
              if (err) return next(err);

    Comentarios.find({ idArticulo: req.param('id') }, function foundComentario(err, comentarios) {
              if (err) return next(err);

    Inventario.findOne(req.param('id'), function foundArticulo(err, articulo) {
              if (err) return next(err);

              res.view({
                users: users,
                comentarios: comentarios,
                moment: moment,
                articulo: articulo
                });
            });
         });
      });
  },
           

 'crearcomentario': function(req, res) {
    var userObj = {
      comentario: req.param('comentario'),
      idArticulo: req.param('idArticulo'),
      idUsuario: req.param('idUsuario')
    }

    var idInsert; 
    Comentarios.create(userObj, function userCreated(err, user) {

    if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        }
      
         // If error redirect back
        return res.redirect('/inventario/comentarios'+ req.param('idArticulo'));
    }
     res.redirect('/inventario/comentarios/'+ req.param('idArticulo'));

    });

  },

  imagencomentario: function  (req, res) {
    
    var uploadPath = '../../assets/images/upload/comentario';
    req.file('uploadfile').upload({ dirname: uploadPath },function (err, files) {
      if (err)
        return res.serverError(err);

       var origifile = files[0].stream.fd;
       var output = origifile.split(/[\\ ]+/).pop();
      
       var userObj = {
      idArticulo: req.param('idArticulo'),
      idUsuario: req.param('idUsuario'),
      fileName: output
    }
   
    ComentarioImagen.create(userObj, function categoriaUpdated(err) {
      if (err) {
        return res.redirect('/inventario/comentarios/' + req.param('id'));
      }

      res.redirect('/inventario/comentarios/'+ req.param('idArticulo'));
    });

    });

  },


  'crearcarro': function(req, res, next) {
   var idUser = req.param('user'); 
    Inventario.findOne(req.param('id'), function foundArticulo(err, articulo) {
       if (err) return next(err);

        Facturaid.find({idUsuario: req.param('user')}, function foundCategoria(err, facturaUser) {
            if (err) return next(err);
               if (!facturaUser) return next('Articulo doesn\'t exist.');

                    Facturaid.findOne({idUsuario: req.param('user'), estadoFactura: false}, function foundCategoria(err, estado) {
                        if (err) return next(err);
                         if (!estado) {
                          var facturaObj = {idUsuario: req.param('user')}
                             Facturaid.create(facturaObj, function userCreated(err, factura) {
                               if (err) return next(err);
                              
                                var userObj = {
                                            idArticulo: req.param('id'),
                                            idUsuario: req.param('user'),
                                            cantidad: req.param('cantidad'),
                                            talla: req.param('talla'),
                                            totalArticulo: req.param('cantidad') * articulo.precio,
                                            idFactura: factura.id  
                                              }

                             Factura.create(userObj, function userCreated(err, user) {
                               if (err) return next(err);

                                 res.redirect('/checkout/carro/'+ req.param('user'));
                              });
                            });
                     }else{
                            var userObj = {
                                  idArticulo: req.param('id'),
                                  idUsuario: req.param('user'),
                                  cantidad: req.param('cantidad'),
                                  talla: req.param('talla'),
                                  totalArticulo: req.param('cantidad') * articulo.precio,
                                  idFactura: estado.id  
                                  }

                        Factura.create(userObj, function userCreated(err, user) {
                            if (err) return next(err);
                            res.redirect('/checkout/carro/'+ req.param('user'));
                              });
                           }  
                       });
                     });
                  });//end inventario
              },

   buscar: function(req, res, next) {

    // Get an array of all users in the User collection(e.g. table)
    //{name:/+req.param('name')+/i}
    var nombre = '/.*'+req.param('buscar')+'.*/i';
    var buscar = req.param('buscar');
    //var nombre2 = new new RegExp('/.*'+req.param('buscar')+".*/i"); 
    //findByName(req.param('buscar')
    Inventario.findByName(req.param('buscar'),function foundUsers(err, articulos) {
      if (err) return next(err);
      // pass the array down to the /views/index.ejs page
      //console.log(articulos);
      //console.log(nombre2);
      //console.log(buscar);
      res.view({
        articulos: articulos
      });
    });
  }            

  

};
