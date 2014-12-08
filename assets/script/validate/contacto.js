$(document).ready(function(){

	// Validate
	// http://bassistance.de/jquery-plugins/jquery-plugin-validation/
	// http://docs.jquery.com/Plugins/Validation/
	// http://docs.jquery.com/Plugins/Validation/validate#toptions

		$('#form-contacto').validate({
	    rules: {
	      nombre: {
	        required: true
	      },
	      mensaje: {
	        required: true
	      },
	      email: {
	        required: true,
	        email: true
	      }
	     },
			// success: function(element) {
			// 	element
			// 	//.text('OK!').addClass('valid')
			// }
	  });

});