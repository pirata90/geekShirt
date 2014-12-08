/**
 * Allow any authenticated user.
 */

module.exports = function(req, res, next) {
   res.setHeader("X-Powered-By", "World");
  //return res.forbidden('You are not permitted to perform this action.');
};
