$(document).ready(function(){

	// Validate
	// http://bassistance.de/jquery-plugins/jquery-plugin-validation/
	// http://docs.jquery.com/Plugins/Validation/
	// http://docs.jquery.com/Plugins/Validation/validate#toptions

		$('#form').validate({
	    rules: {
	      password: {
	      	minlength: 6,
	        required: true
	      },
	      confirmation: {
	      	minlength: 6,
	      	equalTo: "#password"
	      }
	    },
			// success: function(element) {
			// 	element
			// 	//.text('OK!').addClass('valid')
			// }
	  });

});