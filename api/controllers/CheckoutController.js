/**
 * FacturaController
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

	carro: function(req, res, next) {
   var totalsuma = 0;
   var numeral = require('numeral');

		 Factura.find( { idUsuario: req.param('id') }, function foundFactura(err, carros) {
              if (err) return next(err);

         Inventario.find(function foundCategoria(err, articulos) {
              if (err) return next(err);

         Factura.find( { idUsuario: req.param('id'), estadoCompra: false }, function foundSuma(err, sumas) {
              if (err) return next(err);
               //var totalsuma = suma.totalArticulo;
               var estado = false; 
               var length = sumas.length;
                for (var i = 0; i < length; i++) {
                  totalsuma += sumas[i].totalArticulo;
                }
                if (length === 0) {estado = true;};
                 //console.log(totalsuma);
                 //impuesto = totalsuma * 0.13; 
                 //totalImpuesto = totalsuma + impuesto
                  var sumaObj = {
                      totalsuma: totalsuma,
                      impuesto: numeral(totalsuma * 0.13).format('0,0'),
                      totalImpuesto: numeral(totalsuma + (totalsuma * 0.13)).format('0,0')
                    }
                     
                  res.view({
                    carros: sumas,
                    articulos: articulos,
                    suma: sumaObj,
                    estado: estado
    		          });
               });   
		         });      
          });
	},

	updatecarro: function(req, res, next) {

    // Inventario.findOne(req.param('id'), function foundArticulo(err, articulo) {
    //    if (err) return next(err);
              
    //     var userObj = {
    //     cantidad: req.param('cantidad'),
    //     totalArticulo: req.param('cantidad') * articulo.precio 
    //     }

    // Factura.update(userObj, function userCreated(err, user) {

    //     if (err) {
    //         console.log(err);
    //         req.session.flash = {
    //           err: err
    //         }
    //         return res.redirect('/inventario/producto'+ req.param('id'));
    //     }
    //       res.redirect('/checkout/carro/'+ req.param('user'));
    //  });

    //   });
  },

   destroy: function(req, res, next) {

    Factura.findOne(req.param('id'), function foundUser(err, carro) {
      if (err) return next(err);

      if (!carro) return next('Carro doesn\'t exist.');

      Factura.destroy(req.param('id'), function userDestroyed(err) {
        if (err) return next(err);

      });        

      res.redirect('/checkout/carro/' + req.param('user'));
    });
  },

    'editarcarro': function(req, res, next) {

          // Find the user from the id passed in via params
    Factura.findOne(req.param('id'), function foundCategoria(err, carro) {
      if (err) return next(err);
      if (!carro) return next('Carro doesn\'t exist.');

      Inventario.findOne(req.param('articulo'), function foundCategoria(err, articulo) {
              if (err) return next(err);

              res.view({
                carro:carro,
                articulo: articulo
          });
      });

    });

  },

  'updatecarro': function(req, res, next) {
Inventario.findOne(req.param('articulo'), function foundArticulo(err, articulo) {
       if (err) return next(err);

      var userObj = {
        cantidad: req.param('cantidad'),
        precio: req.param('precio'),
        talla: req.param('talla'),
        totalArticulo: req.param('cantidad') * articulo.precio 
      }

    Carro.update(req.param('id'), userObj, function categoriaUpdated(err) {
      if (err) {
        return res.redirect('/checkout/editarcarro/' + req.param('id'));
      }

      res.redirect('/checkout/carro/' + req.param('user'));
       });
     });
  },

   'creardellate': function(req, res, next) {

    var totalsuma = 0;
     Factura.find( { idUsuario: req.param('id') }, function foundFactura(err, carros) {
              if (err) return next(err);

         Factura.find( { idUsuario: req.param('id'),estadoCompra: false }, function foundSuma(err, sumas) {
              if (err) return next(err);
               //var totalsuma = suma.totalArticulo;
          
          Facturaid.find({idUsuario: req.param('id')}, function foundCategoria(err, facturaUser) {
                  if (err) return next(err);
                     if (!facturaUser) return next('Articulo doesn\'t exist.');

          Facturaid.findOne({idUsuario: req.param('id'), estadoFactura: false}, function foundCategoria(err, estado) {
                              if (err) return next(err);

                           var length = sumas.length;
                            for (var i = 0; i < length; i++) {
                              totalsuma += sumas[i].totalArticulo;
                            }

                            var sumaObj = {
                                totalSuma: totalsuma,
                                impuesto: totalsuma * 0.13,
                                totalFactura: totalsuma + (totalsuma * 0.13)
                              }
        if (sumas) {
           FacturaDetalle.update(estado.id,sumaObj, function userCreated(err, detalle) {

                      if (err) {
                          console.log(err);
                          req.session.flash = {
                            err: err
                          }
           
                           // If error redirect back 
                          return res.redirect('/checkout/carro/'+ req.param('id'));
                       }
                          res.redirect('/checkout/billing/' + req.param('id'));
                      });
         
        }
        else{
          console.log(sumas);
           res.redirect('/checkout/carro/'+ req.param('id'));
          // FacturaDetalle.update(estado.id,sumaObj, function userCreated(err, detalle) {

          //             if (err) {
          //                 console.log(err);
          //                 req.session.flash = {
          //                   err: err
          //                 }
           
          //                  // If error redirect back 
          //                 return res.redirect('/checkout/carro/'+ req.param('id'));
          //              }
          //                 res.redirect('/checkout/billing/' + req.param('id'));
          //             });
                      }  //
                   }); 
                 });        
               }); 

            });

    //res.view();
  },

  billing: function(req, res, next) {

    // Find the user from the id passed in via params
    User.findOne(req.param('id'), function foundUser(err, user) {
      if (err) return next(err);
      if (!user) return next('User doesn\'t exist.');

      Facturaid.find({idUsuario: req.param('id')}, function foundUser(err, factura) {
        if (err) return next(err);
         if (!factura) return next('Factura doesn\'t exist.');
      Facturaid.findOne({idUsuario: req.param('id'), estadoFactura: false}, function foundCategoria(err, estado) {
         if (err) return next(err);

        res.view({
          user: user,
          estado: estado
        });
      });
     });
    });
  },

  // process the info from edit view
  billupdate: function(req, res, next) {

    var userObj = {
        name: req.param('nombre'),
        lastName: req.param('apellidos'),
        direccion: req.param('direccion'),
        ciudad: req.param('ciudad'),
        pais: req.param('pais'),
        zip: req.param('zip'),
        telefono: req.param('telefono')
      }

    Billing.update(req.param('id'), userObj, function userUpdated(err) {
      if (err) {
        return res.redirect('/checkout/billing/' + req.param('id'));
      }

      res.redirect('/checkout/envio/' + req.param('id'));
    });
  },

   envio: function(req, res, next) {

      Facturaid.find({idUsuario: req.param('id')}, function foundUser(err, user) {
        if (err) return next(err);
         if (!user) return next('User doesn\'t exist.');
         
      Facturaid.findOne({idUsuario: req.param('id'), estadoFactura: false}, function foundCategoria(err, estado) {
         if (err) return next(err);

       User.findOne(req.param('id'), function foundEnvio(err, enviotipo) {
         if (err) return next(err);

          res.view({
            estado: estado,
            enviotipo: enviotipo
           });
        });
      });
     });
    },

    envioupdate: function(req, res, next) {
      var envObj = {
        envio: req.param('radio')
      }

          Facturaid.find({idUsuario: req.param('id')}, function foundCategoria(err, facturaUser) {
                  if (err) return next(err);
                     if (!facturaUser) return next('Articulo doesn\'t exist.');

          Facturaid.findOne({idUsuario: req.param('id'), estadoFactura: false}, function foundCategoria(err, estado) {
                              if (err) return next(err);

                            var sumaObj = {
                                  envio: 5000,
                                  totalFactura: estado.totalFactura + 5000
                              }

             if (estado.envio == 0 && req.param('radio') == "true") {

                   EnvioCobro.update(estado.id,sumaObj, function userCreated(err, detalle) {
                      if (err) {
                          console.log(err);
                          req.session.flash = {
                            err: err
                          }
                           // If error redirect back 
                          return res.redirect('/checkout/envio/'+ req.param('id'));
                       }
                        Envio.update(req.param('id'), envObj, function userUpdated(err) {
                           if (err) return next(err);
                              //res.redirect('/checkout/pago/' + req.param('id'));
                          });
                      });
                   };

                   var sumaObj2 = {
                                  envio: 0,
                                  totalFactura: estado.totalFactura - 5000
                              }

             if (estado.envio != 0 && req.param('radio') == "false") {

                      EnvioCobro.update(estado.id,sumaObj2, function userCreated(err, detalle) {

                      if (err) {
                          console.log(err);
                          req.session.flash = {
                            err: err
                          }
           
                           // If error redirect back 
                          return res.redirect('/checkout/envio/'+ req.param('id'));
                       }

                      Envio.update(req.param('id'), envObj, function userUpdated(err) {
                           if (err) return next(err);
                              //res.redirect('/checkout/pago/' + req.param('id'));
                          });
                      });
                    };
                       res.redirect('/checkout/pago/' + req.param('id'));
                   }); 
                 });              
    },

    'pago': function(req, res) {
      Facturaid.find({idUsuario: req.param('id')}, function foundUser(err, user) {
      if (err) return next(err);
       if (!user) return next('User doesn\'t exist.');
    Facturaid.findOne({idUsuario: req.param('id'), estadoFactura: false}, function foundCategoria(err, estado) {
       if (err) return next(err);

        res.view({
          estado: estado
        });
      });
     });
    },

    crearfactura: function(req, res) {

      Facturaid.find({idUsuario: req.param('id')}, function foundUser(err, user) {
        if (err) return next(err);
        if (!user) return next('User doesn\'t exist.');

      Facturaid.findOne({estadoFactura: false}, function foundCategoria(err, estado) {
         if (err) return next(err);

      Factura.find({idUsuario: req.param('id')}, function foundFacturacion(err, facturacion) {
         if (err) return next(err);

      Factura.find({estadoCompra: false}, function foundFactura(err, facturas) {
         if (err) return next(err);

      Inventario.find(function foundArticulos(err, articulos) {
              if (err) return next(err);
       
       var estadoObj1 = {estadoCompra: true}
         //console.log(facturas);
       _.each(facturas, function (item, index) {

             Articulo.update(item.id,estadoObj1, function articuloUpdate(err, artUpdate) {
                 if (err) return next(err);
                });
              });

        var estadoObj2 = {estadoFactura: true}
      FacturaUpdate.update(estado.id,estadoObj2, function detalleUpdate(err, detalle) {
            if (err) return next(err);
                  });
        var estadoObj3 = {envio: false}
      User.update(req.param('id'),estadoObj3, function detalleUpdate(err, envio) {
            if (err) return next(err);
                  });

           return res.redirect('/user/account/');
      //end
                });
               });
              });
             });
            });
          },

      orden: function(req, res) {
      Facturaid.find({idUsuario: req.param('id')}, function foundUser(err, user) {
        if (err) return next(err);
        if (!user) return next('User doesn\'t exist.');

      Facturaid.findOne({idUsuario: req.param('id'), estadoFactura: false}, function foundCategoria(err, estado) {
         if (err) return next(err);

      Factura.find({idUsuario: req.param('id')}, function foundFacturacion(err, facturacion) {
         if (err) return next(err);

      Factura.find({idUsuario: req.param('id'), estadoCompra: false}, function foundFactura(err, facturas) {
         if (err) return next(err);

      Inventario.find(function foundCategoria(err, articulos) {
              if (err) return next(err);
              res.view({
                  estado: estado,
                  facturas: facturas,
                  articulos: articulos
                });
              });
           });
          });
         });
        });
      }

   // 'test': function(req, res,next) {
   //   var userObj = {
   //      envio: "true"
   //    }

   // var userObj2 = {
   //      envio: "false"
   //    }

   // Envio.update("547e0cc834b147102632a03e", userObj, function userUpdated(err) {
   //    if (err) {
   //      return res.redirect('/checkout/envio/');
   //    }
   //        Envio.update("547e0cc834b147102632a03e", userObj2, function userUpdated(err) {
   //            if (err) {
   //              return res.redirect('/checkout/envio/');
   //            }
   //               res.redirect('/checkout/billing/547e0cc834b147102632a03e');
   //             });  

   //     });  

   //  }

};


